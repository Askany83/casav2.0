"use client";

import Link from "next/link";
import { useDeleteHouse } from "@/customHooks/useDeleteHouse";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useHelpRequest from "@/customHooks/useHelpRequest";
import { BsFillHouseDownFill } from "react-icons/bs";
import { RxShadowNone } from "react-icons/rx";
import { houseStateMapping } from "@/utils/houseStateProcess";
import { House } from "@/interfaces/interfaces";
const HouseFullDetails = ({
  house,
  isLoading,
  houseDetails,

  isRequestingHelp,
}: {
  house: House;
  isLoading: boolean;
  houseDetails: any;

  isRequestingHelp: boolean;
}) => {
  // Destructure the handleDelete function and isDeleting state from the useDeleteHouse hook
  const { handleDelete, isDeleting } = useDeleteHouse();

  const {
    userId,
    handlePedidoDeAjuda,
    error: helpRequestError,
  } = useHelpRequest(houseDetails, useRouter());

  const router = useRouter();

  const handleViewRequest = async () => {
    try {
      // Fetch help request data
      const response = await fetch(
        `/api/getHelpRequest?houseId=${houseDetails._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch help request data");
      }
      const helpRequestData = await response.json();
      // setHelpRequest(helpRequestData);
      console.log("Help request data:", helpRequestData);

      // Store help request data in sessionStorage
      sessionStorage.setItem("helpRequest", JSON.stringify(helpRequestData));

      router.push(`/helpRequestAnswer/${helpRequestData._id}`);
    } catch (error) {
      console.error("Error fetching help request:", error);
      // Handle error
    }
  };

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center">
        <div className="p-5 lg:w-[99rem] w-72 ">
          <div className="p-4 -mt-4">
            <div className="flex items-center justify-center">
              <BsFillHouseDownFill
                size={32}
                className="mb-4 mr-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              <h2 className="text-sm md:text-xl font-black mb-3 text-gray-900">
                Detalhes da Casa
              </h2>
            </div>
            <div className="divider divider-primary -mt-1"></div>
            {isLoading ? ( // Render loading state if data is still being fetched
              <p>...</p>
            ) : houseDetails ? (
              <div className="flex items-center justify-center">
                <div className=" flex flex-col lg:flex-row items-start">
                  <div className="mb-5 lg:w-1/3 sm:mr-24">
                    <p className="pt-0 lg:pt-2 mb-1 text-xs font-black">
                      Imagem
                    </p>
                    {houseDetails.image && houseDetails.image.data ? (
                      <div className="">
                        <Image
                          src={houseDetails.image.data}
                          alt="House"
                          width={450}
                          height={450}
                          className="mt-1 rounded-lg"
                        />{" "}
                      </div>
                    ) : (
                      <div>
                        <RxShadowNone size={32} className="mr-2" />
                        <p>No Image</p>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-1/3 pt-2">
                    <p className="pt-2 mb-1 text-xs font-black">
                      Estado do processo
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseStateMapping[house.houseState]}
                    </p>

                    <p className="pt-2 mb-1 text-xs font-black mt-1">
                      Tipo de Casa
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
                    </p>

                    <p className="pt-2 mb-1 text-xs font-black  mt-1">
                      Morada completa
                    </p>
                    <p className="text-xs md:text-sm mb-0.5">
                      {houseDetails.streetName}
                    </p>
                    <p className="text-xs md:text-sm mb-0.5">
                      {houseDetails.locality}
                    </p>
                    <p className="text-xs md:text-sm mb-0.5">
                      {houseDetails.municipality}
                    </p>
                    <p className="text-xs md:text-sm mb-0.5">
                      {houseDetails.postalCode}
                    </p>
                  </div>

                  <div className="lg:w-1/3 pt-2">
                    <p className="pt-2 mb-1 text-xs font-black">
                      Condições habitacionais
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseDetails.housingConditions}
                    </p>

                    <p className="pt-2 mb-1 text-xs font-black  mt-1">
                      Área bruta
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseDetails.area} m<sup>2</sup>
                    </p>

                    <p className="pt-2 mb-1 text-xs font-black  mt-1">
                      Georreferenciação
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseDetails.latitude}, {houseDetails.longitude}
                    </p>

                    <p className="pt-2 mb-1 text-xs font-black  mt-1">
                      Ano de construção
                    </p>
                    <p className="text-xs md:text-sm">
                      {houseDetails.selectedYear}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Falha a recuperar dados...</p>
            )}

            <div className="flex items-center justify-center gap-x-2 mt-4 sm:mt-10">
              <button
                className="btn btn-accent btn-sm rounded-box md:btn-md"
                onClick={() => handleDelete(houseDetails)}
                disabled={isDeleting}
              >
                {isLoading ? "A processar..." : "Apagar"}
              </button>
              {houseDetails && (
                <Link href={`/editHouse/${houseDetails._id}`}>
                  <button className="btn btn-success btn-sm rounded-box md:btn-md">
                    Editar
                  </button>
                </Link>
              )}
              {houseDetails && houseDetails.houseState === "registoInicial" && (
                <button
                  className="btn btn-primary btn-sm rounded-box md:btn-md"
                  onClick={handlePedidoDeAjuda}
                  disabled={isRequestingHelp}
                >
                  {isRequestingHelp ? "A processar..." : "Pedir Análise"}
                </button>
              )}
              {houseDetails && houseDetails.houseState !== "registoInicial" && (
                <button
                  className="btn btn-primary btn-sm rounded-box md:btn-md"
                  onClick={handleViewRequest}
                >
                  Ver Pedido
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseFullDetails;
