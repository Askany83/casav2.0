/**
 * Renders the login form component.
 *
 * Checks if the user is already logged in via session data.
 * If so, redirects to the dashboard page.
 * Otherwise, renders the login form component.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/parentComponents/LoginForm";
import { redirect } from "next/navigation";
import LogoCasa from "@/components/childComponents/logoCasa";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <main className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="w-full flex flex-col justify-center items-center relative z-10">
        <LogoCasa />
        <LoginForm />
      </div>
    </main>
  );
}
