/**
 * Fetches and displays the house owner profile for the given email address.
 *
 * Decodes the email parameter to handle encoded @.
 * Fetches the profile data from the API.
 * Displays the name, email, and createdAt date of the user if data is available.
 * Otherwise displays a loading indicator.
 */

"use client";

import { useState, useEffect } from "react";
import { houseOwnerProfileFetch } from "@/fetchCallServices/getHouseOwnerProfile";
import { formatDate } from "@/utils/formatDate";

export default function HouseOwnerProfile({ email }: { email: string }) {
  // Decode the email parameter - @ - is encoded as %40
  const decodedEmail = decodeURIComponent(email);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await houseOwnerProfileFetch(decodedEmail);
        setUserData(user);
        console.log("User data fetched", user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [decodedEmail]);

  if (!userData) {
    return <div>A processar...</div>;
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="border-black-400 border-2 bg-gray-100 p-5">
        <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
          Perfil do utilizador
        </h1>
        <div className="flex flex-col w-80">
          <p className="mt-5">
            <span className="font-bold">Nome:</span> {userData.name}
          </p>
          <p className="mt-5">
            <span className="font-bold">Email:</span> {userData.email}
          </p>
          <p className="mt-5">
            <span className="font-bold">Criado em:</span>{" "}
            {formatDate(userData.createdAt)}
          </p>
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 m-2 flex-grow">
            Apagar
          </button>
          <button className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 m-2 flex-grow">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
