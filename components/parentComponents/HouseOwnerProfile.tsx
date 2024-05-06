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

  console.log("userData: ", userData);
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
    <div className="fixed top-0 bottom-0 left-18 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5 lg:w-[90rem] w-72">
          <div className="flex items-center justify-start">
            <UserCircle
              size={32}
              weight="fill"
              style={{ fill: "black" }}
              className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            />
            <h1 className="text-sm md:text-2xl font-black text-gray-900">
              Perfil do utilizador
            </h1>
          </div>

          <div className="flex sm:flex-row flex-col gap-x-6 items-start justify-start mt-24">
            {blobUrl && ( // Render the Image component if Blob URL exists
              <div className="mr-24">
                <p className="pt-2 mb-1 text-xs font-black">Imagem</p>
                <div className="flex items-center justify-center w-80 h-80">
                  <Image
                    src={blobUrl}
                    alt="Preview"
                    width={300}
                    height={300}
                    className=" mt-1 rounded-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col mr-24 mt-2">
              <p className="pt-2 mb-1 text-xs font-black">Nome completo</p>
              <p className="text-xs md:text-sm mb-1">
                {userData.name} {userData.surname}
              </p>
              <p className="pt-2 mb-1 text-xs font-black mt-12">Email</p>
              <p className="text-xs md:text-sm mb-0.5">{userData.email}</p>

              {userData.phone && ( // Check if phone number exists
                <>
                  <p className="pt-2 mb-1 text-xs font-black mt-12">Telefone</p>
                  <p className="text-xs md:text-sm">{userData.phone}</p>
                </>
              )}
              <p className="pt-2 mb-1 text-xs font-black mt-12">Criado em</p>
              <p className="text-xs md:text-sm mb-1">
                {formatDate(userData.createdAt)}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-x-2">
              <button
                className="btn btn-outline btn-sm rounded-none md:btn-md mt-4 border-red-800 text-teal-950 hover:bg-red-800 w-20"
                onClick={handleDeleteClick}
              >
                Apagar
              </button>
              <Link key={userData._id} href={`/editUser/${userData._id}`}>
                <button className="btn btn-outline btn-sm rounded-none md:btn-md mt-4 border-teal-950 text-teal-950 w-20">
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
