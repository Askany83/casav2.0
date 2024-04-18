"use client";

import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import useFullHouseDetails from "@/customHooks/useFullHouseDetails";
import HouseFullDetailsGovUser from "@/components/parentComponents/(govUserOnly)/HouseFullDetailsGovUser";

export default function HouseDetailsPage({
  params,
}: {
  params: { _id: string };
}) {
  const id = params._id;

  // console.log("id: ", id);

  const router = useRouter();
  const { userRole } = useUserRole();
  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  const { houseDetails, isLoading } = useFullHouseDetails(id);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarGovUser />
        <HouseFullDetailsGovUser
          house={id}
          isLoading={isLoading}
          houseDetails={houseDetails}
        />
        <Footer />
      </div>
    </main>
  );
}
