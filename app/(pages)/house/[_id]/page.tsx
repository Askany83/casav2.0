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
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

const HouseDetailsPage = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("id: ", id);

  const { houseDetails, isLoading } = useFullHouseDetails(id);

  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  // console.log("User role - House:", userRole);

  // console.log("this is houseDetails: ", houseDetails);
  return (
    <div>
      <NavbarHouseOwner />
      <div>
        <HouseFullDetails
          house={id}
          isLoading={isLoading}
          houseDetails={houseDetails}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HouseDetailsPage;
