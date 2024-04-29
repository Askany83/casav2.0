"use client";

import Footer from "@/components/parentComponents/Footer";
import HousesInRecord from "@/components/parentComponents/HousesInRecord";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

export default function HousesInRecordPage() {
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

  return (
    <main className="min-h-screen flex flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarHouseOwner />
        <HousesInRecord />
      </div>
      <Footer />
    </main>
  );
}
