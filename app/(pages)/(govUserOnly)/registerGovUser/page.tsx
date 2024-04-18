import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegisterFormGovUser from "@/components/parentComponents/(govUserOnly)/RegisterFormGovUser";

export default async function RegisterGovUserPage() {
  const session = await getServerSession(authOptions);

  //CHANGE THE REDIRECT

  if (session) redirect("/dashboardGovUser");

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <RegisterFormGovUser />
      </div>
    </main>
  );
}
