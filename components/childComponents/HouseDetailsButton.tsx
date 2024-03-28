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
    <Link key={_id} href={`/house/${_id}`}>
      <div className="flex flex-grow">
        <button
          className="btn btn-info cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
          onClick={handleClick}
        >
          Ver detalhes
        </button>
      </div>
    </Link>
  );
};

export default HouseDetailsButton;
