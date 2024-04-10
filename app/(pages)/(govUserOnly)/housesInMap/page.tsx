"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () => import("@/components/parentComponents/(govUserOnly)/Map"),
  {
    ssr: false,
  }
);

export default function Home() {
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
