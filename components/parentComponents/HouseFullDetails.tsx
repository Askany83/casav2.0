"use client";

import Link from "next/link";
import { useDeleteHouse } from "@/customHooks/useDeleteHouse";

const HouseFullDetails = ({
  house,
  isLoading,
  houseDetails,
}: {
  house: string;
  isLoading: boolean;
  houseDetails: any;
}) => {
  // Destructure the handleDelete function and isDeleting state from the useDeleteHouse hook
  const { handleDelete, isDeleting } = useDeleteHouse();

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <div className="p-5 border-black-400 border-2 bg-gray-100 ">
          <h2 className="text-xl font-bold mb-4 text-gray-900 text-left">
            Detalhes da Casa
          </h2>
          {isLoading ? ( // Render loading state if data is still being fetched
            <p>A processar...</p>
          ) : houseDetails ? (
            <div>
              <p className="mb-5">
                <span className="font-bold">Tipo de Casa:</span> <br />
                {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
              </p>
              <p className="mb-5">
                <span className="font-bold">Morada:</span>
                <br />
                {houseDetails.streetName} <br />
                {houseDetails.locality} <br />
                {houseDetails.postalCode}
              </p>
              <p className="mb-5">
                <span className="font-bold">Condições habitacionais:</span>
                <br />
                {houseDetails.housingConditions}
              </p>
              <p className="mb-5">
                <span className="font-bold">Área bruta:</span>
                <br />
                {houseDetails.area}
              </p>
              <p className="mb-5">
                <span className="font-bold">Georreferenciação:</span>
                <br />
                {houseDetails.latitude}, {houseDetails.longitude}
              </p>
            </div>
          ) : (
            <p>Falha a recuperar dados...</p>
          )}
          <div className="flex justify-center">
            <button
              className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1 mr-5 w-28 h-10"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isLoading ? "A processar..." : "Apagar"}
            </button>
            {houseDetails && (
              <Link href={`/editHouse/${houseDetails._id}`}>
                <button className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2 mt-1 w-28 h-10">
                  Editar
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseFullDetails;
