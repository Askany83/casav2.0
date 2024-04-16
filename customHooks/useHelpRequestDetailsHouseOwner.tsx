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
      sender: "houseOwner",
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
    }
  }, [houseDetails]);

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
    // You can handle the form submission here
    console.log("Selected house state:", selectedState);
    console.log("Message:", message);
    console.log("Apoios:", apoios);

    const newMessage = {
      content: message,
      sender: "houseOwner",
    };

    const updatedMessages = [...messages, newMessage];

    handleAddMessage();

    const confirmUpdate = window.confirm(
      "Tem a certeza que quer atualizar o estado do processo deste imóvel?"
    );

    if (confirmUpdate) {
      try {
        const houseStateData = {
          houseState: selectedState,
          houseId: houseDetails._id,
          userId: houseDetails.userId,
          messages: updatedMessages,
          apoios: apoios,
        };

        console.log("House state data:", houseStateData);

        const response = await fetch(`/api/updateHelpRequest`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(houseStateData),
        });

        if (response.ok) {
          console.log("House state updated successfully");
          // Uupdate the sessionStorage
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
            sessionStorage.setItem(
              "cachedHouses",
              JSON.stringify(updatedHouses)
            );
          }

          alert("O estado de processo da casa foi atualizado com sucesso!");

          router.push(`/allHousesInRecord`);
        } else {
          console.error("Error updating house state:", response.status);
        }
      } catch (error) {
        console.error("Error updating house state (catch):", error);
      } finally {
        setSelectedState("");
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
