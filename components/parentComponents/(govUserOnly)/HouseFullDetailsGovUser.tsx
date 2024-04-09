"use client";

import { useDeleteHouse } from "@/customHooks/useDeleteHouse";
import { Bank } from "@phosphor-icons/react";
import Image from "next/image";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";

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
    <>
      <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
        <div className="h-full flex justify-center items-start">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <Bank
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mb-4 mr-2"
              />
              <h2 className="text-xl font-bold mb-4 text-gray-900 text-left">
                Detalhes da Casa
              </h2>
            </div>
            {isLoading ? ( // Render loading state if data is still being fetched
              <p>A processar...</p>
            ) : houseDetails ? (
              <div>
                <div className="mb-5">
                  <p className="font-bold">Imagem</p>
                  {houseDetails.image && houseDetails.image.data ? (
                    <Image
                      src={houseDetails.image.data}
                      alt="House"
                      width={200}
                      height={200}
                      className="mt-1"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <p className="mb-5">
                  <span className="font-bold">Tipo de Casa:</span> <br />
                  {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
                </p>
                <p className="mb-5">
                  <span className="font-bold">Morada:</span>
                  <br />
                  {houseDetails.streetName} <br />
                  {houseDetails.locality} <br />
                  {houseDetails.municipality} <br />
                  {houseDetails.postalCode}
                </p>
                <p className="mb-5">
                  <span className="font-bold">Condições habitacionais:</span>
                  <br />
                  {conditionsMapHouses[houseDetails.housingConditions]}
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
                <p className="mb-5">
                  <span className="font-bold">Ano de construção:</span>
                  <br />
                  {houseDetails.selectedYear}
                </p>
              </div>
            ) : (
              <p>Falha a recuperar dados...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseFullDetails;
