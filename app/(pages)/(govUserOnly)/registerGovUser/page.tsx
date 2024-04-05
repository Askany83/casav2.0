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
      {/* Container for the LoginForm, full width on mobile, 1/4 of the screen on larger screens */}
      <div className="w-full lg:w-1/4 flex justify-center items-center">
        <RegisterFormGovUser />
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
