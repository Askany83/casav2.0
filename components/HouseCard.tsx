import { House } from "@/app/types/House";

interface HouseCardProps {
  house: House;
  onOpenModal: (house: House) => void;
}

export const HouseCard: React.FC<HouseCardProps> = ({ house, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(house);
  };

  return (
    <div className="flex flex-col sm:flex-row lg:mb-6 ">
      {/* House image */}
      <div className="w-80 h-80 bg-slate-500">
        <p>Image</p>
      </div>
      {/* Button to open modal */}
      <div className="sm:ml-4">
        {" "}
        {/* Add margin for spacing between image and details */}
        {/* Button to open modal */}
        <button
          className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1"
          onClick={handleClick}
        >
          Ver detalhes
        </button>
        {/* House details */}
        <div className="mt-4">
          {" "}
          {/* Add margin for spacing between button and details */}
          <p className="py-2.5 font-bold">Localidade</p>
          <p>{house.locality}</p>
          <p className="py-2.5 font-bold">Tipo de Casa</p>
          <p>
            {house.typeOfHouse} - {house.selectedOption}
          </p>
          <p className="py-2.5 font-bold">Condições habitacionais</p>
          <p className="pb-8">{house.housingConditions}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
