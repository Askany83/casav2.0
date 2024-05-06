"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUserRole } from "@/context/useRoleContext";

export const useHandleSignOut = () => {
  const router = useRouter();
  const { userRole } = useUserRole();

  const handleSignOut = async () => {
    console.log("Sign out");
    await signOut();
    sessionStorage.clear();
    // Redirect users based on their roles after sign out
    if (userRole === "houseOwner") {
      console.log("Redirecting house owner to home page");
      router.push("/");
    } else if (userRole === "govUser") {
      console.log("Redirecting gov user to home page");
      window.location.href = "/govUser";
    } else {
      console.error("Unknown role:", userRole);
      console.log("Redirecting to home page");
      // Redirect to a default page in case of an unknown role
      router.push("/");
    }
  };

  return handleSignOut;
};
