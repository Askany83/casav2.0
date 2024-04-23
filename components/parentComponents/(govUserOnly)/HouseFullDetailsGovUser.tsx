"use client";

// import { Bank } from "@phosphor-icons/react";

import Image from "next/image";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { houseStateMapping } from "@/utils/houseStateProcess";
import { useState } from "react";
import { BsFillHouseDownFill } from "react-icons/bs";
import { RxShadowNone } from "react-icons/rx";
import HelpRequest from "@/components/parentComponents/(govUserOnly)/HelpRequest";

const HouseFullDetails = ({
  house,
  isLoading,
  houseDetails,
  helpRequest,
}: {
  house: string;
  isLoading: boolean;
  houseDetails: any;
  helpRequest: any;
}) => {
  const [showHelpRequest, setShowHelpRequest] = useState(false);

  return (
    <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="flex justify-center items-start flex-col md:flex-row">
        <div className="w-full md:w-1/4 px-2">
          <div className="p-4 glass rounded-lg sm:w-64 md:w-80">
            <div className="flex items-center justify-center">
              <BsFillHouseDownFill size={32} className="mb-4 mr-2" />
              <h2 className="text-xl font-black mb-3 text-gray-900">
                Detalhes da Casa
              </h2>
            </div>
            <div className="divider divider-primary -mt-1"></div>
            {isLoading ? ( // Render loading state if data is still being fetched
              <p>A processar...</p>
            ) : houseDetails ? (
              <div>
                <div className="mb-5">
                  <p className="font-bold text-xs">Imagem</p>
                  {houseDetails.image && houseDetails.image.data ? (
                    <div className="flex items-center justify-center">
                      <Image
                        src={houseDetails.image.data}
                        alt="House"
                        width={300}
                        height={300}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <div>
                      <RxShadowNone size={32} className="mr-2" />
                      <p>No Image</p>
                    </div>
                  )}
                </div>

                <p className=" font-bold text-xs">Tipo de Casa</p>
                <p className="text-sm">
                  {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
                </p>

                <p className="mt-2 font-bold text-xs">Morada completa</p>
                <p className="text-sm">
                  {houseDetails.streetName} <br />
                  {houseDetails.locality} <br />
                  {houseDetails.civilParish}
                  <br />
                  {houseDetails.municipality} <br />
                  {houseDetails.postalCode}
                </p>

                <p className="mt-2 font-bold text-xs">
                  Condições habitacionais
                </p>
                <p className="text-sm">
                  {" "}
                  {conditionsMapHouses[houseDetails.housingConditions]}
                </p>

                <p className="mt-2 font-bold text-xs">Área bruta</p>
                <p className="text-sm">
                  {houseDetails.area} m<sup>2</sup>
                </p>

                <p className="mt-2 font-bold text-xs">Georreferenciação</p>
                <p className="text-sm">
                  {houseDetails.latitude}, {houseDetails.longitude}
                </p>

                <p className="mt-2 font-bold text-xs">Ano de construção</p>
                <p className="text-sm">{houseDetails.selectedYear}</p>

                <p className="mt-2 font-bold text-xs">Estado do processoo</p>
                <p className="text-sm">
                  {houseStateMapping[houseDetails.houseState]}
                </p>
              </div>
            ) : (
              <p>Falha a recuperar dados...</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/4 px-2">
          <div className="px-2 mt-3 flex flex-col justify-center">
            {!showHelpRequest && (
              <button
                onClick={() => setShowHelpRequest(true)}
                className="btn btn-accent mb-4"
              >
                Ver Pedido de Ajuda
              </button>
            )}
            {showHelpRequest && (
              <div className="px-2">
                <HelpRequest />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseFullDetails;
