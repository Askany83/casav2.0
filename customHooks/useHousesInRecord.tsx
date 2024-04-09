/**
 * Custom hook that fetches and paginates the houses for the logged-in user.
 *
 * Returns houses array, current page, number of items per page, offset,
 * and page change handler function.
 */

import { useWindowSize } from "@/customHooks/useWindowSize";
import { useState, useEffect } from "react";
import { getHousesOfUser } from "@/fetchCallServices/getHousesOfUserSStorageFetch";
import { House } from "@/interfaces/interfaces";
import { useUserIdFromSession } from "./useUserIdFromSession";

export function useHousesInRecord() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  //get user id
  const userId = useUserIdFromSession();

  // Determine the number of items per page based on screen size
  const { width } = useWindowSize() || {};
  const PER_PAGE = width && width < 640 ? 1 : 2; // Number of items per page
  const offset = currentPage * PER_PAGE;

  // Update current page state
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    if (userId) {
      getHousesOfUser(setHouses, setHouses, userId); // Fetch houses and update state
    }
  }, [userId]);

  return {
    houses,
    currentPage,
    PER_PAGE,
    offset,
    handlePageClick,
  };
}
