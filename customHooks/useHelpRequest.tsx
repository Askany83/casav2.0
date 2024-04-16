import { useState } from "react";
import { useUserIdFromSession } from "./useUserIdFromSession";
import { House } from "@/interfaces/interfaces";

const useHelpRequest = (houseDetails: any, router: any) => {
  const [error, setError] = useState<string | Error>("");
  const userId = useUserIdFromSession();

  const handlePedidoDeAjuda = async () => {
    console.log("Pedido de Ajuda initiated");

    const sendHelpRequest = window.confirm(
      "Tem a certeza que deseja solicitar um pedido de ajuda? Por favor verifique os dados antes de prosseguir."
    );
    if (!sendHelpRequest) return;

    try {
      if (houseDetails && userId) {
        const { municipality, _id: houseId } = houseDetails;

        const newHelpRequest = {
          houseOwnerId: userId,
          receiver: municipality,
          houseId: houseId,
        };

        console.log("newHelpRequest: ", newHelpRequest);

        const response = await fetch("/api/helpRequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHelpRequest),
        });

        if (!response.ok) {
          throw new Error("Failed to initiate help request");
        }

        // Fetching cached houses data from sessionStorage
        const cachedHouses = sessionStorage.getItem("cachedHouses");
        if (cachedHouses) {
          const houses = JSON.parse(cachedHouses);
          const updatedHouses = houses.map((house: House) => {
            if (house._id === houseId) {
              return { ...house, houseState: "pedidoDeAjuda" }; // Updating the house state
            }
            return house;
          });

          // Saving updated houses back to sessionStorage
          sessionStorage.setItem("cachedHouses", JSON.stringify(updatedHouses));
          console.log("Navigating to house details page:", `/house/${houseId}`);

          // window.location.href = `/housesInRecord`;

          // router.push(`/house/${houseId}`);
          window.location.reload();
        }
        alert("Pedido de ajuda enviado com sucesso!");
      }
    } catch (error) {
      console.error("Routing error:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    userId,
    handlePedidoDeAjuda,
    error,
  };
};

export default useHelpRequest;
