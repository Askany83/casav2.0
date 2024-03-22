/**
 * HouseCard component displays house image, details and view details button.
 * Accepts house object as a prop.
 */

import HouseDetails from "@/components/childComponents/HouseDetails";
import HouseDetailsButton from "@/components/childComponents/HouseDetailsButton";
import { HouseCardProps } from "@/interfaces/interfaces";
import React from "react";

const HouseCard: React.FC<HouseCardProps> = React.memo(({ house }) => {
  const handleClick = () => {
    console.log("handleClick house card: ", house);
  };

  return (
    <div className="flex flex-col sm:flex-row my-5">
      <div className="w-64 h-64 bg-slate-500">
        <p>Image</p>
      </div>

      <div className="sm:ml-4 flex-grow">
        <div className="flex">
          {/* Memoized HouseDetails component */}
          <HouseDetails house={house} />
        </div>
        {/* HouseDetailsButton component */}
        <HouseDetailsButton house={house} onClick={handleClick} />
      </div>
    </div>
  );
});

HouseCard.displayName = "HouseCard";
export default HouseCard;
