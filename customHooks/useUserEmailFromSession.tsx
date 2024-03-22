import { useSession } from "next-auth/react";

export function useUserEmailFromSession() {
  const { data: session } = useSession();
  return session?.user?.email;
}
