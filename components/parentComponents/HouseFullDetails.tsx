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
        <div className="p-5 lg:w-[90rem] w-72">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BsFillHouseDownFill
                size={32}
                className="mr-4 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
              />
              <h2 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
                {houseDetails?.typeOfHouse} - {houseDetails?.selectedOption} (
                {houseDetails?.selectedYear})
              </h2>
            </div>
            <div className="flex flex-row items-center justify-end">
              <div className="flex flex-col items-end justify-end mr-5">
                <p className="pt-2 mb-1 text-xs font-black">Estado</p>
                <p className="text-xs md:text-sm">
                  {houseStateMapping[house?.houseState]}
                </p>
              </div>
              <div className="mt-1">
                {houseDetails &&
                  houseDetails.houseState === "registoInicial" && (
                    <button
                      className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white"
                      onClick={handlePedidoDeAjuda}
                      disabled={isRequestingHelp}
                    >
                      {isRequestingHelp ? "A processar..." : "Pedir Análise"}
                    </button>
                  )}
                {houseDetails &&
                  houseDetails.houseState !== "registoInicial" && (
                    <button
                      className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white"
                      onClick={handleViewRequest}
                    >
                      Consultar processo
                    </button>
                  )}
              </div>
            </div>
          </div>

          {isLoading ? ( // Render loading state if data is still being fetched
            <p>...</p>
          ) : houseDetails ? (
            <div className="flex items-center justify-start mt-6">
              <div className=" flex flex-col lg:flex-row items-start gap-x-6">
                <div className="mb-5 lg:w-1/3 sm:mr-24">
                  <p className="pt-0 lg:pt-2 mb-1 text-xs font-black">Imagem</p>
                  {houseDetails.image && houseDetails.image.data ? (
                    <div className="w-80 h-80">
                      <Image
                        src={houseDetails.image.data}
                        alt="House"
                        width={200}
                        height={200}
                        className="mt-1 rounded-lg w-full h-full object-cover"
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
                  <p className="pt-2 mb-1 text-xs font-black mt-1">
                    Tipo de Casa
                  </p>
                  <p className="text-xs md:text-sm">
                    {houseDetails.typeOfHouse} - {houseDetails.selectedOption}
                  </p>

                  <p className="pt-2 mb-1 text-xs font-black  mt-3">
                    Área bruta
                  </p>
                  <p className="text-xs md:text-sm">
                    {houseDetails.area} m<sup>2</sup>
                  </p>

                  <p className="pt-2 mb-1 text-xs font-black  mt-3">
                    Ano de construção
                  </p>
                  <p className="text-xs md:text-sm">
                    {houseDetails.selectedYear}
                  </p>
                  <p className="pt-2 mb-1 text-xs font-black  mt-3">
                    Condições habitacionais
                  </p>
                  <p className="text-xs md:text-sm">
                    {houseDetails.housingConditions}
                  </p>
                </div>

                <div className="lg:w-1/3 pt-2">
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
                    {houseDetails.civilParish}, {houseDetails.municipality}
                  </p>
                  <p className="text-xs md:text-sm mb-0.5">
                    {houseDetails.postalCode}
                  </p>
                  <p className="pt-2 mb-1 text-xs font-black  mt-3">
                    Georreferenciação
                  </p>
                  <p className="text-xs md:text-sm">
                    {houseDetails.latitude}, {houseDetails.longitude}
                  </p>
                </div>
                <div className="flex flex-col gap-x-2 mt-1">
                  <button
                    className="btn btn-outline btn-sm rounded-none md:btn-md mt-4 border-red-800 text-teal-950 hover:bg-red-800 w-20"
                    onClick={() => handleDelete(houseDetails)}
                    disabled={isDeleting}
                  >
                    {isLoading ? "A processar..." : "Apagar"}
                  </button>
                  {houseDetails && (
                    <Link href={`/editHouse/${houseDetails._id}`}>
                      <button className="btn btn-outline btn-sm rounded-none md:btn-md mt-4 border-teal-950 text-teal-950 w-20">
                        Editar
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Falha a recuperar dados...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseFullDetails;
