/**
 * Renders a button that links to the details page for the given house.
 * Handles clicking to call the onClick callback.
 */

import { DetailsButtonProps } from "@/interfaces/interfaces";
import Link from "next/link";

const HouseDetailsButton: React.FC<DetailsButtonProps> = ({
  house,
  onClick,
}) => {
  const handleClick = () => {
    onClick(house);
  };

  const { _id } = house;

  return (
    <Link key={_id} href={`/houseDetails/${_id}`}>
      <div className="flex justify-center">
        <button
          className="btn btn-xs rounded-none mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950"
          onClick={handleClick}
        >
          Ver detalhes
        </button>
      </div>
    </Link>
  );
};

export default HouseDetailsButton;
