"use client";

import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/useRoleContext";
import { useEffect } from "react";
import { ReactNode } from "react";

interface CheckUserRoleHouseOwnerProps {
  children: ReactNode;
}

export default function CheckUserRoleHouseOwner({
  children,
}: CheckUserRoleHouseOwnerProps) {
  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);
  return children;
}
