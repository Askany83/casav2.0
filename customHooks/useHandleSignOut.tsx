import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export const useHandleSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    sessionStorage.clear();
    router.push("/");
  };

  return handleSignOut;
};
