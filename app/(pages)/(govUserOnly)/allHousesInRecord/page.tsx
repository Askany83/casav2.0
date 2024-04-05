"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import AllHousesInRecord from "@/components/parentComponents/(govUserOnly)/AllHousesInRecord";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

export default function AllHousesInRecordPage() {
  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  console.log("User role - allHousesInRecord: ", userRole);

  return (
    <>
      <NavbarGovUser />
      <AllHousesInRecord />
      <Footer />
    </>
  );
}
