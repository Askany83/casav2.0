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
      <div className="mt-6 -mb-5 flex items-center justify-center">
        <button
          className="btn btn-info btn-sm rounded-box md:btn-md"
          onClick={handleClick}
        >
          Ver detalhes
        </button>
      </div>
    </Link>
  );
};

export default HouseDetailsButton;
