import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import EditUserForm from "@/components/parentComponents/EditUserForm";

import CheckUserRoleHouseOwner from "@/components/childComponents/CheckUserRoleHouseOwner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Editar perfil",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export const EditUser = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("params user id: ", id);

  // console.log("User role - edit user:", userRole);

  return (
    <CheckUserRoleHouseOwner>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full flex justify-center items-center">
          <NavbarHouseOwner />
          <EditUserForm userId={id} />
          <Footer />
        </div>
      </main>
    </CheckUserRoleHouseOwner>
  );
};

export default EditUser;
