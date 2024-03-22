import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import xss from "xss";
import { REGISTER_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { post } from "@/fetchCallServices/fetchCalls";
import { useStepNavigation } from "@/customHooks/useStepNavigation";
import { validateFormHouse } from "@/utils/validationUtils";
import { convertToWebP } from "@/utils/convertToWebP";
import { resizeImage } from "@/utils/resizeImage";

const useRegisterHouseForm = () => {
  const [typeOfHouse, setTypeOfHouse] = useState<string>("Apartamento");
  const [housingConditions, setHousingConditions] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("T0");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const { currentStep, totalSteps, handleNext, handlePrev } =
    useStepNavigation();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      console.log("No file selected");
      setError("Por favor selecione uma imagem");
      return;
    }

    console.log("Selected file:", file);

    try {
      // Compress and resize the image
      const resizedImage = await resizeImage(file);
      console.log("Resized image:", resizedImage);

      // Convert to WebP format
      const webPImage = await convertToWebP(resizedImage);
      console.log("WebP image:", webPImage);

      // Convert Blob to File
      const convertedImageFile = new File([webPImage], file.name, {
        type: "image/webp",
      });

      // Set selected image file
      setSelectedImageFile(convertedImageFile);
      console.log("Selected image file:", selectedImageFile);

      // Set image preview
      setSelectedImage(URL.createObjectURL(convertedImageFile));

      // Extract MIME type
      const mimeType = convertedImageFile.type;

      setImageMimeType(mimeType);
      console.log("Image MIME type:", mimeType);
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle error
      setError("Erro no processamento de imagem. Tente novamente.");
    }
  };

  useEffect(() => {
    // This code block will run every time selectedImageFile changes
    console.log("Selected image file:", selectedImageFile);
  }, [selectedImageFile]);

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    selectedImageFile: File | null,
    imageMimeType: string | null = null
  ) => {
    event.preventDefault();

    const validateFormResult = validateFormHouse(
      typeOfHouse,
      selectedOption,
      streetName,
      locality,
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

    if (!userEmail) {
      setError("User email not found.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("typeOfHouse", xss(typeOfHouse.trim()));
      formData.append("housingConditions", xss(housingConditions.trim()));
      formData.append("selectedOption", xss(selectedOption.trim()));
      formData.append("selectedYear", xss(selectedYear.trim()));
      formData.append("area", xss(area.trim()));
      formData.append("streetName", xss(streetName.trim()));
      formData.append("locality", xss(locality.trim()));
      formData.append("postalCode", xss(postalCode.trim()));
      formData.append("latitude", xss(latitude.trim()));
      formData.append("longitude", xss(longitude.trim()));
      formData.append("email", userEmail);

      // Append image data and MIME type if available
      console.log("selectedImageFile:", selectedImageFile);
      console.log("imageMimeType:", imageMimeType);
      if (selectedImageFile && imageMimeType) {
        formData.append("image", selectedImageFile, selectedImageFile.name);
        formData.append("imageType", imageMimeType);
        console.log("Image appended to formData.");
      } else {
        console.log("No image to append to formData.");
      }
      // Logging formData entries
      for (const [key, value] of Array.from(formData.entries())) {
        console.log(`${key}: ${value}`);
      }

      const registerHouse = await post(REGISTER_HOUSE_API_ENDPOINT, formData);
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
  };
};

export default useRegisterHouseForm;
