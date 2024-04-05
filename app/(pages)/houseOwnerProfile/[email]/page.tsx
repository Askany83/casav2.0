/**
 * Renders the house owner profile page.
 *
 * @param params - The route params containing the house owner's email address.
 * @returns The house owner profile page component.
 */

"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import HouseOwnerProfile from "@/components/parentComponents/HouseOwnerProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

export const HouseOwnerProfilePage = ({
  params,
}: {
  params: { email: string };
}) => {
  const email = params.email;
  const router = useRouter();

  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  // console.log("User role - houseOwner profile:", userRole);

  return (
    <>
      <NavbarHouseOwner />
      <HouseOwnerProfile email={email} />
      <Footer />
    </>
  );
};

export default HouseOwnerProfilePage;
