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
              {blobUrl && ( // Render the Image component if Blob URL exists
                <div className="mt-2 ">
                  <p className="pt-2 mb-1 text-xs font-black">Imagem</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={blobUrl}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="rounded-lg"
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
              <Link key={userData._id} href={`/editGovUser/${userData._id}`}>
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
