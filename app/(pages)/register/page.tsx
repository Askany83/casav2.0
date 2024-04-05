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
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  // console.log("session - register: ", session);
  if (session) redirect("/dashboard");
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Container for the LoginForm, full width on mobile, 1/4 of the screen on larger screens */}
      <div className="w-full lg:w-1/4 flex justify-center items-center">
        <RegisterForm />
      </div>

      {/* Div for the left side content, full width on mobile, 3/4 of the screen on larger screens */}
      <div className="w-full lg:w-3/4 flex justify-center items-center bg-gray-200">
        {" "}
        {/* Adjust the bg-color as needed */}
        <p className="text-lg font-semibold">Other Content</p>
      </div>
    </main>
  );
}
