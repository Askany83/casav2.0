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
import { houseOwnerProfileFetch } from "@/fetchCallServices/getHouseOwnerProfile";

export function useHousesInRecord() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userId, setUserId] = useState("");

  const userEmail = useUserEmailFromSession();

  //get user id
  useEffect(() => {
    // Fetch user data using the email from session
    if (userEmail) {
      houseOwnerProfileFetch(userEmail)
        .then((userData) => {
          if (userData && userData._id) {
            // Use the _id obtained from userData
            const userId = userData._id;

            // console.log("User ID - useHousesInRecord:", userId);
            setUserId(userData._id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userEmail]);

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
