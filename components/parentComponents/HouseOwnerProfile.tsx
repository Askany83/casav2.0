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
    <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 sm:w-64 md:w-80">
            <div className="flex items-center justify-center">
              <UserCircle
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mr-2"
              />
              <h1 className="text-xl font-black text-gray-900 text-left">
                Perfil do utilizador
              </h1>
            </div>
            <div className="divider divider-primary"></div>
            <div className="flex flex-col">
              <p className=" font-bold text-xs">Nome</p>
              <p className="text-sm">{userData.name}</p>
              <p className="mt-2 font-bold text-xs">Email</p>
              <p className="text-sm">{userData.email}</p>
              <p className="mt-2 font-bold text-xs">Criado em</p>
              <p className="text-sm">{formatDate(userData.createdAt)}</p>
              {userData.phone && ( // Check if phone number exists
                <>
                  <p className="mt-2 font-bold text-xs">Telefone</p>
                  <p className="text-sm">{userData.phone}</p>
                </>
              )}
              {blobUrl && ( // Render the Image component if Blob URL exists
                <div className="mt-2 ">
                  <p className="font-bold text-xs mb-1">Imagem</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={blobUrl}
                      alt="Preview"
                      width={300}
                      height={300}
                      className=" rounded-3xl"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-5 gap-x-2">
              <button className="btn btn-accent" onClick={handleDeleteClick}>
                Apagar
              </button>
              <Link key={userData._id} href={`/editUser/${userData._id}`}>
                <button className="btn btn-success">Editar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
