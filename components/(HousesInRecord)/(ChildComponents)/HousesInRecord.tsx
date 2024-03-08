"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useHouses } from "../../../app/contexts/HousesContext";
import { HOUSE_IN_RECORDS_API_ENDPOINT } from "../../../app/utils/URLManager";
import { conditionsMapHouses } from "@/app/utils/conditionsMapHouses";
import { House } from "@/app/types/House";

// Lazy loading
const LazyPagination = lazy(
  () => import("@/components/(UtilsComponents)/Pagination")
);
const LazyHouseDetailsModal = lazy(
  () =>
    import("@/components/(HousesInRecord)/(ChildComponents)/HouseDetailsModal")
);
const LazyHouseCard = lazy(
  () => import("@/components/(HousesInRecord)/HouseCard")
);

// Hook to get window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function HousesInRecord() {
  const { houses, setHouses } = useHouses();
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const headers: { [key: string]: string } = {
          "Content-Type": "application/json",
        };

        if (userEmail) {
          headers.Authorization = userEmail;
        }

        const response = await fetch(HOUSE_IN_RECORDS_API_ENDPOINT, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }

        const fetchedHouses: House[] = await response.json();
        // Map fetched values to display values
        const mappedHouses = fetchedHouses.map((house) => ({
          ...house,
          housingConditions: mapHousingCondition(house.housingConditions),
        }));
        setHouses(mappedHouses);
        console.log(mappedHouses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHouses();
  }, [setHouses, userEmail]);

  // Function to map housing conditions
  const mapHousingCondition = (condition: string) => {
    return conditionsMapHouses[condition] || condition;
  };

  // Update current page state
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // Determine the number of items per page based on screen size
  const { width } = useWindowSize() || {};
  const PER_PAGE = width && width < 640 ? 1 : 2; // Number of items per page

  const offset = currentPage * PER_PAGE;

  const handleOpenModal = (house: House) => {
    setSelectedHouse(house);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid place-items-center h-screen pt-24">
        <div className="p-5 border-black-400 border-2 bg-gray-100">
          <div className="mb-8">
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            <LazyPagination
              pageCount={Math.ceil(houses.length / PER_PAGE)}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </div>
          {houses.slice(offset, offset + PER_PAGE).map((house, index) => (
            <Suspense key={index} fallback={<div>Loading house card...</div>}>
              <LazyHouseCard house={house} onOpenModal={handleOpenModal} />
            </Suspense>
          ))}

          <div className="mb-10">
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            <LazyPagination
              pageCount={Math.ceil(houses.length / PER_PAGE)}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </div>
      {modalOpen && selectedHouse && (
        <Suspense fallback={<div>Loading...</div>}>
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
