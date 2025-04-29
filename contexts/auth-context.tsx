"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authApi, type User } from "@/lib/api-client"
import Cookies from "js-cookie"
import { isBrowser } from "@/lib/utils"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  logout: () => void
  signOut: () => void // Alias for logout for compatibility with dashboard sidebar
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      if (!isBrowser) {
        setIsLoading(false)
        return
      }

      const token = Cookies.get("ighota_auth_token")

      if (token) {
        try {
          const userData = await authApi.getCurrentUser()
          setUser(userData)

          // If user's email is not verified and they're not on the verify email page,
          // redirect them to the verify email page
          if (
            userData &&
            userData.emailVerified === false &&
            !pathname?.includes("/auth/verify-email") &&
            !pathname?.includes("/auth/logout")
          ) {
            router.push("/auth/verify-email")
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error)
          // Clear invalid tokens
          authApi.logout()
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Redirect unauthenticated users from protected routes
  useEffect(() => {
    if (!isBrowser || isLoading || isAuthenticated) return

    const protectedRoutes = ["/dashboard", "/profile", "/settings", "/courses/enrolled"]

    if (protectedRoutes.some((route) => pathname?.startsWith(route))) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname || "/")}`)
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.login(email, password)
      setUser(response.user)

      // If email is not verified, redirect to verify email page
      if (response.user.emailVerified === false) {
        router.push("/auth/verify-email")
      } else {
        // Otherwise redirect to dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    try {
      setIsLoading(true)
      const response = await authApi.register(userData)
      setUser(response.user)

      // Redirect to verify email page after registration
      router.push("/auth/verify-email")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
    router.push("/")
  }

  // Alias for logout for compatibility with dashboard sidebar
  const signOut = logout

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
