import { HouseDetailsProps } from "@/interfaces/interfaces";
import React from "react";

const HouseDetails: React.FC<HouseDetailsProps> = React.memo(({ house }) => {
  return (
    <div className="mt-1">
      <HouseAttribute label="Localidade" value={house.locality} />
      <HouseAttribute
        label="Tipo de Casa"
        value={`${house.typeOfHouse} - ${house.selectedOption}`}
      />
      <HouseAttribute
        label="Condições habitacionais"
        value={house.housingConditions}
      />
    </div>
  );
});

HouseDetails.displayName = "HouseDetails";

interface HouseAttributeProps {
  label: string;
  value: string;
}

const HouseAttribute: React.FC<HouseAttributeProps> = ({ label, value }) => {
  return (
    <div>
      <p className="py-2.5 font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default HouseDetails;
