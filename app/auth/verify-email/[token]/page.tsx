"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authApi } from "@/lib/api-client"

export default function VerifyEmailPage() {
  const params = useParams()
  const token = params.token as string

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authApi.verifyEmail(token)
        setStatus("success")
        setMessage(response.message || "Your email has been successfully verified.")
      } catch (error: any) {
        setStatus("error")
        setMessage(error.response?.data?.message || "Failed to verify your email. The link may be invalid or expired.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
              <CardDescription>Verifying your email address</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              {status === "loading" && (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-center">Verifying your email address...</p>
                </>
              )}

              {status === "success" && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {status !== "loading" && (
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/auth/login">Go to Login</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
