/**
 * Deletes a house from the database.
 *
 * Calls the DELETE endpoint with the house ID to delete the house.
 * Shows a confirm prompt before deleting.
 * Updates component state and redirects on success.
 * Handles errors from the API request.
 */

import { DELETE_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useDeleteHouse = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async (houseDetails: any) => {
    // alert user before deleting
    if (!houseDetails) return;
    const shouldDelete = window.confirm(
      "Tem a certeza que deseja apagar esta casa?"
    );
    if (!shouldDelete) return;

    setIsDeleting(true);
    try {
      const url = `${DELETE_HOUSE_API_ENDPOINT}?houseId=${houseDetails._id}`;

      // console.log("Delete request URL:", url);
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        // console.log("House successfully deleted");

        router.push("/housesInRecord");
      } else {
        // console.log("Deleting house:", houseDetails._id);

        console.error("Failed to delete house");
      }
    } catch (error) {
      console.error("Failed to delete house", error);
    }
    setIsDeleting(false);
  };
  return { handleDelete, isDeleting };
};
