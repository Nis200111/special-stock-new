/**
 * NextAuth Type Extensions
 * Extends the default NextAuth types to include custom properties
 */

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    /**
     * Extend the Session interface to include custom properties
     */
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            image?: string;
        };
        accessToken?: string;
    }

    /**
     * Extend the User interface to include custom properties
     */
    interface User {
        id: string;
        email: string;
        name: string;
        role: string;
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extend the JWT interface to include custom properties
     */
    interface JWT {
        id: string;
        role: string;
        accessToken?: string;
    }
}
