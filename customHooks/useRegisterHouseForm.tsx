import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import xss from "xss";
import { REGISTER_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import {
  validateStreetName,
  validateLocality,
  validatePostalCode,
  validateArea,
  validateLatitude,
  validateLongitude,
} from "@/utils/valitationUtils";
import { post } from "@/fetchCallServices/fetchCalls";

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

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  //lets try this

  const validateForm = () => {
    if (!typeOfHouse) {
      setError("Tipo de casa: vazio");
      return false;
    }
    if (!selectedOption) {
      setError("Número de quartos: vazio");
      return false;
    }
    if (!streetName || !validateStreetName(streetName)) {
      setError("Nome da rua: vazio ou formato inválido");
      alert("Nome da rua deve ter entre 5 e 100 caracteres");
      return false;
    }

    if (!locality || !validateLocality(locality)) {
      setError("Localidade: vazia ou com caracteres inválidos");
      alert("Localidade deve ter entre 2 e 100 caracteres");
      return false;
    }

    if (!postalCode || !validatePostalCode(postalCode)) {
      setError("Código postal com formato inválido(ex. 1111-111)");
      return false;
    }
    if (!housingConditions) {
      setError("Condições de habitabilidade: vazio");
      return false;
    }
    if (!area || !validateArea(area)) {
      setError("Área bruta deve ser um número entre 1 e 9999");
      return false;
    }
    if (!selectedYear) {
      setError("Ano selecionado: vazio");
      return false;
    }
    if (!latitude || !validateLatitude(latitude)) {
      setError("latitude: deve ser um número entre -90 e 90");
      return false;
    }
    if (!longitude || !validateLongitude(longitude)) {
      setError("longitude: deve ser um número entre -180 e 180");
      return false;
    }

    return true;
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Total number of steps

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const sanitizedFormData = {
        typeOfHouse: xss(typeOfHouse.trim()),
        housingConditions: xss(housingConditions.trim()),
        selectedOption: xss(selectedOption.trim()),
        selectedYear: xss(selectedYear.trim()),
        area: xss(area.trim()),
        streetName: xss(streetName.trim()),
        locality: xss(locality.trim()),
        postalCode: xss(postalCode.trim()),
        latitude: xss(latitude.trim()),
        longitude: xss(longitude.trim()),
        email: userEmail,
      };
      console.log(sanitizedFormData);

      const registerHouse = await post(
        REGISTER_HOUSE_API_ENDPOINT,
        sanitizedFormData
      );
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
  };
};

export default useRegisterHouseForm;
