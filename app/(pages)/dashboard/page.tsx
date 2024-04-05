"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";

export default function Dashboard() {
  const { userRole, setUserRole } = useUserRole();

  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/userRole");
        const data = await response.json();

        console.log("User role data - dashboard houseOwner: ", data);
        if (response.ok) {
          setUserRole(data.role);
        } else {
          console.error("Error fetching user role:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (!userRole) fetchUserRole();
  }, [userRole, setUserRole]);

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
