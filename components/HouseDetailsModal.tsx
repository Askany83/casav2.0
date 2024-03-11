import { House } from "@/interfaces/interfaces";
import { useState } from "react";
import { DELETE_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";

interface HouseDetailsModalProps {
  selectedHouse: House | null;
  onClose: () => void;
}

const HouseDetailsModal: React.FC<HouseDetailsModalProps> = ({
  selectedHouse,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!selectedHouse) return;
    const shouldDelete = window.confirm(
      "Tem a certeza que deseja apagar esta casa?"
    );
    if (!shouldDelete) return;

    setIsLoading(true);
    try {
      const url = `${DELETE_HOUSE_API_ENDPOINT}?houseId=${selectedHouse._id}`;
      console.log("Delete request URL:", url);
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        // House successfully deleted, close the modal or perform other actions
        onClose();
      } else {
        // Handle errors
        console.log("Deleting house:", selectedHouse._id);
        console.error("Failed to delete house");
      }
    } catch (error) {
      console.error("Failed to delete house", error);
    }
    setIsLoading(false);
  };

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
          <div className="flex justify-center">
            <button
              className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1 mr-5 w-28 h-10"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Apagar"}
            </button>
            <button className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1 w-28 h-10">
              Editar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseDetailsModal;
