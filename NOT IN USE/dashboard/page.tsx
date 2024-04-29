"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

export default function Dashboard() {
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
    <>
      <NavbarHouseOwner />
      <div className="grid place-items-center h-screen">
        <div className="border-black-400 border-2 bg-amber-50 p-5 rounded-lg">
          <div className="flex items-center">dashboard - houseOwner</div>{" "}
        </div>{" "}
      </div>

      <Footer />
    </>
  );
}
