import { Dispatch, SetStateAction, ChangeEvent } from "react";

export interface House {
  _id: string;
  typeOfHouse: string;
  housingConditions: string;
  selectedOption: string;
  selectedYear: string;
  area: string;
  streetName: string;
  locality: string;
  municipality: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  userId: string;
  image: {
    data: string;
    contentType: string;
  };
  houseState: string;
  intensity?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  text: string;
}

export interface ErrorMessageProps {
  error: string;
}

//repeated -eliminate
export interface HouseDetailsProps {
  house: House;
}

export interface DetailsButtonProps {
  house: House;
  onClick: (house: House) => void;
}

export interface HouseCardProps {
  house: House;
}

export interface DeleteResponse {
  ok: boolean;
}

export interface EditHouseFormProps {
  typeOfHouse: string;
  selectedOption: string;
  houseDetails: any;
  handleTypeOfHouseChange: (value: string) => void;
  handleOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  streetName: string;
  locality: string;
  municipality: string;
  postalCode: string;
  housingConditions: string;
  selectedYear: string;
  area: string;
  latitude: string;
  longitude: string;
  setStreetName: Dispatch<SetStateAction<string>>;
  setLocality: Dispatch<SetStateAction<string>>;
  setMunicipality: Dispatch<SetStateAction<string>>;
  setPostalCode: Dispatch<SetStateAction<string>>;
  setHousingConditions: Dispatch<SetStateAction<string>>;
  handleYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  setArea: Dispatch<SetStateAction<string>>;
  setLatitude: Dispatch<SetStateAction<string>>;
  setLongitude: Dispatch<SetStateAction<string>>;
  imageBlob: Blob | null;
}
