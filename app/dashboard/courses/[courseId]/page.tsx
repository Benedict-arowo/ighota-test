"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, FileText, Video, CheckCircle, FileQuestion } from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  lessons: {
    id: string
    title: string
    completed: boolean
  }[]
}

interface CourseDetail {
  id: string
  title: string
  description: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed?: string
  modules: Module[]
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data based on courseId
        if (courseId === "mathematics-wassce") {
          setCourse({
            id: "mathematics-wassce",
            title: "Mathematics",
            description: "A comprehensive mathematics course designed to prepare students for the WASSCE examination.",
            instructor: "Dr. Adebayo Johnson",
            progress: 35,
            totalLessons: 24,
            completedLessons: 8,
            lastAccessed: "2 days ago",
            modules: [
              {
                id: "module-1",
                title: "Number and Numeration",
                description: "Learn about number bases, modular arithmetic, and more.",
                lessons: [
                  { id: "lesson-1-1", title: "Introduction to Number Bases", completed: true },
                  { id: "lesson-1-2", title: "Modular Arithmetic", completed: false },
                  { id: "lesson-1-3", title: "Fractions and Decimals", completed: false },
                  { id: "lesson-1-4", title: "Indices, Logarithms and Surds", completed: false },
                ],
              },
              {
                id: "module-2",
                title: "Algebra",
                description: "Master algebraic expressions, equations, and functions.",
                lessons: [
                  { id: "lesson-2-1", title: "Algebraic Expressions", completed: false },
                  { id: "lesson-2-2", title: "Simple Equations and Inequalities", completed: false },
                  { id: "lesson-2-3", title: "Quadratic Equations", completed: false },
                  { id: "lesson-2-4", title: "Variation", completed: false },
                  { id: "lesson-2-5", title: "Logarithmic and Exponential Functions", completed: false },
                ],
              },
              {
                id: "module-3",
                title: "Geometry",
                description: "Explore angles, polygons, circles, and trigonometry.",
                lessons: [
                  { id: "lesson-3-1", title: "Angles and Lines", completed: false },
                  { id: "lesson-3-2", title: "Polygons", completed: false },
                  { id: "lesson-3-3", title: "Circles", completed: false },
                  { id: "lesson-3-4", title: "Constructions", completed: false },
                  { id: "lesson-3-5", title: "Loci", completed: false },
                  { id: "lesson-3-6", title: "Trigonometry", completed: false },
                ],
              },
              {
                id: "module-4",
                title: "Statistics and Probability",
                description: "Learn data presentation, measures of central tendency, and probability.",
                lessons: [
                  { id: "lesson-4-1", title: "Data Presentation", completed: false },
                  { id: "lesson-4-2", title: "Measures of Central Tendency", completed: false },
                  { id: "lesson-4-3", title: "Probability", completed: false },
                  { id: "lesson-4-4", title: "Permutation and Combination", completed: false },
                ],
              },
            ],
          })
        } else if (courseId === "english-wassce") {
          setCourse({
            id: "english-wassce",
            title: "English Language",
            description: "Master the English language for the WASSCE examination.",
            instructor: "Mrs. Elizabeth Okonkwo",
            progress: 20,
            totalLessons: 20,
            completedLessons: 4,
            lastAccessed: "1 week ago",
            modules: [
              {
                id: "module-1",
                title: "Grammar",
                description: "Learn about parts of speech, tenses, and sentence structure.",
                lessons: [
                  { id: "lesson-1-1", title: "Parts of Speech", completed: true },
                  { id: "lesson-1-2", title: "Tenses", completed: false },
                  { id: "lesson-1-3", title: "Sentence Structure", completed: false },
                  { id: "lesson-1-4", title: "Common Errors", completed: false },
                ],
              },
              // More modules would be added here
            ],
          })
        } else if (courseId === "biology-jamb") {
          setCourse({
            id: "biology-jamb",
            title: "Biology",
            description: "Prepare for the JAMB Biology examination with our comprehensive course.",
            instructor: "Prof. Chika Nweke",
            progress: 15,
            totalLessons: 18,
            completedLessons: 3,
            lastAccessed: "3 days ago",
            modules: [
              {
                id: "module-1",
                title: "Cell Structure and Organization",
                description: "Learn about cell theory, structure, and functions.",
                lessons: [
                  { id: "lesson-1-1", title: "Cell Theory and Structure", completed: true },
                  { id: "lesson-1-2", title: "Cell Division", completed: false },
                  { id: "lesson-1-3", title: "Tissues", completed: false },
                ],
              },
              // More modules would be added here
            ],
          })
        } else {
          // If course not found
          notFound()
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseDetails()
  }, [courseId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading course details...</p>
      </div>
    )
  }

  if (!course) {
    return notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/courses">All Courses</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Completion</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>
              {course.lastAccessed && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Last: {course.lastAccessed}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <Link href={`/dashboard/courses/${courseId}/notes`}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Notes</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <Link href={`/dashboard/courses/${courseId}/notes#videos`}>
                  <Video className="h-8 w-8 mb-2" />
                  <span>Videos</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <Link href={`/dashboard/courses/${courseId}/quiz`}>
                  <FileQuestion className="h-8 w-8 mb-2" />
                  <span>Quizzes</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <Link href={`/dashboard/courses/${courseId}/materials`}>
                  <BookOpen className="h-8 w-8 mb-2" />
                  <span>All Materials</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {course.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{course.instructor}</h3>
                <p className="text-sm text-muted-foreground">Course Instructor</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="#">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="modules">Course Modules</TabsTrigger>
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          {course.modules.map((module, index) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle>
                  Module {index + 1}: {module.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/dashboard/courses/${courseId}/lessons/${lesson.id}`}>
                          {lesson.completed ? "Review" : "Start"}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>About This Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This course is designed to prepare students for the {course.id.includes("wassce") ? "WASSCE" : "JAMB"}{" "}
                examination in {course.title}. It covers all the essential topics required for the exam and provides
                comprehensive study materials, practice questions, and assessments.
              </p>

              <div className="space-y-2">
                <h3 className="font-medium">What You'll Learn</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.modules.map((module) => (
                    <li key={module.id}>{module.title}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Course Structure</h3>
                <p>
                  This course consists of {course.modules.length} modules with a total of {course.totalLessons} lessons.
                  Each module focuses on a specific area of {course.title} and includes video lectures, reading
                  materials, practice questions, and assessments to help you master the concepts.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Prerequisites</h3>
                <p>
                  Basic understanding of {course.title.toLowerCase()} concepts from junior secondary school level. No
                  advanced knowledge is required as we'll build your understanding from the ground up.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
