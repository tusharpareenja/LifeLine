import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import prisma from "../app/db/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        if (account?.providerAccountId) {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { gid: account.providerAccountId },
                { email: token.email }
              ]
            },
            include: {
              patient: true,
              doctor: true
            }
          });

          if (user) {
            token.id = user.id;
            token.role = user.role;
            token.patientId = user.patient?.id;
            token.doctorId = user.doctor?.id;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.patientId = token.patientId;
        session.user.doctorId = token.doctorId;
      }
      console.log(session)
      return session;
    },

    async signIn({ user, account, profile,context }) {
      try {
        if (!account?.provider || !user.email) {
          return false;
        }
        // const res = await fetch("https://people.googleapis.com/v1/people/me?personFields=genders,birthdays", {
        //   headers: {
        //     Authorization: `Bearer ${account.access_token}`,
        //   },
        // });
    
        // const data = await res.json();
        // console.log("Google API Response:", data);
        // const dobObj = data.birthdays?.[0]?.date;
        // const dob = dobObj ? `${dobObj.year}-${dobObj.month}-${dobObj.day}` : null;

        // console.log( dob)

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: user.email },
              { gid: profile.sub }
            ]
          }, include : {
            patient : true
          }
        });
        console.log("--------->",existingUser)

        if (existingUser ) {
          // Update Google ID if it's missing
          if (!existingUser.gid) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { 
                gid: profile.sub,
                emailVerified: new Date()
              }
            });
          }
          return true;
        }

        // Create new user with patient profile
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            gid: profile.sub,
            emailVerified: new Date(),
            role: 'PATIENT',
            patient: {
              create: {
                dob : new Date(),
                gender: "Male",
              }
            },
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state
              }
            }
          },
          include: {
            patient: true,
            accounts: true
          }
        });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
});