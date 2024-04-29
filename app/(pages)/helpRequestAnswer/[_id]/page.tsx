import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import HelpRequestHouseOwner from "@/components/parentComponents/HelpRequestHouseOwner";

import CheckUserRoleHouseOwner from "@/components/childComponents/CheckUserRoleHouseOwner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Pedido de ajuda",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

const HelpRequestForReview = (_id: string) => {
  console.log("Help Request ID:", _id);
  const helpRequestId = _id;

  return (
    <CheckUserRoleHouseOwner>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full flex justify-center items-center">
          <NavbarHouseOwner />
          <HelpRequestHouseOwner />
          <Footer />
        </div>
      </main>
    </CheckUserRoleHouseOwner>
  );
};

export default HelpRequestForReview;
