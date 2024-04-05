/**
 * Renders house details passed in props.
 * Displays house locality, type, and housing conditions.
 */

import { HouseDetailsProps } from "@/interfaces/interfaces";
import React from "react";

const HouseDetails: React.FC<HouseDetailsProps> = React.memo(({ house }) => {
  return (
    <>
      <HouseAttribute label="Localidade" value={house.locality} />
      <HouseAttribute
        label="Tipo de Casa"
        value={`${house.typeOfHouse} - ${house.selectedOption}`}
      />
      <HouseAttribute
        label="Condições habitacionais"
        value={house.housingConditions}
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
