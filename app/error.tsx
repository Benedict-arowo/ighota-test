"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Something went wrong!</h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button onClick={() => reset()} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
