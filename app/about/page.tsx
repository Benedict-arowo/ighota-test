import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About Ighota
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our mission is to provide quality education and exam preparation resources to West African students.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="About Ighota"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Our Story</h2>
                  <p className="text-muted-foreground">
                    Ighota was founded with a simple goal: to make quality education accessible to all West African
                    students, regardless of their background or location. We believe that every student deserves the
                    opportunity to excel in their college entry exams.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                  <p className="text-muted-foreground">
                    We envision a future where every West African student has access to the resources they need to
                    succeed academically and pursue their dreams of higher education.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Our Values</h2>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Excellence in education</li>
                    <li>Accessibility for all students</li>
                    <li>Innovation in teaching methods</li>
                    <li>Community support and engagement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Meet the dedicated educators and professionals behind Ighota.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-4">
                  <div className="overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=Team Member ${i}`}
                      width={150}
                      height={150}
                      alt={`Team Member ${i}`}
                      className="aspect-square object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Team Member {i}</h3>
                    <p className="text-sm text-muted-foreground">Position</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Ighota. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
