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
import { RxShadowNone } from "react-icons/rx";

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
    <div className="card border-2 border-gray-300 rounded-lg w-full md:w-80 ">
      <figure>
        {/* Render image from sessionStorage */}
        {imageUrl ? (
          <figure className="sm:w-80 w-64 h-40">
            <Image
              src={imageUrl}
              alt="House Image"
              className="w-full h-full object-cover"
              width={310}
              height={310}
            />
          </figure>
        ) : (
          <div>
            <RxShadowNone size={32} className="mr-2" />
            <p>No Image</p>
          </div>
        )}
      </figure>

      <div className="card-body -mt-6 flex flex-col justify-between">
        {/* Memoized HouseDetails component */}
        <HouseDetails house={house} />

        {/* HouseDetailsButton component */}
        <HouseDetailsButton house={house} onClick={handleClick} />
      </div>
    </div>
  );
});

HouseCard.displayName = "HouseCard";
export default HouseCard;
