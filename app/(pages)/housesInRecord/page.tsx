import Footer from "@/components/parentComponents/Footer";
import HousesInRecord from "@/components/parentComponents/HousesInRecord";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import GetCheckUserRoleHouseOwner from "@/components/childComponents/GetCheckUserRoleHouseOwner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - As minhas casas",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export default function HousesInRecordPage() {
  return (
    <GetCheckUserRoleHouseOwner>
      <main className="min-h-screen flex flex-row">
        <div className="w-full flex justify-center items-center">
          <NavbarHouseOwner />
          <HousesInRecord />
        </div>
        <Footer />
      </main>
    </GetCheckUserRoleHouseOwner>
  );
}
