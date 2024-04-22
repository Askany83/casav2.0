/**
 * Renders the page to display full details for a house.
 *
 * Fetches house details by ID using a custom hook.
 * Renders the house details, navbar, and footer components.
 */

"use client";

import Footer from "@/components/parentComponents/Footer";
import HouseFullDetails from "@/components/parentComponents/HouseFullDetails";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import useFullHouseDetails from "@/customHooks/useFullHouseDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserRole } from "@/context/useRoleContext";
import ErrorMessage from "@/components/childComponents/ErrorMessage";

import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

const HouseDetailsPage = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("id: ", id);
  const { houseDetails, isLoading } = useFullHouseDetails(id);
  const [error, setError] = useState<string | Error>("");

  const { userRole, setUserRole } = useUserRole();

  const router = useRouter();

  useFetchUserRole(userRole, setUserRole);

  useEffect(() => {
    // Redirect if the user role is not "houseOwner"
    if (userRole && userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  console.log("User role - dashboard:", userRole);

  console.log("User role - House:", userRole);

  console.log("this is houseDetails: ", houseDetails);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarHouseOwner />
        <HouseFullDetails
          house={houseDetails}
          isLoading={isLoading}
          houseDetails={houseDetails}
          isRequestingHelp={false}
        />
        <ErrorMessage error={error instanceof Error ? error.message : error} />
        <Footer />
      </div>
    </main>
  );
};

export default HouseDetailsPage;
