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
import { BsFillHousesFill } from "react-icons/bs";
import { FaHouseDamage } from "react-icons/fa";

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
    <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center">
        <div className="p-5">
          <div className="flex items-center justify-center">
            <BsFillHousesFill size={32} className="mr-2" />
            <h1 className="text-xl font-black mt-1 text-gray-900 ">
              Casas em registo
            </h1>
          </div>
          <div className="divider divider-primary"></div>
          <div className="mb-6 flex items-center justify-center">
            {/* Lazy-loaded Pagination component */}
            {(houses.length > PER_PAGE || currentPage > 0) && (
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
            <div className="flex items-center justify-center">
              <FaHouseDamage size={32} className="mr-2" />
              <h1 className="text-xl font-black mt-2 text-gray-900">
                Sem registos
              </h1>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 items-start justify-center">
              {houses.slice(offset, offset + PER_PAGE).map((house, index) => (
                <Suspense key={index} fallback={<div></div>}>
                  <div>
                    {" "}
                    <LazyHouseCard house={house} />
                  </div>
                </Suspense>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HousesInRecord;
