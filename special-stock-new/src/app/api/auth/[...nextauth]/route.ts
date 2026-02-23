import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        // -----------------------------
        // 1) Credentials (your backend)
        // -----------------------------
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await fetch("http://localhost:5000/api/customers/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) return null;

                    const data = await res.json();

                    // Must return an object with at least an id
                    return {
                        id: String(data.id || data.customerId || data.userId || data.email),
                        email: data.email || credentials.email,
                        name: data.firstName || data.name || data.email,
                        role: data.role || "buyer",
                        accessToken: data.accessToken, // backend JWT (only for credentials)
                    } as any;
                } catch (error) {
                    console.error("Credentials authorize error:", error);
                    return null;
                }
            },
        }),

        // -----------------------------
        // 2) Google OAuth (NO backend)
        // -----------------------------
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            // You can add extra scopes if you want:
            // authorization: { params: { scope: "openid email profile" } },
        }),
    ],

    pages: {
        signIn: "/login",
        error: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 1 day
    },

    callbacks: {
        // Called whenever a JWT is created/updated
        async jwt({ token, user, account, profile }) {
            // When user signs in
            if (account?.provider === "credentials" && user) {
                token.id = (user as any).id;
                token.role = (user as any).role;
                token.accessToken = (user as any).accessToken; // backend JWT
                return token;
            }

            if (account?.provider === "google") {
                // For Google sign-in, we only have NextAuth session (no backend token)
                token.id = token.sub; // NextAuth subject id
                token.role = token.role ?? "buyer"; // default role (client-side use only)
                token.accessToken = undefined; // no backend JWT here

                // Save some profile info (optional but useful)
                if (profile) {
                    token.email = (profile as any).email ?? token.email;
                    token.name = (profile as any).name ?? token.name;
                    (token as any).picture = (profile as any).picture;
                }

                return token;
            }

            return token;
        },

        // What the client receives from useSession()
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role ?? "buyer";
                (session.user as any).image = (token as any).picture ?? session.user.image;
            }

            // For credentials login, you’ll get backend token here
            (session as any).accessToken = token.accessToken;

            return session;
        },
    },

    // Only needed if you're behind proxies etc. Usually not needed locally.
    // trustHost: true,

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };