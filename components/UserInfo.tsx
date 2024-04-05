"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("session - UserInfo", session);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 my-6 border-black-400 border-2 flex flex-col gap-2">
        <div>
          Nome: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <div>
          <button
            className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2"
            onClick={handleSignOut}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
