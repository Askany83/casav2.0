"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/parentComponents/(govUserOnly)/Map"),
  {
    ssr: false,
  }
);

const DynamicHeatMap = dynamic(
  () => import("@/components/parentComponents/(govUserOnly)/HeatMap"),
  {
    ssr: false,
  }
);

export default function HousesInMapPage() {
  const router = useRouter();
  const { userRole } = useUserRole();
  const [showHeatMap, setShowHeatMap] = useState(false);

  const toggleMap = () => setShowHeatMap(!showHeatMap);

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  return (
    <main>
      <NavbarGovUser />
      <div className="mt-24 flex flex-row items-center justify-center">
        <div className=" justify-center items-start flex flex-row">
          <p className="mr-7 mt-4 font-bold text-xs md:text-sm">
            Alternar <br /> vista para
          </p>
          <div className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950 mr-24">
            <button onClick={toggleMap} className="inline-block mx-auto ">
              {showHeatMap ? "Mapa com pins" : "Mapa de calor"}
            </button>
          </div>
        </div>
        {showHeatMap ? <DynamicHeatMap /> : <DynamicMap />}
      </div>

      <Footer />
    </main>
  );
}
