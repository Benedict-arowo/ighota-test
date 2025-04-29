import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404 - Page Not Found</h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/">Go to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
