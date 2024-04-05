/**
 * Configures and initializes NextAuth.js authentication for the app.
 *
 * Sets up credentials login with email/password using bcrypt to compare.
 * Also configures JWT session and secret.
 */

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import GovUser from "@/models/govUser";
import { SessionStrategy } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          return null;
        }

        try {
          await connectMongoDB();

          let user;
          user = await User.findOne({ email }).select("+password");

          // If not found in User, try the GovUser collection
          if (!user) {
            user = await GovUser.findOne({ email }).select("+password");
          }

          if (!user) {
            throw new Error("No user found with the email");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Password incorrect");
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
