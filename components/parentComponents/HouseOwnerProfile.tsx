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
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 sm:w-64 md:w-80 -mt-4">
            <div className="flex items-center justify-center">
              <UserCircle
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mr-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
                Perfil do utilizador
              </h1>
            </div>
            <div className="divider divider-primary"></div>
            <div className="flex flex-col">
              <p className="pt-2 mb-1 text-xs font-black">Nome</p>
              <p className="text-xs md:text-sm">{userData.name}</p>
              <p className="pt-2 mb-1 text-xs font-black">Email</p>
              <p className="text-xs md:text-sm">{userData.email}</p>
              <p className="pt-2 mb-1 text-xs font-black">Criado em</p>
              <p className="text-xs md:text-sm">
                {formatDate(userData.createdAt)}
              </p>
              {userData.phone && ( // Check if phone number exists
                <>
                  <p className="pt-2 mb-1 text-xs font-black">Telefone</p>
                  <p className="text-xs md:text-sm">{userData.phone}</p>
                </>
              )}
              {blobUrl && ( // Render the Image component if Blob URL exists
                <div className="mt-2 ">
                  <p className="pt-2 mb-1 text-xs font-black">Imagem</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={blobUrl}
                      alt="Preview"
                      width={300}
                      height={300}
                      className=" rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-5 gap-x-2">
              <button
                className="btn btn-accent btn-sm rounded-box md:btn-md"
                onClick={handleDeleteClick}
              >
                Apagar
              </button>
              <Link key={userData._id} href={`/editUser/${userData._id}`}>
                <button className="btn btn-success btn-sm rounded-box md:btn-md">
                  Editar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
