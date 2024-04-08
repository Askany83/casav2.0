import { signOut } from "next-auth/react";

export const useHandleSignOutGovUser = () => {
  const handleSignOutGovUser = async () => {
    await signOut();
    sessionStorage.clear();
    window.location.href = "/loginGovUser";
  };

  return handleSignOutGovUser;
};
