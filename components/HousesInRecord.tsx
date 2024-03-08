"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { conditionsMapHouses } from "@/app/utils/conditionsMapHouses";
import Link from "next/link";

function HousesInRecord() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [houses, setHouses] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };

      if (userEmail) {
        headers.Authorization = userEmail;
      }

      const response = await fetch("/api/housesInRecord", {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch houses");
      }

      const fetchedHouses = await response.json();
      // Map fetched values to display values
      const mappedHouses = fetchedHouses.map((house: any) => ({
        ...house,
        housingConditions: mapHousingCondition(house.housingConditions),
      }));
      setHouses(mappedHouses);
      console.log(mappedHouses);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to map housing conditions
  const mapHousingCondition = (condition: string) => {
    return conditionsMapHouses[condition] || condition;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 3); // Increment by 3 to show next 3 houses
  };

  const handleReturn = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 3)); // Go back to previous 3 houses
  };

  // Calculate the current page number
  const currentPage = Math.floor(currentIndex / 3) + 1;

  // Calculate the total number of pages
  const totalPages = Math.ceil(houses.length / 3);

  return (
    <>
      <div className="grid place-items-center h-screen pt-24 ">
        <div className="p-5 border-black-400 border-2 bg-gray-100">
          <p className="text-right pb-2">
            Página <span className="font-bold">{currentPage}</span> de
            <span className="font-bold"> {totalPages}</span>
          </p>
          {houses.slice(currentIndex, currentIndex + 3).map((house, index) => (
            <div className="flex flex-col" key={index}>
              <div className="w-80 h-80 bg-slate-500">
                <p>Image</p>
              </div>
              <Link href={`/houseDetails?id=${house._id}`} passHref>
                <button className="bg-gray-500 text-white font-bold cursor-pointer px-6 py-2">
                  Ver detalhes
                </button>
              </Link>
              <p className="py-2.5 font-bold">Localidade</p>
              <p>{house.locality}</p>
              <p className="py-2.5 font-bold">Tipo de Casa</p>
              <p>
                {house.typeOfHouse} - {house.selectedOption}
              </p>
              <p className="py-2.5 font-bold">Condições habitacionais</p>
              <p className="pb-8">{house.housingConditions}</p>
            </div>
          ))}

          <div className="flex justify-center space-x-5">
            <button
              className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 mb-10 w-32"
              onClick={handleReturn}
              hidden={currentIndex === 0}
            >
              Return
            </button>
            <button
              className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 mb-10 w-32"
              onClick={handleNext}
              hidden={currentIndex + 3 >= houses.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HousesInRecord;
