/**
 * HouseCard component displays house image, details and view details button.
 * Accepts house object as a prop.
 */

import HouseDetails from "@/components/childComponents/HouseDetails";
import HouseDetailsButton from "@/components/childComponents/HouseDetailsButton";
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
    <div className="card p-1 glass rounded-lg">
      <div className="flex flex-col ">
        <div className="mt-3 -mb-5">
          {/* Render image from sessionStorage */}
          {imageUrl ? (
            <figure>
              <Image
                src={imageUrl}
                alt="House Image"
                className="rounded-3xl"
                width={150}
                height={200}
              />
            </figure>
          ) : (
            <p>No Image</p>
          )}
        </div>

        <div className="card-body">
          <div className="flex-grow">
            <div className="flex flex-col">
              {/* Memoized HouseDetails component */}
              <HouseDetails house={house} />
            </div>
            {/* HouseDetailsButton component */}
            <HouseDetailsButton house={house} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
});

HouseCard.displayName = "HouseCard";
export default HouseCard;
