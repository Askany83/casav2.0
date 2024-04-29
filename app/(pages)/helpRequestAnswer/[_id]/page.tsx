"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import HelpRequestHouseOwner from "@/components/parentComponents/HelpRequestHouseOwner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

const HelpRequestForReview = (_id: string) => {
  console.log("Help Request ID:", _id);
  const helpRequestId = _id;

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
        <HelpRequestHouseOwner />
        <Footer />
      </div>
    </main>
  );
};

export default HelpRequestForReview;
