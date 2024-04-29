import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegisterFormGovUser from "@/components/parentComponents/(govUserOnly)/RegisterFormGovUser";
import LogoCasa from "@/components/childComponents/logoCasa";

export default async function RegisterGovUserPage() {
  const session = await getServerSession(authOptions);

  //CHANGE THE REDIRECT

  if (session) redirect("/allHousesInRecord");

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex flex-col justify-center items-center">
        {/* <LogoCasa /> */}
        <RegisterFormGovUser />
      </div>
    </main>
  );
}
