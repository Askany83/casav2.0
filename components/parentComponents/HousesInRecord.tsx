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
      <div className="grid place-items-center h-screen">
        <div className="border-black-400 border-2 bg-gray-100 p-5">
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
            houses.slice(offset, offset + PER_PAGE).map((house, index) => (
              <Suspense key={index} fallback={<div>A processar...</div>}>
                <LazyHouseCard house={house} />
              </Suspense>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default HousesInRecord;
