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
      {/* Container for the LoginForm, full width on mobile, 1/4 of the screen on larger screens */}
      <div className="w-full lg:w-1/4 flex justify-center items-center">
        <LoginFormGovUser />
      </div>

      {/* Div for the left side content, full width on mobile, 3/4 of the screen on larger screens */}
      <div className="w-full lg:w-3/4 flex justify-center items-center bg-gray-200">
        {" "}
        {/* Adjust the bg-color as needed */}
        <p className="text-lg font-semibold">
          Welcome Message or Other Content
        </p>
      </div>
    </main>
  );
}
