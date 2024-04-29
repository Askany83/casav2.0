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
      {house.helpRequestState === "houseOwnerReview" && (
        <div className="-mt-11 mb-3">
          <p className="btn btn-warning btn-xs pointer-events-none">
            Nova mensagem
          </p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <p className="text-xs font-black mt-1.5">Estado</p>
        <p className="text-xs flex items-center justify-center">
          <span className="px-4 mt-1 text-xs md:text-sm">
            {houseStateMapping[house.houseState]}
          </span>
        </p>
      </div>
      <div className="divider -mt-1"></div>
      {/* <div className="py-4 text-xs flex items-center justify-start">
        <p>{`${house.civilParish}, ${house.municipality}`}</p>
      </div> */}

      <div className="-mt-8">
        <HouseAttribute
          label="Localização"
          value={`${house.civilParish}, ${house.municipality}`}
        />

        <HouseAttribute
          label="Tipo de Casa"
          value={`${house.typeOfHouse} - ${house.selectedOption}`}
        />
        <HouseAttribute
          label="Condições habitacionais"
          value={displayHousingConditions}
        />
      </div>
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
      <p className="pt-4 mb-1 text-xs font-black">{label}</p>
      <p className="text-xs md:text-sm">{value}</p>
    </>
  );
};

export default HouseDetails;
