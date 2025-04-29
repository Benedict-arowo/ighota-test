import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const courses = [
  {
    id: "mathematics-wassce",
    title: "Mathematics",
    exam: "WASSCE",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=200&width=400&text=Mathematics",
  },
  {
    id: "english-wassce",
    title: "English Language",
    exam: "WASSCE",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=200&width=400&text=English Language",
  },
  {
    id: "biology-jamb",
    title: "Biology",
    exam: "JAMB",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=200&width=400&text=Biology",
  },
  {
    id: "chemistry-jamb",
    title: "Chemistry",
    exam: "JAMB",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=200&width=400&text=Chemistry",
  },
  {
    id: "physics-neco",
    title: "Physics",
    exam: "NECO",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=200&width=400&text=Physics",
  },
  {
    id: "economics-neco",
    title: "Economics",
    exam: "NECO",
    level: "Beginner to Intermediate",
    image: "/placeholder.svg?height=200&width=400&text=Economics",
  },
]

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Courses</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Comprehensive exam preparation courses designed to help you succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="wassce">WASSCE</TabsTrigger>
                  <TabsTrigger value="jamb">JAMB</TabsTrigger>
                  <TabsTrigger value="neco">NECO</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            width={400}
                            height={200}
                            alt={course.title}
                            className="aspect-video object-cover"
                          />
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="mb-2">{course.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{course.exam}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{course.level}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>12 weeks</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button className="w-full" asChild>
                            <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="wassce" className="space-y-4">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses
                      .filter((course) => course.exam === "WASSCE")
                      .map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              width={400}
                              height={200}
                              alt={course.title}
                              className="aspect-video object-cover"
                            />
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="mb-2">{course.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.exam}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>12 weeks</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 pt-0">
                            <Button className="w-full" asChild>
                              <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="jamb" className="space-y-4">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses
                      .filter((course) => course.exam === "JAMB")
                      .map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              width={400}
                              height={200}
                              alt={course.title}
                              className="aspect-video object-cover"
                            />
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="mb-2">{course.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.exam}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>12 weeks</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 pt-0">
                            <Button className="w-full" asChild>
                              <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="neco" className="space-y-4">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses
                      .filter((course) => course.exam === "NECO")
                      .map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              width={400}
                              height={200}
                              alt={course.title}
                              className="aspect-video object-cover"
                            />
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="mb-2">{course.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.exam}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>12 weeks</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 pt-0">
                            <Button className="w-full" asChild>
                              <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
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
