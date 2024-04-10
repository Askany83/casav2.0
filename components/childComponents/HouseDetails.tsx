/**
 * Renders house details passed in props.
 * Displays house locality, type, and housing conditions.
 */

import { HouseDetailsProps } from "@/interfaces/interfaces";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import React from "react";
import { houseStateMapping } from "@/utils/houseStateProcess";

const HouseDetails: React.FC<HouseDetailsProps> = React.memo(({ house }) => {
  const displayHousingConditions =
    conditionsMapHouses[house.housingConditions] || house.housingConditions;

  return (
    <>
      <HouseAttribute label="Localidade" value={house.locality} />
      <HouseAttribute label="Município" value={house.municipality} />
      <HouseAttribute
        label="Tipo de Casa"
        value={`${house.typeOfHouse} - ${house.selectedOption}`}
      />
      <HouseAttribute
        label="Condições habitacionais"
        value={displayHousingConditions}
      />
      <HouseAttribute
        label="Estado do processo"
        value={houseStateMapping[house.houseState]}
      />
    </>
  );
});

HouseDetails.displayName = "HouseDetails";

interface HouseAttributeProps {
  label: string;
  value: string;
}

const HouseAttribute: React.FC<HouseAttributeProps> = ({ label, value }) => {
  return (
    <>
      <p className="py-1 font-bold">{label}</p>
      <p>{value}</p>
    </>
  );
};

export default HouseDetails;
