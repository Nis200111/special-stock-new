"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RoleBasedRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const role = session.user.role;

            // Store role in localStorage for client-side checks
            localStorage.setItem("userRole", role || "buyer");
            localStorage.setItem("userName", session.user.name || "User");
            localStorage.setItem("user", JSON.stringify({
                email: session.user.email,
                name: session.user.name,
                role: role
            }));

            // Redirect based on role
            if (role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/buyer-dashboard');
            }
        }
    }, [session, status, router]);

    return null; // This component doesn't render anything
}
