"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface HouseDetailsProps {
  _id: string;
  typeOfHouse: string;
  housingConditions: string;
  selectedOption: string;
  selectedYear: string;
  area: string;
  streetName: string;
  locality: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

function HouseDetails() {
  const [houseDetails, setHouseDetails] = useState<HouseDetailsProps | null>(
    null
  );

  const searchParams = useSearchParams() as URLSearchParams;
  const id = searchParams.get("id");

  useEffect(() => {
    // Fetch house details using the id from the query parameter
    const fetchHouseDetails = async () => {
      try {
        if (!id) return;
        const response = await fetch(`/api/houseDetails?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch house details");
        }
        const data = await response.json();
        setHouseDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHouseDetails();
  }, [id]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (!houseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>House Details</h1>
      <p>Locality: {houseDetails.locality}</p>
      <p>Type of House: {houseDetails.typeOfHouse}</p>
      {/* Display other details as needed */}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default HouseDetails;
