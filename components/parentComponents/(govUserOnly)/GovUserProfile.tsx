"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { base64ToBlob } from "@/utils/base64ToBlob";
import Image from "next/image";
import { UserCircle } from "@phosphor-icons/react";
import { useHandleSignOutGovUser } from "@/customHooks/(govUserOnly)/useHandleSignOutGovUser";
import { govUserProfileFetch } from "@/fetchCallServices/(govUserOnly)/getGovUserProfile";
import { deleteGovUser } from "@/fetchCallServices/(govUserOnly)/deleteGovUser";

export default function GovUserProfile({ email }: { email: string }) {
  console.log("Gov user email: ", email);
  // Decode the email parameter - @ - is encoded as %40
  const decodedEmail = decodeURIComponent(email);

  const [userData, setUserData] = useState<any>(null);
  // console.log("user data in the profile page: ", userData);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [sessionImage, setSessionImage] = useState<string | null>(null);

  const handleSignOut = useHandleSignOutGovUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await govUserProfileFetch(decodedEmail);
        setUserData(user);
        console.log("User data fetched", user);

        if (user && user.image && user.image.data) {
          // Set the image data to sessionImage state
          setSessionImage(user.image.data);
          console.log("sessionImage:", user.image.data);

          // Convert the image data to a Blob
          const imageBlob = base64ToBlob(user.image.data);

          // Check if the blob was successfully created
          if (imageBlob) {
            // Create a Blob URL for the Blob
            const url = URL.createObjectURL(imageBlob);
            setBlobUrl(url); // Set the Blob URL state variable
          } else {
            console.error("Failed to convert image data to blob.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [decodedEmail]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>A processar...</div>
      </div>
    );
  }

  //delete user
  const handleDeleteClick = () => {
    deleteGovUser(userData, handleSignOut);
  };

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5 lg:w-[90rem] w-72">
          <div className="flex items-center justify-start mt-6">
            <UserCircle
              size={32}
              weight="fill"
              style={{ fill: "black" }}
              className="mr-4 mt-1 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            />
            <h1 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
              Perfil do utilizador
            </h1>
          </div>

          <div className="flex sm:flex-row flex-col gap-x-6 items-start justify-center mt-7">
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
              <p className="text-xs md:text-sm">
                {userData.name} {userData.surname}
              </p>
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
            </div>
            <div className="flex flex-col justify-center gap-x-2">
              <button
                className="btn btn-outline btn-sm rounded-none md:btn-md mt-4 border-red-800 text-teal-950 hover:bg-red-800 w-20"
                onClick={handleDeleteClick}
              >
                Apagar
              </button>
              <Link key={userData._id} href={`/editGovUser/${userData._id}`}>
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
