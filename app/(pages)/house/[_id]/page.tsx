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
import useHelpRequest from "@/customHooks/useHelpRequest";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

const HouseDetailsPage = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("id: ", id);
  const { houseDetails, isLoading } = useFullHouseDetails(id);
  const router = useRouter();
  const { userRole, setUserRole } = useUserRole();
  console.log("User role:", userRole);

  const [error, setError] = useState<string | Error>("");

  // useFetchUserRole(userRole, setUserRole);

  // useEffect(() => {
  //   console.log("User role changed:", userRole);
  //   // Redirect user if they do not have the appropriate role

  //   if (userRole !== "houseOwner") {
  //     router.push("/access-denied");
  //   }
  // }, [userRole, router]);

  // console.log("User role - House:", userRole);

  // console.log("this is houseDetails: ", houseDetails);

  return (
    <div>
      <NavbarHouseOwner />
      <div>
        <ErrorMessage error={error instanceof Error ? error.message : error} />

        <HouseFullDetails
          house={id}
          isLoading={isLoading}
          houseDetails={houseDetails}
          isRequestingHelp={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HouseDetailsPage;
