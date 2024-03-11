"use client";

import { lazy, Suspense } from "react";
import { useHousesInRecord } from "@/customHooks/useHousesInRecord";

// Lazy loading
const LazyPagination = lazy(
  () => import("@/components/childComponents/Pagination")
);
const LazyHouseDetailsModal = lazy(
  () => import("@/components/HouseDetailsModal")
);
const LazyHouseCard = lazy(
  () => import("@/components/childComponents/HouseCard")
);

export function HousesInRecord() {
  const {
    houses,
    currentPage,
    modalOpen,
    selectedHouse,
    PER_PAGE,
    offset,
    handlePageClick,
    handleOpenModal,
    handleCloseModal,
  } = useHousesInRecord();

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="border-black-400 border-2 bg-gray-100 p-5">
          <div className="my-3 mt-5">
            <Suspense fallback={<div>A processar...</div>}>
              <LazyPagination
                pageCount={Math.ceil(houses.length / PER_PAGE)}
                currentPage={currentPage}
                onPageChange={handlePageClick}
              />
            </Suspense>
          </div>
          {houses.slice(offset, offset + PER_PAGE).map((house, index) => (
            <Suspense key={index} fallback={<div>A processar...</div>}>
              <LazyHouseCard house={house} onOpenModal={handleOpenModal} />
            </Suspense>
          ))}

          <div className="my-3">
            <Suspense fallback={<div>A processar...</div>}>
              <LazyPagination
                pageCount={Math.ceil(houses.length / PER_PAGE)}
                currentPage={currentPage}
                onPageChange={handlePageClick}
              />
            </Suspense>
          </div>
        </div>
      </div>
      {modalOpen && selectedHouse && (
        <Suspense fallback={<div>A processar...</div>}>
          <LazyHouseDetailsModal
            selectedHouse={selectedHouse}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </>
  );
}

export default HousesInRecord;
