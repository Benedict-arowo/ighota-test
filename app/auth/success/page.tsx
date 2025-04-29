"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const action = searchParams.get("action")

  // Define success messages and actions based on the action parameter
  const getSuccessContent = () => {
    switch (action) {
      case "password-reset":
        return {
          title: "Password Reset Successful",
          description: "Your password has been successfully reset.",
          message: "You can now log in with your new password.",
          buttonText: "Go to Login",
          buttonLink: "/auth/login",
        }
      case "email-verified":
        return {
          title: "Email Verified",
          description: "Your email has been successfully verified.",
          message: "You can now access all features of your account.",
          buttonText: "Go to Dashboard",
          buttonLink: "/dashboard",
        }
      case "account-created":
        return {
          title: "Account Created",
          description: "Your account has been successfully created.",
          message: "Please check your email to verify your account.",
          buttonText: "Go to Login",
          buttonLink: "/auth/login",
        }
      default:
        return {
          title: "Success",
          description: "Your request has been processed successfully.",
          message: "Thank you for using our service.",
          buttonText: "Go to Home",
          buttonLink: "/",
        }
    }
  }

  const content = getSuccessContent()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">{content.title}</CardTitle>
              <CardDescription>{content.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-6 mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-center">{content.message}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href={content.buttonLink}>{content.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
