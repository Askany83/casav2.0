"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import HelpRequest from "@/components/parentComponents/(govUserOnly)/HelpRequest";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect, useState } from "react";

const HelpRequestForReview = (_id: string) => {
  console.log("Help Request ID:", _id);
  const helpRequestId = _id;

  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarGovUser />
        <HelpRequest />
        <Footer />
      </div>
    </main>
  );
};

export default HelpRequestForReview;
