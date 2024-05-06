/**
 * Renders the house owner profile page.
 *
 * @param params - The route params containing the house owner's email address.
 * @returns The house owner profile page component.
 */

import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";
import HouseOwnerProfile from "@/components/parentComponents/HouseOwnerProfile";
import CheckUserRoleHouseOwner from "@/components/childComponents/CheckUserRoleHouseOwner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Perfil",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export const HouseOwnerProfilePage = ({
  params,
}: {
  params: { email: string };
}) => {
  const email = params.email;

  // console.log("User role - houseOwner profile:", userRole);

  return (
    <CheckUserRoleHouseOwner>
      <SideNavbarHouseOwner />
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full flex justify-center items-center">
          <HouseOwnerProfile email={email} />
        </div>
      </main>
    </CheckUserRoleHouseOwner>
  );
};

export default HouseOwnerProfilePage;
