import { useState, useEffect } from "react";
import useFullHouseDetails from "@/customHooks/useFullHouseDetails";
import { useRouter } from "next/navigation";
import { base64ToBlob } from "@/utils/base64ToBlob";

interface HelpRequestDetails {
  helpRequest: any;
  selectedState: string;
  imageUrl: string | null;
  message: string;

  apoios: {
    apoio1: boolean;
    apoio2: boolean;
    apoio3: boolean;
  };
  isLoading: boolean;
  error: any;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  router: any;
  messages: { content: string; sender: string }[];
}

const useHelpRequestDetails = (): HelpRequestDetails => {
  const [helpRequest, setHelpRequest] = useState<any>(null);
  const [selectedState, setSelectedState] = useState("");

  const [defaultSelectedState, setDefaultSelectedState] = useState("");
  console.log("def state:", defaultSelectedState);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { houseDetails, isLoading, error } = useFullHouseDetails(
    helpRequest?.houseId
  );

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { content: string; sender: string }[]
  >([]);

  console.log("messages:", messages);

  useEffect(() => {
    if (helpRequest && helpRequest.messages) {
      setMessages(helpRequest.messages);
    }
  }, [helpRequest]);

  const handleAddMessage = () => {
    const newMessage = {
      content: message,
      sender: "govUser",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const [apoios, setApoios] = useState({
    apoio1: false,
    apoio2: false,
    apoio3: false,
  });

  const router = useRouter();

  console.log("selectedState:", selectedState);
  console.log("House details:", houseDetails);

  useEffect(() => {
    // Retrieve help request data from sessionStorage
    const storedHelpRequest = sessionStorage.getItem("helpRequest");
    if (storedHelpRequest) {
      const parsedHelpRequest = JSON.parse(storedHelpRequest);
      setHelpRequest(parsedHelpRequest);

      // Populate apoios state if they exist in helpRequest
      if (parsedHelpRequest.apoios) {
        setApoios(parsedHelpRequest.apoios);
      }
    }

    // Set image URL when houseDetails changes
    if (houseDetails && houseDetails.image && houseDetails.image.data) {
      const blob = base64ToBlob(houseDetails.image.data);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }
    }

    // Set selectedState to the current houseState from houseDetails
    if (houseDetails && houseDetails.houseState) {
      setSelectedState(houseDetails.houseState);
      if (!defaultSelectedState) {
        setDefaultSelectedState(houseDetails.houseState);
      }
    }
  }, [houseDetails, defaultSelectedState]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setApoios((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add message locally
    handleAddMessage();

    // Update help request with new message
    const updatedHelpRequest = {
      ...helpRequest,
      messages: [...messages, { content: message, sender: "govUser" }],
    };

    try {
      // Ask for confirmation before submitting
      const confirmUpdate = window.confirm(
        "Tem a certeza que quer atualizar o estado do processo deste imóvel?"
      );

      if (confirmUpdate) {
        const houseStateData = {
          houseState: selectedState,
          houseId: houseDetails._id,
          userId: houseDetails.userId,
          messages: updatedHelpRequest.messages,
          apoios: apoios,
        };

        console.log("House state data:", houseStateData);

        const response = await fetch(`/api/updateHouseState`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(houseStateData),
        });

        if (response.ok) {
          // Update sessionStorage with the modified help request
          sessionStorage.setItem(
            "helpRequest",
            JSON.stringify(updatedHelpRequest)
          );

          // Alert the user about the successful update
          alert("O estado de processo da casa foi atualizado com sucesso!");

          // Navigate to the desired page
          router.push(`/allHousesInRecord`);
        } else {
          console.error("Error updating house state:", response.status);
          console.log(
            "Erro ao atualizar o estado da casa. Por favor, tente novamente."
          );
        }
      } else {
        // Revert the local message addition if user cancels
        setMessages(messages.slice(0, -1));

        // Restore the previous house state
        setSelectedState(defaultSelectedState);
      }
    } catch (error) {
      console.error("Error updating house state:", error);
      console.log(
        "Erro ao atualizar o estado da casa. Por favor, tente novamente."
      );
    } finally {
      // Update cachedHouses in sessionStorage
      const cachedData = sessionStorage.getItem("cachedHouses");
      if (cachedData) {
        const cachedHouses = JSON.parse(cachedData) as any[];
        const updatedHouses = cachedHouses.map((house) => {
          if (house._id === houseDetails._id) {
            return {
              ...house,
              houseState: selectedState,
            };
          }
          return house;
        });
        sessionStorage.setItem("cachedHouses", JSON.stringify(updatedHouses));
      }
    }
  };

  return {
    helpRequest,
    selectedState,
    imageUrl,
    message,
    apoios,
    isLoading,
    error,
    handleChange,
    handleTextareaChange,
    handleCheckboxChange,
    handleSubmit,
    router,
    messages,
  };
};

export default useHelpRequestDetails;
