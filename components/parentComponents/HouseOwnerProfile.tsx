/**
 * Fetches and displays the house owner profile for the given email address.
 *
 * Decodes the email parameter to handle encoded @.
 * Fetches the profile data from the API.
 * Displays the name, email, and createdAt date of the user if data is available.
 * Otherwise displays a loading indicator.
 */

"use client";

import { formatDate } from "@/utils/formatDate";
import { UserCircle } from "@phosphor-icons/react";
import { useHandleSignOut } from "@/customHooks/useHandleSignOut";
import { deleteUser } from "@/fetchCallServices/deleteUser";
import Link from "next/link";
import Image from "next/image";
import { useUserData } from "@/customHooks/useUserData";

export default function HouseOwnerProfile({ email }: { email: string }) {
  // Decode the email parameter - @ - is encoded as %40
  const decodedEmail = decodeURIComponent(email);
  const { userData, blobUrl } = useUserData(decodedEmail);

  const handleSignOut = useHandleSignOut();

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>A processar...</div>
      </div>
    );
  }

  //delete user
  const handleDeleteClick = () => {
    deleteUser(userData, handleSignOut);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="border-black-400 border-2 bg-amber-50 p-5 rounded-lg">
        <div className="flex items-center">
          <UserCircle
            size={32}
            weight="fill"
            style={{ fill: "black" }}
            className="mr-2"
          />
          <h1 className="text-xl font-bold text-gray-900 text-left">
            Perfil do utilizador
          </h1>
        </div>
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
          {userData.phone && ( // Check if phone number exists
            <p className="mt-5">
              <span className="font-bold">Telefone:</span> {userData.phone}
            </p>
          )}
          {blobUrl && ( // Render the Image component if Blob URL exists
            <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
              <p className="font-bold mb-1">Imagem:</p>
              <Image
                src={blobUrl}
                alt="Preview"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="btn btn-warning font-bold cursor-pointer mr-2 flex-grow"
            onClick={handleDeleteClick}
          >
            Apagar
          </button>
          <Link key={userData._id} href={`/editUser/${userData._id}`}>
            <button className="btn btn-info font-bold cursor-pointer flex-grow">
              Editar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
