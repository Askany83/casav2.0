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
import RegisterHouseButton from "@/components/childComponents/RegisterHouseButton";

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
      <div className="fixed top-0 bottom-0 left-20 md:left-10 lg:left-16 xl:left-24 right-0 overflow-y-auto ">
        <div className="grid place-items-start h-screen justify-center ">
          <div className="p-5 lg:w-[90rem] w-64">
            <div className="flex items-center justify-between">
              <div className="flex items-center -mt-5">
                <BsFillHousesFill
                  size={32}
                  className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
                />
                <h1 className="text-sm md:text-2xl font-black text-gray-900">
                  As minhas casas
                </h1>
              </div>
              <div className="flex items-center justify-center">
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
              <div className="mr-20 md:mr-10 lg:mr-10">
                <RegisterHouseButton />
              </div>
            </div>

            {/* Render houses or display message if no records */}
            {houses.length === 0 ? (
              <div className="flex items-center justify-center">
                <h1 className="text-sm md:text-xl font-semibold mt-2 text-gray-900">
                  Nenhuma casa registada
                </h1>
              </div>
            ) : (
              <div className="flex flex-wrap gap-10 items-start justify-center -mt-4 lg:-mt-0 ">
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
    </>
  );
}

export default HousesInRecord;
