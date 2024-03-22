/**
 * Custom hook that fetches and paginates the houses for the logged-in user.
 *
 * Returns houses array, current page, number of items per page, offset,
 * and page change handler function.
 */

import { useWindowSize } from "@/customHooks/useWindowSize";
import { useState, useEffect } from "react";
import { getHousesOfUser } from "@/fetchCallServices/getHousesOfUser";
import { House } from "@/interfaces/interfaces";
import { useUserEmailFromSession } from "./useUserEmailFromSession";

export function useHousesInRecord() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const userEmail = useUserEmailFromSession();

  // Determine the number of items per page based on screen size
  const { width } = useWindowSize() || {};
  const PER_PAGE = width && width < 640 ? 1 : 2; // Number of items per page
  const offset = currentPage * PER_PAGE;

  // Update current page state
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    if (userEmail) {
      getHousesOfUser(setHouses, setHouses, userEmail); // Fetch houses and update state
    }
  }, [userEmail]);

  return {
    houses,
    currentPage,
    PER_PAGE,
    offset,
    handlePageClick,
  };
}
