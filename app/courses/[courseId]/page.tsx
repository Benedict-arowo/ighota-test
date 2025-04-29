"use client"

import { useState } from "react"
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { notFound, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock course data - in a real app, this would come from a database
const coursesData = {
  "mathematics-wassce": {
    id: "mathematics-wassce",
    title: "Mathematics",
    exam: "WASSCE",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=400&width=800&text=Mathematics",
    description:
      "A comprehensive mathematics course designed to prepare students for the WASSCE examination. This course covers all the essential topics and provides extensive practice with past questions.",
    instructor: "Dr. Adebayo Johnson",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Number and Numeration",
        topics: [
          "Number bases",
          "Modular arithmetic",
          "Fractions, decimals and approximations",
          "Indices, logarithms and surds",
        ],
      },
      {
        title: "Algebra",
        topics: [
          "Algebraic expressions",
          "Simple equations and inequalities",
          "Quadratic equations",
          "Variation",
          "Logarithmic and exponential functions",
        ],
      },
      {
        title: "Geometry",
        topics: ["Angles and lines", "Polygons", "Circles", "Constructions", "Loci", "Trigonometry"],
      },
      {
        title: "Statistics and Probability",
        topics: ["Data presentation", "Measures of central tendency", "Probability", "Permutation and combination"],
      },
    ],
    notes: [
      { title: "Introduction to Algebra", url: "#" },
      { title: "Quadratic Equations", url: "#" },
      { title: "Trigonometry Basics", url: "#" },
    ],
  },
  "english-wassce": {
    id: "english-wassce",
    title: "English Language",
    exam: "WASSCE",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=400&width=800&text=English Language",
    description:
      "Master the English language for the WASSCE examination. This course focuses on grammar, comprehension, essay writing, and oral English to ensure students excel in all aspects of the exam.",
    instructor: "Mrs. Elizabeth Okonkwo",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Grammar",
        topics: ["Parts of speech", "Tenses", "Sentence structure", "Common errors"],
      },
      {
        title: "Comprehension",
        topics: [
          "Reading techniques",
          "Understanding context",
          "Answering comprehension questions",
          "Vocabulary development",
        ],
      },
      {
        title: "Essay Writing",
        topics: ["Essay types", "Planning and structure", "Formal and informal letters", "Reports and articles"],
      },
      {
        title: "Oral English",
        topics: ["Phonetics", "Stress and intonation", "Vowel and consonant sounds", "Listening comprehension"],
      },
    ],
    notes: [
      { title: "Essay Writing Guide", url: "#" },
      { title: "Grammar Rules", url: "#" },
      { title: "Comprehension Techniques", url: "#" },
    ],
  },
  "biology-jamb": {
    id: "biology-jamb",
    title: "Biology",
    exam: "JAMB",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=400&width=800&text=Biology",
    description:
      "Prepare for the JAMB Biology examination with our comprehensive course. Learn about living organisms, their structures, functions, and interactions with each other and the environment.",
    instructor: "Prof. Chika Nweke",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Cell Structure and Organization",
        topics: ["Cell theory", "Cell structure and functions", "Cell division", "Tissues"],
      },
      {
        title: "Plant and Animal Physiology",
        topics: ["Nutrition", "Transport systems", "Respiration", "Excretion", "Growth and development"],
      },
      {
        title: "Ecology and Environment",
        topics: ["Ecosystem", "Population", "Environmental pollution", "Conservation of natural resources"],
      },
      {
        title: "Genetics and Evolution",
        topics: ["Heredity", "Variation", "Evolution", "Adaptation"],
      },
    ],
    notes: [
      { title: "Cell Biology Notes", url: "#" },
      { title: "Genetics Study Guide", url: "#" },
      { title: "Ecology Overview", url: "#" },
    ],
  },
  "chemistry-jamb": {
    id: "chemistry-jamb",
    title: "Chemistry",
    exam: "JAMB",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=400&width=800&text=Chemistry",
    description:
      "Master the principles of chemistry for the JAMB examination. This course covers physical, organic, and inorganic chemistry with practical applications and problem-solving techniques.",
    instructor: "Dr. Fatima Ibrahim",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Atomic Structure and Bonding",
        topics: ["Atomic theory", "Electronic configuration", "Chemical bonding", "Periodic table"],
      },
      {
        title: "Physical Chemistry",
        topics: ["States of matter", "Kinetic theory", "Energetics", "Chemical equilibrium", "Reaction rates"],
      },
      {
        title: "Organic Chemistry",
        topics: ["Hydrocarbons", "Functional groups", "Isomerism", "Organic reactions"],
      },
      {
        title: "Inorganic Chemistry",
        topics: ["Periodic trends", "Group properties", "Transition elements", "Extraction of metals"],
      },
    ],
    notes: [
      { title: "Atomic Structure Guide", url: "#" },
      { title: "Organic Chemistry Basics", url: "#" },
      { title: "Chemical Equations and Balancing", url: "#" },
    ],
  },
  "physics-neco": {
    id: "physics-neco",
    title: "Physics",
    exam: "NECO",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=400&width=800&text=Physics",
    description:
      "Prepare for the NECO Physics examination with our comprehensive course. Learn about the fundamental principles of physics and their applications in solving real-world problems.",
    instructor: "Dr. Emmanuel Okafor",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Mechanics",
        topics: ["Motion", "Forces", "Energy", "Momentum", "Fluids"],
      },
      {
        title: "Thermal Physics",
        topics: ["Temperature", "Heat transfer", "Gas laws", "Thermodynamics"],
      },
      {
        title: "Waves",
        topics: ["Wave properties", "Sound", "Light", "Electromagnetic spectrum"],
      },
      {
        title: "Electricity and Magnetism",
        topics: ["Electric fields", "Current electricity", "Magnetic fields", "Electromagnetic induction"],
      },
    ],
    notes: [
      { title: "Mechanics Formulas", url: "#" },
      { title: "Electricity Study Guide", url: "#" },
      { title: "Wave Motion Principles", url: "#" },
    ],
  },
  "economics-neco": {
    id: "economics-neco",
    title: "Economics",
    exam: "NECO",
    level: "Beginner to Intermediate",
    image: "/placeholder.svg?height=400&width=800&text=Economics",
    description:
      "Master the principles of economics for the NECO examination. This course covers microeconomics, macroeconomics, and development economics with a focus on the Nigerian economy.",
    instructor: "Mrs. Ngozi Adekunle",
    duration: "12 weeks",
    syllabus: [
      {
        title: "Basic Economic Principles",
        topics: ["Scarcity and choice", "Opportunity cost", "Production possibility curve", "Economic systems"],
      },
      {
        title: "Microeconomics",
        topics: ["Demand and supply", "Price determination", "Elasticity", "Market structures"],
      },
      {
        title: "Macroeconomics",
        topics: ["National income", "Money and banking", "Inflation", "Unemployment", "Economic growth"],
      },
      {
        title: "Development Economics",
        topics: ["Economic development", "Nigerian economy", "International trade", "Balance of payments"],
      },
    ],
    notes: [
      { title: "Microeconomics Basics", url: "#" },
      { title: "Nigerian Economy Overview", url: "#" },
      { title: "Supply and Demand Analysis", url: "#" },
    ],
  },
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = coursesData[params.courseId]
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  if (!course) {
    notFound()
  }

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/courses/${params.courseId}`)
      return
    }

    setEnrolling(true)

    try {
      // In a real app, this would be an API call to enroll the user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEnrolled(true)
      toast({
        title: "Enrollment Successful",
        description: `You have successfully enrolled in ${course.title}`,
      })

      // Redirect to dashboard after successful enrollment
      setTimeout(() => {
        router.push("/dashboard/courses")
      }, 1500)
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{course.title}</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">{course.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>{course.exam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                {enrolled ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      You have successfully enrolled in this course. Redirecting to your dashboard...
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? "Enrolling..." : "Enroll Now"}
                    </Button>
                    <Button size="lg" variant="outline">
                      Download Syllabus
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={course.image || "/placeholder.svg"}
                  width={800}
                  height={400}
                  alt={course.title}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="syllabus" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <TabsContent value="syllabus" className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Course Syllabus</h2>
                  <p className="text-muted-foreground">
                    This course is designed to cover all the essential topics required for the {course.exam}{" "}
                    examination.
                  </p>
                </div>
                <div className="grid gap-6">
                  {course.syllabus.map((section, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid gap-2">
                          {section.topics.map((topic, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="notes" className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Course Notes</h2>
                  <p className="text-muted-foreground">
                    Download study materials and notes to help you prepare for your exams.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {course.notes.map((note, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">PDF Document</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={note.url}>Download</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="instructor" className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Meet Your Instructor</h2>
                  <p className="text-muted-foreground">
                    Learn from experienced educators who are experts in their field.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Instructor"
                      width={300}
                      height={300}
                      alt={course.instructor}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-4">
                    <h3 className="text-xl font-bold">{course.instructor}</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>10+ years of teaching experience</span>
                    </div>
                    <p className="text-muted-foreground">
                      An experienced educator with a passion for helping students excel in their examinations.
                      Specializes in creating engaging learning materials and breaking down complex concepts into
                      easy-to-understand lessons.
                    </p>
                    <p className="text-muted-foreground">
                      Has helped thousands of students achieve excellent results in their {course.exam} examinations
                      through personalized teaching methods and comprehensive study materials.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of students who have improved their exam scores with Ighota.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {enrolled ? (
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    onClick={() => router.push("/dashboard/courses")}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link href="/courses">Browse More Courses</Link>
                </Button>
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
