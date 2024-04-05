/**
 * HouseCard component displays house image, details and view details button.
 * Accepts house object as a prop.
 */

import HouseDetails from "@/components/childComponents/HouseDetails";
import HouseDetailsButtonGovUser from "@/components/childComponents/(govUserOnly)/HouseDetailsButtonGovUser";
import { HouseCardProps } from "@/interfaces/interfaces";
import React from "react";
import { House } from "@/interfaces/interfaces";
import Image from "next/image";
import { base64ToBlob } from "@/utils/base64ToBlob";

// Function to convert Base64 to Blob

const HouseCard: React.FC<HouseCardProps> = React.memo(({ house }) => {
  const handleClick = () => {
    // console.log("handleClick  - houseCard: ", house);
  };

  // Retrieve cached houses data from sessionStorage
  const cachedHousesData = sessionStorage.getItem("cachedHouses");
  let imageUrl = ""; // Initialize image URL variable

  // Check if cached houses data exists and if it contains the current house
  if (cachedHousesData) {
    // Inside the component
    const cachedHouses: House[] = JSON.parse(cachedHousesData || "[]");
    const cachedHouse: House | undefined = cachedHouses.find(
      (cachedHouse: House) => cachedHouse._id === house._id
    );

    if (cachedHouse && cachedHouse.image && cachedHouse.image.data) {
      // console.log("cached image 22: ", cachedHouse.image);
      // console.log("cached image data 22: ", cachedHouse.image.data);

      // Decode Base64 image data and convert it to a Blob object
      const blob = base64ToBlob(cachedHouse.image.data);
      // console.log("blob object - exterior: ", blob);

      if (blob) {
        // console.log("Blob object -inner:", blob);

        // Create an object URL from the Blob
        imageUrl = URL.createObjectURL(blob);

        // console.log("Image url: ", imageUrl);
      }
    }
  }

  return (
    <div className="card w-96 bg-amber-50 border-2 border-gray-400 shadow-xl">
      <div className="flex flex-col ">
        <div className="mt-7">
          {/* Render image from sessionStorage */}
          {imageUrl ? (
            <figure>
              <Image
                src={imageUrl}
                alt="House Image"
                className="w-10/12 h-full object-cover rounded-3xl "
                width={200}
                height={200}
              />
            </figure>
          ) : (
            <p>No Image</p>
          )}
        </div>

        <div className="card-body -mt-3 ">
          <div className="flex-grow">
            <div className="flex flex-col">
              {/* Memoized HouseDetails component */}
              <HouseDetails house={house} />
            </div>
            {/* HouseDetailsButton component */}
            <HouseDetailsButtonGovUser house={house} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
});

HouseCard.displayName = "HouseCard";
export default HouseCard;
