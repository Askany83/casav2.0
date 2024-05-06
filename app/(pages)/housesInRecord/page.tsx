import HousesInRecord from "@/components/parentComponents/HousesInRecord";
import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";
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
      <SideNavbarHouseOwner />
      <main className="min-h-screen flex flex-row">
        <div className="w-full flex justify-center items-center">
          <HousesInRecord />
        </div>
      </main>
    </GetCheckUserRoleHouseOwner>
  );
}
