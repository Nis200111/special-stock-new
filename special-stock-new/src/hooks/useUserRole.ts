"use client"

import { useSession } from "next-auth/react"

export function useUserRole() {
    const { data: session, status } = useSession()

    return {
        role: session?.user?.role,
        isAdmin: session?.user?.role === 'admin',
        isBuyer: session?.user?.role === 'buyer',
        isLoading: status === 'loading',
        isAuthenticated: status === 'authenticated',
        session
    }
}
