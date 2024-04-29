"use client";

import { House } from "@/interfaces/interfaces";
import { BsFillHousesFill } from "react-icons/bs";
import { FaHouseDamage } from "react-icons/fa";
import { BsHouseSlashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { sortHouses } from "@/utils/sortHouses";
import HouseStateFilter from "@/components/parentComponents/(govUserOnly)/HouseStateFilter";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import React from "react";
import { houseStateMapping } from "@/utils/houseStateProcess";
import { formatDate } from "@/utils/formatDate";
import HouseDetailsButtonGovUser from "@/components/childComponents/(govUserOnly)/HouseDetailsButtonGovUser";

export default function AllHousesInRecord() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [sortBy, setSortBy] = useState("createdAt"); // Default attribute to sort by
  // New state variables for additional sorting options
  const [sortType, setSortType] = useState(""); // Default sort type
  const [sortYear, setSortYear] = useState(""); // Default sort year
  const [sortCivilParish, setSortCivilParish] = useState("");
  const [selectedHouseState, setSelectedHouseState] =
    useState("Todas as casas");

  console.log("Houses:", houses);

  useEffect(() => {
    async function fetchAllHouses() {
      try {
        const response = await fetch(GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        setHouses(data);

        sessionStorage.setItem("cachedHouses", JSON.stringify(data));

        console.log("Fetched all houses in record:", data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchAllHouses();
  }, []);

  // Filter and sort houses based on selected options
  const sortedHouses = [...houses]
    .filter(
      (house) =>
        selectedHouseState === "Todas as casas" ||
        house.houseState === selectedHouseState
    )
    .filter((house) => house.houseState !== "registoInicial")
    .sort((a, b) => {
      if (sortBy === "civilParish") {
        // Sort by civilParish if selected
        return sortOrder === "asc"
          ? a.civilParish.localeCompare(b.civilParish)
          : b.civilParish.localeCompare(a.civilParish);
      } else {
        // Default sorting logic for other attributes
        return sortHouses(a, b, sortBy, sortOrder);
      }
    });

  const handleClick = () => {
    // console.log("handleClick  - houseCard: ", house);
  };

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5 lg:w-[90rem] w-72">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-start">
              <BsFillHousesFill
                size={32}
                className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
              />
              <h1 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
                Casas para requalificação
              </h1>
            </div>
            <div className="flex flex-row -mr-5">
              <div className="flex items-center justify-center mb-3 mt-5 mr-24">
                <span className="mr-2 font-bold text-xs md:text-sm">
                  Ordenar por
                </span>
                <select
                  className="select select-bordered select-neutral rounded-none mt-1 w-full max-w-xs select-sm md:select-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="createdAt">Data de registo</option>
                  <option value="civilParish">Freguesia</option>
                  <option value="typeOfHouse">Tipo de habitação</option>
                  <option value="selectedYear">Ano de construção</option>
                  <option value="updatedAt">
                    Data de atualização de dados
                  </option>
                </select>

                <button
                  className="ml-2 mt-1 btn btn-active rounded-none"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>

              <HouseStateFilter
                selectedHouseState={selectedHouseState}
                setSelectedHouseState={setSelectedHouseState}
              />
            </div>
          </div>

          {houses.length === 0 ? (
            <div className="flex items-center justify-center">
              <FaHouseDamage size={32} className="mr-2" />
              <h1 className="text-xl font-black mt-2 text-gray-900">
                Sem registos
              </h1>
            </div>
          ) : sortedHouses.length === 0 ? (
            <div className="my-3 flex justify-center items-center">
              <BsHouseSlashFill size={32} className="mr-2" />
              <h1 className="text-xl font-black mt-2 text-gray-900">
                Sem casas neste estado de processo
              </h1>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-600">
                <tr>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Estado do processo
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Última atualização
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Tipo de Casa
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Condições Habitacionais
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Ano de Construção
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Freguesia
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Município
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs">
                    Data de Registo
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {sortedHouses.map((house, index) => (
                  <tr
                    key={index}
                    className="bg-white font-normal text-black border-b hover:text-white hover:bg-gray-500"
                  >
                    <td className="py-4 px-6 text-xs">
                      {houseStateMapping[house.houseState]}
                    </td>
                    <td className="py-4 px-6 text-xs">
                      {formatDate(house.updatedAt)}
                    </td>
                    <td className="py-4 px-6 text-xs">
                      {house.typeOfHouse} - {house.selectedOption}
                    </td>
                    <td className="py-4 px-6 text-xs">
                      {conditionsMapHouses[house.housingConditions]}
                    </td>
                    <td className="py-4 px-6 text-xs">{house.selectedYear}</td>
                    <td className="py-4 px-6 text-xs">{house.civilParish}</td>
                    <td className="py-4 px-6 text-xs">{house.municipality}</td>
                    <td className="py-4 px-6 text-xs">
                      {formatDate(house.createdAt)}
                    </td>
                    <td className="py-1 pr-4">
                      <HouseDetailsButtonGovUser
                        house={house}
                        onClick={handleClick}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
