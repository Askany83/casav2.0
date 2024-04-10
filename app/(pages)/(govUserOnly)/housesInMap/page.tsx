"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";

const DynamicMap = dynamic(
  () => import("@/components/parentComponents/(govUserOnly)/Map"),
  {
    ssr: false,
  }
);

export default function HousesInMapPage() {
  const router = useRouter();
  const { userRole } = useUserRole();
  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  return (
    <main>
      <NavbarGovUser />
      <div className="mt-20">
        <DynamicMap />
      </div>

      <Footer />
    </main>
  );
}
