import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Support Our Mission
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your donation helps us provide quality education to more West African students.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl py-12">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Choose how you'd like to support our educational initiatives.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="one-time" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="one-time">One-time Donation</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="one-time" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Amount</Label>
                        <RadioGroup defaultValue="50" className="grid grid-cols-3 gap-4">
                          <div>
                            <RadioGroupItem value="20" id="one-time-20" className="peer sr-only" />
                            <Label
                              htmlFor="one-time-20"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦2,000</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="50" id="one-time-50" className="peer sr-only" />
                            <Label
                              htmlFor="one-time-50"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦5,000</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="100" id="one-time-100" className="peer sr-only" />
                            <Label
                              htmlFor="one-time-100"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦10,000</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-amount">Custom Amount (₦)</Label>
                        <Input id="custom-amount" type="number" placeholder="Enter amount" />
                      </div>
                    </TabsContent>
                    <TabsContent value="monthly" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Monthly Amount</Label>
                        <RadioGroup defaultValue="20" className="grid grid-cols-3 gap-4">
                          <div>
                            <RadioGroupItem value="10" id="monthly-10" className="peer sr-only" />
                            <Label
                              htmlFor="monthly-10"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦1,000</span>
                              <span className="text-sm text-muted-foreground">per month</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="20" id="monthly-20" className="peer sr-only" />
                            <Label
                              htmlFor="monthly-20"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦2,000</span>
                              <span className="text-sm text-muted-foreground">per month</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="50" id="monthly-50" className="peer sr-only" />
                            <Label
                              htmlFor="monthly-50"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-xl font-bold">₦5,000</span>
                              <span className="text-sm text-muted-foreground">per month</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-monthly">Custom Monthly Amount (₦)</Label>
                        <Input id="custom-monthly" type="number" placeholder="Enter amount" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Donate Now</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    How Your Donation Helps
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Your generous contribution makes a significant impact on our ability to provide quality education to
                    West African students.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Scholarships</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide scholarships to talented students who cannot afford quality education.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Learning Materials</h3>
                      <p className="text-sm text-muted-foreground">
                        Develop and distribute high-quality learning materials to students across West Africa.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Teacher Training</h3>
                      <p className="text-sm text-muted-foreground">
                        Train teachers to deliver effective and engaging lessons to students.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Sponsor a Student</span>
                    </CardTitle>
                    <CardDescription>
                      Support a student's education for a year with a monthly contribution.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your monthly donation of ₦5,000 can cover a student's educational materials, exam fees, and access
                      to our online resources for a full year.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Sponsor a Student</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Support</CardTitle>
                    <CardDescription>There are many ways you can contribute to our mission.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Volunteer your time</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Donate books and materials</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Corporate partnerships</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/partners">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
