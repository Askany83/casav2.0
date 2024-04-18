/**
 * Renders the login form component.
 *
 * Checks if the user is already logged in via session data.
 * If so, redirects to the dashboard page.
 * Otherwise, renders the login form component.
 */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginFormGovUser from "@/components/parentComponents/(govUserOnly)/LoginFormGovUser";

export default async function LoginFormGovUserPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboardGovUser");
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <LoginFormGovUser />
      </div>
    </main>
  );
}
