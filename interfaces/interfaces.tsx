export interface House {
  _id: string;
  typeOfHouse: string;
  housingConditions: string;
  selectedOption: string;
  selectedYear: string;
  area: string;
  streetName: string;
  locality: string;
  postalCode: string;
  latitude: string;
  longitude: string;
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

export interface HouseDetailsProps {
  house: House;
}

export interface DetailsButtonProps {
  house: House;
  onClick: (house: House) => void;
}

export interface HouseCardProps {
  house: House;
  onOpenModal: (house: House) => void;
}
