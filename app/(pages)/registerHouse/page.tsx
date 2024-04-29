import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { RegisterHouseForm } from "@/components/parentComponents/RegisterHouseForm";
import CheckUserRoleHouseOwner from "@/components/childComponents/CheckUserRoleHouseOwner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Registar casa",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export default function RegisterHouse() {
  return (
    <CheckUserRoleHouseOwner>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full flex justify-center items-center">
          <NavbarHouseOwner />
          <RegisterHouseForm />
          <Footer />
        </div>
      </main>
    </CheckUserRoleHouseOwner>
  );
}
