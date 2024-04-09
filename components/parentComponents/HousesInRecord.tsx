/**
 * Renders a paginated list of houses from the database.
 *
 * Uses the custom hook 'useHousesInRecord' to fetch the houses data and handle pagination.
 * Renders a pagination component and a list of HouseCard components lazily.
 * Falls back to loading indicators when lazy components are loading.
 * Displays a 'no records' message if no houses returned.
 */

"use client";

import { lazy, Suspense } from "react";
import { useHousesInRecord } from "@/customHooks/useHousesInRecord";
import { Door } from "@phosphor-icons/react";

// Lazy loading
const LazyPagination = lazy(
  () => import("@/components/childComponents/Pagination")
);

const LazyHouseCard = lazy(
  () => import("@/components/childComponents/HouseCard")
);

export function HousesInRecord() {
  // Custom hook to get houses data
  const { houses, currentPage, PER_PAGE, offset, handlePageClick } =
    useHousesInRecord();

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
              {/* Lazy-loaded Pagination component */}
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
            {/* Render houses or display message if no records */}
            {houses.length === 0 ? (
              <div className="my-3">Sem Registos</div>
            ) : (
              <div className="flex flex-wrap">
                {houses.slice(offset, offset + PER_PAGE).map((house, index) => (
                  <Suspense key={index} fallback={<div>A processar...</div>}>
                    <div className="mb-4 mx-2">
                      {" "}
                      {/* Add margin between cards */}
                      <LazyHouseCard house={house} />
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

export default HousesInRecord;
