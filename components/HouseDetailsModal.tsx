import { House } from "@/app/types/House";

interface HouseDetailsModalProps {
  selectedHouse: House | null;
  onClose: () => void;
}

const HouseDetailsModal: React.FC<HouseDetailsModalProps> = ({
  selectedHouse,
  onClose,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          {/* Render the details of the selected house */}
          <h2 className="text-xl font-bold mb-4">Detalhes da Casa</h2>
          <p className="mb-5">
            <span className="font-bold">Tipo de Casa:</span> <br />
            {selectedHouse?.typeOfHouse} - {selectedHouse?.selectedOption}
          </p>
          <p className="mb-5">
            <span className="font-bold">Morada:</span>
            <br />
            {selectedHouse?.streetName} <br />
            {selectedHouse?.locality} <br />
            {selectedHouse?.postalCode}
          </p>
          <p className="mb-5">
            <span className="font-bold">Condições habitacionais:</span>
            <br />
            {selectedHouse?.housingConditions}
          </p>
          <p className="mb-5">
            <span className="font-bold">Área bruta:</span>
            <br />
            {selectedHouse?.area}
          </p>
          <p className="mb-5">
            <span className="font-bold">Georreferenciação:</span>
            <br />
            {selectedHouse?.latitude}, {selectedHouse?.longitude}
          </p>
        </div>
      </div>
    </>
  );
};

export default HouseDetailsModal;
