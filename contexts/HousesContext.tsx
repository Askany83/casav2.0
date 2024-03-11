"use client";

import React, { createContext, useContext, useState } from "react";

// Defina o tipo para os dados das casas
type HouseType = {
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
};

// Defina o tipo para o contexto das casas
type HousesContextType = {
  houses: HouseType[];
  setHouses: React.Dispatch<React.SetStateAction<HouseType[]>>;
};

// Crie o contexto das casas
const HousesContext = createContext<HousesContextType>({
  houses: [],
  setHouses: () => {},
});

// Exporte o hook useHouses
export const useHouses = () => useContext(HousesContext);

// Crie o provedor das casas
export const HousesProvider = ({ children }: { children: React.ReactNode }) => {
  const [houses, setHouses] = useState<HouseType[]>([]);
  console.log("setHousesContext: ", houses);

  return (
    <HousesContext.Provider value={{ houses, setHouses }}>
      {children}
    </HousesContext.Provider>
  );
};
