"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { AlertCircle, CheckCircle, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authApi } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

export default function VerifyEmailInstructionsPage() {
  const { user } = useAuth()
  const [email, setEmail] = useState<string>(user?.email || "")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  const handleResendVerification = async () => {
    try {
      setStatus("loading")
      setMessage("")

      const response = await authApi.resendVerificationEmail(email)

      setStatus("success")
      setMessage(response.message || "Verification email has been sent. Please check your inbox.")
    } catch (error: any) {
      setStatus("error")
      setMessage(error.response?.data?.message || "Failed to send verification email. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
              <CardDescription>
                We've sent a verification email to your inbox. Please check your email and click the verification link.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <p className="text-center mb-2">
                  A verification link has been sent to your email address. Please check your inbox and click the link to
                  verify your account.
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  If you don't see the email, check your spam folder.
                </p>
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                />
              </div>

              <Button
                onClick={handleResendVerification}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Resend Verification Email"}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                Already verified?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Login to your account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
