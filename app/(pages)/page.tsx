/**
 * Renders the login form component.
 *
 * Checks if the user is already logged in via session data.
 * If so, redirects to the dashboard page.
 * Otherwise, renders the login form component.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegisterLoginTab from "@/components/parentComponents/RegisterLoginTab";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/housesInRecord");
  return <RegisterLoginTab />;
}
