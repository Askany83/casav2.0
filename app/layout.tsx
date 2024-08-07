/**
 * Provides application layout by wrapping pages in common providers.
 */

import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./Providers";
import { UserRoleProvider } from "@/context/useRoleContext";
import BackgroundImage from "@/components/childComponents/BackgroundImage";

// Importing Montserrat font
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CASA v2.0",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={manrope.className} data-theme="cupcake">
        {/* <BackgroundImage /> */}
        {/* AuthProvider is a wrapper around the pages rendered (children) - it provides the session to the pages - see middleware.tsx to add pages that require to be login to view*/}
        <UserRoleProvider>
          <AuthProvider>{children}</AuthProvider>
        </UserRoleProvider>
      </body>
    </html>
  );
}
