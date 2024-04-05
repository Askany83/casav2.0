"use client";

import { useState, useEffect } from "react";
import { useWindowSize } from "@/customHooks/useWindowSize";
import { lazy, Suspense } from "react";
import { Door } from "@phosphor-icons/react";

// Lazy loading
const LazyPagination = lazy(
  () => import("@/components/childComponents/Pagination")
);

const LazyHouseCard4GovUser = lazy(
  () => import("@/components/childComponents/(govUserOnly)/HouseCard4GovUser")
);

export default function AllHousesInRecord() {
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchAllHouses() {
      try {
        const response = await fetch("/api/allHousesInRecord");
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
            <div className="my-3 mt-5">
              {/* 
            
            Lazy-loaded Pagination component 
            
            */}
              {houses.length > 0 && (
                <Suspense fallback={<div>A processar...</div>}>
                  <LazyPagination
                    pageCount={Math.ceil(houses.length / PER_PAGE)}
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
            ) : (
              <div className="flex flex-wrap">
                {houses.slice(offset, offset + PER_PAGE).map((house, index) => (
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
