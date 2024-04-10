"use client";

import { useState, useEffect } from "react";
import { useWindowSize } from "@/customHooks/useWindowSize";
import { lazy, Suspense } from "react";
import { Door } from "@phosphor-icons/react";
import { GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { sortHouses } from "@/utils/sortHouses";
import { House } from "@/interfaces/interfaces";
import HouseStateFilter from "@/components/parentComponents/(govUserOnly)/HouseStateFilter";

// Lazy loading
const LazyPagination = lazy(
  () => import("@/components/childComponents/Pagination")
);

const LazyHouseCard4GovUser = lazy(
  () => import("@/components/childComponents/(govUserOnly)/HouseCard4GovUser")
);

export default function AllHousesInRecord() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [sortBy, setSortBy] = useState("createdAt"); // Default attribute to sort by
  // New state variables for additional sorting options
  const [sortType, setSortType] = useState(""); // Default sort type
  const [sortYear, setSortYear] = useState(""); // Default sort year
  const [sortLocality, setSortLocality] = useState(""); // Default sort locality
  const [selectedHouseState, setSelectedHouseState] =
    useState("Todas as casas");

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

  // Determine the number of items per page based on screen size
  const { width } = useWindowSize() || {};
  const PER_PAGE = width && width < 640 ? 1 : 2; // Number of items per page
  const offset = currentPage * PER_PAGE;

  // Update current page state
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // Filter and sort houses based on selected options
  const sortedHouses = [...houses]
    .filter(
      (house) =>
        selectedHouseState === "Todas as casas" ||
        house.houseState === selectedHouseState
    )
    .sort((a, b) => sortHouses(a, b, sortBy, sortOrder));

  return (
    <>
      <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
        <div className="h-full flex justify-center items-start">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <Door
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mr-2"
              />
              <h1 className="text-xl font-bold text-gray-900 text-left">
                Casas em registo
              </h1>
            </div>

            <div className="flex items-center justify-center mb-3 mt-5">
              <span className="mr-2 font-bold">Ordenar por</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Data de registo</option>
                <option value="locality">Localidade</option>
                <option value="typeOfHouse">Tipo de habitação</option>
                <option value="selectedYear">Ano de construção</option>
                <option value="updatedAt">Data de atualização de dados</option>
              </select>

              <button
                className="ml-2 btn btn-active"
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

            <div className="my-3 mt-5">
              {/* 
            
            Lazy-loaded Pagination component 
            
            */}
              {houses.length > 0 && (
                <Suspense fallback={<div>A processar...</div>}>
                  <LazyPagination
                    pageCount={Math.ceil(sortedHouses.length / PER_PAGE)}
                    currentPage={currentPage}
                    onPageChange={handlePageClick}
                  />
                </Suspense>
              )}
            </div>
            {/* 
          
          Render houses or display message if no records 
          
          */}
            {houses.length === 0 ? (
              <div className="my-3">Sem Registos</div>
            ) : sortedHouses.length === 0 ? (
              <div className="my-3 flex justify-center items-center">
                Sem casas neste estado de processo
              </div>
            ) : (
              <div className="flex flex-wrap">
                {sortedHouses
                  .slice(offset, offset + PER_PAGE)
                  .map((house, index) => (
                    <Suspense key={index} fallback={<div>A processar...</div>}>
                      <div className="mb-4 mx-2">
                        {" "}
                        {/* Add margin between cards */}
                        <LazyHouseCard4GovUser house={house} />
                      </div>
                    </Suspense>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
