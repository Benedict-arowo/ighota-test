"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Separator } from "@/components/ui/separator"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    setOpen(false)
    logout()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/courses"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Courses
          </Link>
          <Link
            href="/partners"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Partners
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/donate"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Donate
          </Link>

          <Separator className="my-2" />

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <Button variant="outline" className="mt-2" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Button asChild variant="outline">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
