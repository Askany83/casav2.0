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
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarHouseOwner />
        <HouseOwnerProfile email={email} />
        <Footer />
      </div>
    </main>
  );
};

export default HouseOwnerProfilePage;
