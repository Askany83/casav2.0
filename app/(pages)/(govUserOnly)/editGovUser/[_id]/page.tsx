"use client";

import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import EditGovUserForm from "@/components/parentComponents/(govUserOnly)/EditGovUserForm";

export const EditGovUser = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("params user id: ", id);

  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "govUser") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  // console.log("User role - edit user:", userRole);

  return (
    <>
      <NavbarGovUser />
      <EditGovUserForm userId={id} />
      <Footer />
    </>
  );
};

export default EditGovUser;
