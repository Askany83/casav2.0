import { DetailsButtonProps } from "@/interfaces/interfaces";

const HouseDetailsButton: React.FC<DetailsButtonProps> = ({
  house,
  onClick,
}) => {
  const handleClick = () => {
    onClick(house);
  };

  return (
    <button
      className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1"
      onClick={handleClick}
    >
      Ver detalhes
    </button>
  );
};

export default HouseDetailsButton;
