"use client";

import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";

interface CheckUserRoleHouseOwnerProps {
  children: ReactNode;
}

export default function GetCheckUserRoleHouseOwner({
  children,
}: CheckUserRoleHouseOwnerProps) {
  const { userRole, setUserRole } = useUserRole();

  const router = useRouter();

  useFetchUserRole(userRole, setUserRole);

  useEffect(() => {
    // Redirect if the user role is not "houseOwner"
    if (userRole && userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  console.log("User role - dashboard:", userRole);
  return children;
}
