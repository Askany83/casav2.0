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
          className="btn btn-info btn-xs rounded-box md:btn-sm"
          onClick={handleClick}
        >
          Ver detalhes
        </button>
      </div>
    </Link>
  );
};

export default HouseDetailsButton;
