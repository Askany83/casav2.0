"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { RegisterHouseForm } from "@/components/parentComponents/RegisterHouseForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

export default function RegisterHouse() {
  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarHouseOwner />
        <RegisterHouseForm />
        <Footer />
      </div>
    </main>
  );
}
