import { useSession } from "next-auth/react";
import { useHouses } from "@/contexts/HousesContext";
import { useWindowSize } from "@/customHooks/useWindowSize";
import { useState, useEffect } from "react";
import { getHousesOfUser } from "@/fetchCallServices/getHousesOfUser";
import { House } from "@/interfaces/interfaces";

export function useHousesInRecord() {
  const { houses: initialHouses, setHouses } = useHouses();
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // Determine the number of items per page based on screen size
  const { width } = useWindowSize() || {};
  const PER_PAGE = width && width < 640 ? 1 : 2; // Number of items per page

  const offset = currentPage * PER_PAGE;

  useEffect(() => {
    if (!initialHouses.length) {
      // Fetch houses of user only if initialHouses is empty
      getHousesOfUser(setHouses, userEmail);
    }
  }, [initialHouses, setHouses, userEmail]);

  console.log("this is initialHouses: ", initialHouses);
  console.log("this is set: ", setHouses);
  console.log("this is userEmail: ", userEmail);

  // Update current page state
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleOpenModal = (house: House) => {
    setSelectedHouse(house);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return {
    houses: initialHouses,
    currentPage,
    modalOpen,
    selectedHouse,
    PER_PAGE,
    offset,
    handlePageClick,
    handleOpenModal,
    handleCloseModal,
  };
}
