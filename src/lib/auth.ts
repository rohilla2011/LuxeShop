import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import path from "path";

// Direct database access for auth (bypasses Prisma adapter issues)
function getDb() {
  return new Database(path.join(process.cwd(), "dev.db"));
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const db = getDb();
          const user = db.prepare("SELECT * FROM User WHERE email = ?").get(credentials.email) as any;
          db.close();
          
          if (!user || !user.password) return null;
          
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          const db = getDb();
          const existingUser = db.prepare("SELECT * FROM User WHERE email = ?").get(user.email) as any;
          if (!existingUser) {
            const id = 'g_' + Date.now().toString(36);
            db.prepare("INSERT INTO User (id, name, email, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))").run(id, user.name, user.email);
          }
          db.close();
        } catch (error) {
          console.error("Google signIn callback error:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
