"use client";

import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import GovUserProfile from "@/components/parentComponents/(govUserOnly)/GovUserProfile";

export const GovUserProfilePage = ({
  params,
}: {
  params: { email: string };
}) => {
  const email = params.email;

  console.log("Gov user email: ", email);

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
        <GovUserProfile email={params.email} />
        <Footer />
      </div>
    </main>
  );
};

export default GovUserProfilePage;
