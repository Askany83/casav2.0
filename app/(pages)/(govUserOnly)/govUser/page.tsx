import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterLoginGovUser from "@/components/parentComponents/(govUserOnly)/RegisterLoginTabGovUser";

export default async function LoginFormGovUserPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/allHousesInRecord");
  return <RegisterLoginGovUser />;
}
