
import NextAuth from "next-auth"
import Google from "next-auth/providers/google" 
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./schema"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db),
})