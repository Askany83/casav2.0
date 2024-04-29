"use client";

// import { Bank } from "@phosphor-icons/react";

import Image from "next/image";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { houseStateMapping } from "@/utils/houseStateProcess";
import { useState } from "react";
import { BsFillHouseDownFill } from "react-icons/bs";
import { RxShadowNone } from "react-icons/rx";
import HelpRequest from "@/components/parentComponents/(govUserOnly)/HelpRequest";
import { formatDate } from "@/utils/formatDate";
import { MdRealEstateAgent } from "react-icons/md";

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
        <div className="w-full md:w-1/2 px-2 ml-12">
          <div className="p-4 lg:w-[90rem] w-72 mt-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-start -mt-6">
                <BsFillHouseDownFill
                  size={32}
                  className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
                />
                <h2 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
                  Detalhes do processo
                </h2>
              </div>
              <div className="flex flex-row mr-12">
                {!showHelpRequest && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setShowHelpRequest(true)}
                      className="btn btn-sm rounded-none md:btn-md mt-4 bg-gray-300 text-teal-950 hover:bg-teal-950 hover:text-white w-32"
                    >
                      Ver Pedido de Ajuda
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isLoading ? ( // Render loading state if data is still being fetched
              <p>A processar...</p>
            ) : houseDetails ? (
              <div className="flex flex-row">
                <div className="mr-24">
                  <p className="font-bold text-xs">Imagem</p>
                  {houseDetails.image && houseDetails.image.data ? (
                    <div className="w-80 h-80">
                      <Image
                        src={houseDetails.image.data}
                        alt="House"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div>
                      <RxShadowNone size={32} className="mr-2" />
                      <p>No Image</p>
                    </div>
                  )}
                  <div className="mt-14">
                    <div className="flex items-start justify-start">
                      <MdRealEstateAgent size={32} className="mb-5 mr-2" />
                      <h1 className="mb-5 mt-1 font-bold">Pedido de ajuda</h1>
                    </div>
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="mb-5">
                        <p className="font-bold text-xs">Iniciado</p>
                        <p className="text-sm mb-1">
                          {formatDate(helpRequest.createdAt)}
                        </p>

                        <p className="font-bold text-xs mt-3">Atualizado</p>
                        <p className="text-sm mb-1">
                          {formatDate(helpRequest.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className=" font-bold text-xs">Tipo de Casa</p>
                  <p className="text-sm">
                    {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
                  </p>

                  <p className="mt-8 font-bold text-xs">Morada completa</p>
                  <p className="text-sm">
                    {houseDetails.streetName} <br />
                    {houseDetails.locality} <br />
                    {houseDetails.civilParish}
                    <br />
                    {houseDetails.municipality} <br />
                    {houseDetails.postalCode}
                  </p>

                  <p className="mt-8 font-bold text-xs">
                    Condições habitacionais
                  </p>
                  <p className="text-sm">
                    {" "}
                    {conditionsMapHouses[houseDetails.housingConditions]}
                  </p>

                  <p className="mt-8 font-bold text-xs">Área bruta</p>
                  <p className="text-sm">
                    {houseDetails.area} m<sup>2</sup>
                  </p>

                  <p className="mt-8 font-bold text-xs">Georreferenciação</p>
                  <p className="text-sm">
                    {houseDetails.latitude}, {houseDetails.longitude}
                  </p>

                  <p className="mt-9 font-bold text-xs">Ano de construção</p>
                  <p className="text-sm">{houseDetails.selectedYear}</p>

                  <p className="mt-8 font-bold text-xs">Estado do processoo</p>
                  <p className="text-sm">
                    {houseStateMapping[houseDetails.houseState]}
                  </p>
                </div>
              </div>
            ) : (
              <p>Falha a recuperar dados...</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-2">
          <div className="px-2 mt-3 flex flex-col justify-center">
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
