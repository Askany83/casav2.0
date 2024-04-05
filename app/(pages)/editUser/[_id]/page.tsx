"use client";

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import EditUserForm from "@/components/parentComponents/EditUserForm";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";

export const EditUser = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("params user id: ", id);

  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  // console.log("User role - edit user:", userRole);

  return (
    <>
      <NavbarHouseOwner />
      <EditUserForm userId={id} />
      <Footer />
    </>
  );
};

export default EditUser;
