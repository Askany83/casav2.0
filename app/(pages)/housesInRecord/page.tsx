"use client";

import Footer from "@/components/parentComponents/Footer";
import HousesInRecord from "@/components/parentComponents/HousesInRecord";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";

export default function HousesInRecordPage() {
  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  return (
    <>
      <NavbarHouseOwner />
      <HousesInRecord />
      <Footer />
    </>
  );
}
