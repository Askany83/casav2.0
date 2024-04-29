"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import AllHousesInRecord from "@/components/parentComponents/(govUserOnly)/AllHousesInRecord";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

export default function AllHousesInRecordPage() {
  const { userRole, setUserRole } = useUserRole();

  const router = useRouter();

  useFetchUserRole(userRole, setUserRole);

  useEffect(() => {
    // Redirect if the user role is not "houseOwner"
    if (userRole && userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);
  return (
    <>
      <NavbarGovUser />
      <AllHousesInRecord />
      <Footer />
    </>
  );
}
