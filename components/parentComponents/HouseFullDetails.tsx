"use client";

import Link from "next/link";
import { useDeleteHouse } from "@/customHooks/useDeleteHouse";
import { Bank } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useHelpRequest from "@/customHooks/useHelpRequest";
import { BsFillHouseDownFill } from "react-icons/bs";
import { RxShadowNone } from "react-icons/rx";

const HouseFullDetails = ({
  house,
  isLoading,
  houseDetails,

  isRequestingHelp,
}: {
  house: string;
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
    <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 glass rounded-lg sm:w-64 md:w-80">
            <div className="flex items-center justify-center">
              <BsFillHouseDownFill size={32} className="mb-4 mr-2" />
              <h2 className="text-xl font-black mb-3 text-gray-900">
                Detalhes da Casa
              </h2>
            </div>
            <div className="divider divider-primary -mt-1"></div>
            {isLoading ? ( // Render loading state if data is still being fetched
              <p>...</p>
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
                      />{" "}
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
                  {houseDetails.municipality} <br />
                  {houseDetails.postalCode}
                </p>

                <p className="mt-2 font-bold text-xs">
                  Condições habitacionais
                </p>
                <p className="text-sm">{houseDetails.housingConditions}</p>

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
              </div>
            ) : (
              <p>Falha a recuperar dados...</p>
            )}
            <div className="flex items-center justify-center gap-x-2 mt-4">
              <button
                className="btn btn-accent"
                onClick={() => handleDelete(houseDetails)}
                disabled={isDeleting}
              >
                {isLoading ? "A processar..." : "Apagar"}
              </button>
              {houseDetails && (
                <Link href={`/editHouse/${houseDetails._id}`}>
                  <button className="btn btn-success">Editar</button>
                </Link>
              )}
              {houseDetails && houseDetails.houseState === "registoInicial" && (
                <button
                  className="btn btn-primary"
                  onClick={handlePedidoDeAjuda}
                  disabled={isRequestingHelp}
                >
                  {isRequestingHelp ? "A processar..." : "Pedir Ajuda"}
                </button>
              )}
              {houseDetails && houseDetails.houseState !== "registoInicial" && (
                <button className="btn btn-primary" onClick={handleViewRequest}>
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
