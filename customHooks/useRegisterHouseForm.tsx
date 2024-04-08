import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import xss from "xss";
import { REGISTER_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { useStepNavigation } from "@/customHooks/useStepNavigation";
import { validateFormHouse } from "@/utils/validationUtils";
import { handleImageChange } from "@/utils/imageConverter";
import { houseOwnerProfileFetch } from "@/fetchCallServices/getHouseOwnerProfile";
import { useUserEmailFromSession } from "./useUserEmailFromSession";

const useRegisterHouseForm = () => {
  const [typeOfHouse, setTypeOfHouse] = useState<string>("");
  const [housingConditions, setHousingConditions] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const userEmail = useUserEmailFromSession();

  //get user id
  useEffect(() => {
    // Fetch user data using the email from session
    if (userEmail) {
      houseOwnerProfileFetch(userEmail)
        .then((userData) => {
          if (userData && userData._id) {
            // Use the _id obtained from userData
            const userId = userData._id;

            // console.log("User ID - useRegisterHouseForm:", userId);
            setUserId(userData._id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userEmail]);

  //form handlers
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };
  const { currentStep, totalSteps, handleNext, handlePrev } =
    useStepNavigation();

  //image Converter
  const handleImageChangeWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      // console.log("No file selected");
      setError("Por favor selecione uma imagem");
      return;
    }

    await handleImageChange(
      file,
      setError,
      setSelectedImage,
      setSelectedImageFile,
      setImageMimeType
    );
  };

  // useEffect(() => {
  //   // This code block will run every time selectedImageFile changes
  //   console.log("Selected image file:", selectedImageFile);
  // }, [selectedImageFile]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateFormResult = validateFormHouse(
      typeOfHouse,
      selectedOption,
      streetName,
      locality,
      municipality,
      postalCode,
      housingConditions,
      area,
      selectedYear,
      latitude,
      longitude,
      setError
    );

    if (!validateFormResult) {
      return;
    }

    if (!userId) {
      setError("ID do utilizador em falta. Tente novamente.");
      return;
    }

    try {
      const formData = new FormData();

      // Append each form field and log it
      formData.append("typeOfHouse", xss(typeOfHouse.trim()));
      formData.append("housingConditions", xss(housingConditions.trim()));
      formData.append("selectedOption", xss(selectedOption.trim()));
      formData.append("selectedYear", xss(selectedYear.trim()));
      formData.append("area", xss(area.trim()));
      formData.append("streetName", xss(streetName.trim()));
      formData.append("locality", xss(locality.trim()));
      formData.append("municipality", xss(municipality.trim()));
      formData.append("postalCode", xss(postalCode.trim()));
      formData.append("latitude", xss(latitude.trim()));
      formData.append("longitude", xss(longitude.trim()));

      if (userId) {
        formData.append("userId", userId);
      }

      // Append image data and MIME type if available
      // console.log("selectedImageFile:", selectedImageFile);
      // console.log("imageMimeType:", imageMimeType);

      // Append image data and MIME type if available
      if (selectedImage && imageMimeType) {
        formData.append("imageBase64", selectedImage);
        formData.append("imageType", imageMimeType);

        // console.log("Appended image 222:", selectedImage);
        // console.log("Appended imageType 222:", imageMimeType);

        // Logging formData entries
        // console.log("FormData entries:");
        // for (const [key, value] of Array.from(formData.entries())) {
        //   console.log(`${key}: ${value}`);
        // }
      } else {
        console.log("No image to append to formData.");
      }

      const registerHouse = await fetch(REGISTER_HOUSE_API_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      if (!registerHouse.ok) {
        // Handle non-successful responses here
        const errorData = await registerHouse.json();
        throw new Error(
          `Request failed with status ${registerHouse.status}: ${errorData.message}`
        );
      }

      console.log(registerHouse);

      alert("Casa Criada com sucesso!");
      const form = event.target as HTMLFormElement;
      form.reset();
      router.push("/housesInRecord");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    typeOfHouse,
    setTypeOfHouse,
    housingConditions,
    setHousingConditions,
    selectedOption,
    setSelectedOption,
    selectedYear,
    setSelectedYear,
    area,
    setArea,
    streetName,
    setStreetName,
    locality,
    setLocality,
    municipality,
    setMunicipality,
    postalCode,
    setPostalCode,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    error,
    handleOptionChange,
    handleYearChange,
    handleFormSubmit,
    currentStep,
    totalSteps,
    handleNext,
    handlePrev,
    handleImageChange,
    selectedImage,
    selectedImageFile,
    setSelectedImageFile,
    imageMimeType,
    handleImageChangeWrapper,
  };
};

export default useRegisterHouseForm;
