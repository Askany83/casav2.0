/**
 * Page component for the register page.
 *
 * Checks if the user is already authenticated via getServerSession.
 * If so, redirects to /dashboard.
 * Otherwise, renders the <RegisterForm> component.
 */

import RegisterForm from "@/components/parentComponents/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
