"use client";

import { Bank } from "@phosphor-icons/react";
import Image from "next/image";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { houseStateMapping } from "@/utils/houseStateProcess";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HouseFullDetails = ({
  house,
  isLoading,
  houseDetails,
}: {
  house: string;
  isLoading: boolean;
  houseDetails: any;
}) => {
  const [selectedState, setSelectedState] = useState("");

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can handle the form submission here
    console.log("Selected house state:", selectedState);

    const confirmUpdate = window.confirm(
      "Tem a certeza que quer atualizar o estado do processo deste imóvel?"
    );

    if (confirmUpdate) {
      try {
        const houseStateData = {
          houseState: selectedState,
          houseId: houseDetails._id,
          userId: houseDetails.userId,
        };

        console.log("House state data:", houseStateData);

        const response = await fetch(`/api/updateHouseState`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(houseStateData),
        });

        if (response.ok) {
          console.log("House state updated successfully");
          // Uupdate the sessionStorage
          const cachedData = sessionStorage.getItem("cachedHouses");
          if (cachedData) {
            const cachedHouses = JSON.parse(cachedData) as any[];
            const updatedHouses = cachedHouses.map((house) => {
              if (house._id === houseDetails._id) {
                return {
                  ...house,
                  houseState: selectedState,
                };
              }
              return house;
            });
            sessionStorage.setItem(
              "cachedHouses",
              JSON.stringify(updatedHouses)
            );
          }

          alert("O estado de processo da casa foi atualizado com sucesso!");

          router.push(`/allHousesInRecord`);
        } else {
          console.error("Error updating house state:", response.status);
        }
      } catch (error) {
        console.error("Error updating house state (catch):", error);
      } finally {
        setSelectedState("");
      }
    }
  };

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
                <p className="mb-5">
                  <span className="font-bold">Estado do processo:</span>
                  <br />
                  {houseStateMapping[houseDetails.houseState]}
                </p>

                {/* Form for changing the state */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <div className="mb-5">
                      <label htmlFor="houseState" className="font-bold">
                        Selecionar novo estado do processo:
                      </label>
                    </div>
                    <select
                      id="houseState"
                      name="houseState"
                      value={selectedState}
                      onChange={handleChange}
                      className="select select-bordered w-full max-w-xs"
                      required
                    >
                      <option value="">Selecione...</option>
                      {Object.keys(houseStateMapping).map((key) => (
                        <option key={key} value={key}>
                          {houseStateMapping[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-center items-center">
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </div>
                </form>
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
