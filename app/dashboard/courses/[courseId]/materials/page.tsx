"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Video, BookOpen, FileQuestion } from "lucide-react"

interface CourseMaterial {
  id: string
  title: string
  type: "note" | "video" | "quiz" | "practice" | "lesson"
  description: string
  url: string
  module: string
}

interface CourseDetail {
  id: string
  title: string
  exam: string
  materials: {
    notes: CourseMaterial[]
    videos: CourseMaterial[]
    quizzes: CourseMaterial[]
    practiceTests: CourseMaterial[]
    lessons: CourseMaterial[]
  }
}

export default function CourseMaterialsPage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourseMaterials = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data based on courseId
        if (params.courseId === "mathematics-wassce") {
          setCourse({
            id: "mathematics-wassce",
            title: "Mathematics",
            exam: "WASSCE",
            materials: {
              notes: [
                {
                  id: "note-1",
                  title: "Number Bases and Modular Arithmetic",
                  type: "note",
                  description: "Comprehensive notes on number bases and modular arithmetic.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Number and Numeration",
                },
                {
                  id: "note-2",
                  title: "Algebraic Expressions and Equations",
                  type: "note",
                  description: "Detailed notes on algebraic expressions and solving equations.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Algebra",
                },
                {
                  id: "note-3",
                  title: "Geometry Fundamentals",
                  type: "note",
                  description: "Notes covering angles, polygons, circles, and trigonometry.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Geometry",
                },
                {
                  id: "note-4",
                  title: "Statistics and Probability",
                  type: "note",
                  description: "Comprehensive notes on data analysis and probability concepts.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Statistics and Probability",
                },
              ],
              videos: [
                {
                  id: "video-1",
                  title: "Converting Between Number Bases",
                  type: "video",
                  description: "Video tutorial on converting between binary, decimal, and hexadecimal.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Number and Numeration",
                },
                {
                  id: "video-2",
                  title: "Solving Quadratic Equations",
                  type: "video",
                  description: "Step-by-step guide to solving quadratic equations.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Algebra",
                },
                {
                  id: "video-3",
                  title: "Understanding Trigonometry",
                  type: "video",
                  description: "Comprehensive tutorial on trigonometric functions and identities.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Geometry",
                },
              ],
              quizzes: [
                {
                  id: "quiz-1",
                  title: "Number Bases Quiz",
                  type: "quiz",
                  description: "Test your knowledge of number bases and conversions.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Number and Numeration",
                },
                {
                  id: "quiz-2",
                  title: "Algebra Quiz",
                  type: "quiz",
                  description: "Test your understanding of algebraic expressions and equations.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Algebra",
                },
                {
                  id: "quiz-3",
                  title: "Geometry Quiz",
                  type: "quiz",
                  description: "Test your knowledge of geometric principles and calculations.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Geometry",
                },
                {
                  id: "quiz-4",
                  title: "Statistics and Probability Quiz",
                  type: "quiz",
                  description: "Test your understanding of statistical concepts and probability.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Statistics and Probability",
                },
              ],
              practiceTests: [
                {
                  id: "practice-1",
                  title: "WASSCE Mathematics Practice Test 1",
                  type: "practice",
                  description: "Full-length practice test with questions from all modules.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "All Modules",
                },
                {
                  id: "practice-2",
                  title: "WASSCE Mathematics Practice Test 2",
                  type: "practice",
                  description: "Advanced practice test with challenging questions.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "All Modules",
                },
              ],
              lessons: [
                {
                  id: "lesson-1-1",
                  title: "Introduction to Number Bases",
                  type: "lesson",
                  description: "Learn about different number systems and how to convert between them.",
                  url: `/dashboard/courses/${params.courseId}/lessons/lesson-1-1`,
                  module: "Number and Numeration",
                },
                {
                  id: "lesson-1-2",
                  title: "Modular Arithmetic",
                  type: "lesson",
                  description: "Understand the principles of modular arithmetic and its applications.",
                  url: `/dashboard/courses/${params.courseId}/lessons/lesson-1-2`,
                  module: "Number and Numeration",
                },
                {
                  id: "lesson-2-1",
                  title: "Algebraic Expressions",
                  type: "lesson",
                  description: "Learn how to work with algebraic expressions and simplify them.",
                  url: `/dashboard/courses/${params.courseId}/lessons/lesson-2-1`,
                  module: "Algebra",
                },
              ],
            },
          })
        } else if (params.courseId === "english-wassce") {
          setCourse({
            id: "english-wassce",
            title: "English Language",
            exam: "WASSCE",
            materials: {
              notes: [
                {
                  id: "note-1",
                  title: "Grammar Rules and Usage",
                  type: "note",
                  description: "Comprehensive notes on English grammar rules and usage.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Grammar",
                },
                {
                  id: "note-2",
                  title: "Essay Writing Guide",
                  type: "note",
                  description: "Detailed guide on writing different types of essays.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Essay Writing",
                },
              ],
              videos: [
                {
                  id: "video-1",
                  title: "Understanding Tenses",
                  type: "video",
                  description: "Video tutorial on past, present, and future tenses.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Grammar",
                },
                {
                  id: "video-2",
                  title: "Comprehension Techniques",
                  type: "video",
                  description: "Strategies for answering comprehension questions.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Comprehension",
                },
              ],
              quizzes: [
                {
                  id: "quiz-1",
                  title: "Grammar Quiz",
                  type: "quiz",
                  description: "Test your knowledge of English grammar.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Grammar",
                },
                {
                  id: "quiz-2",
                  title: "Comprehension Quiz",
                  type: "quiz",
                  description: "Practice answering comprehension questions.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Comprehension",
                },
              ],
              practiceTests: [
                {
                  id: "practice-1",
                  title: "WASSCE English Practice Test",
                  type: "practice",
                  description: "Full-length practice test covering all aspects of the exam.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "All Modules",
                },
              ],
              lessons: [
                {
                  id: "lesson-1-1",
                  title: "Parts of Speech",
                  type: "lesson",
                  description: "Learn about the different parts of speech in English grammar.",
                  url: `/dashboard/courses/${params.courseId}/lessons/lesson-1-1`,
                  module: "Grammar",
                },
              ],
            },
          })
        } else if (params.courseId === "biology-jamb") {
          setCourse({
            id: "biology-jamb",
            title: "Biology",
            exam: "JAMB",
            materials: {
              notes: [
                {
                  id: "note-1",
                  title: "Cell Biology",
                  type: "note",
                  description: "Comprehensive notes on cell structure and functions.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Cell Structure and Organization",
                },
                {
                  id: "note-2",
                  title: "Plant and Animal Physiology",
                  type: "note",
                  description: "Detailed notes on physiological processes in plants and animals.",
                  url: `/dashboard/courses/${params.courseId}/notes`,
                  module: "Plant and Animal Physiology",
                },
              ],
              videos: [
                {
                  id: "video-1",
                  title: "Cell Division",
                  type: "video",
                  description: "Video tutorial on mitosis and meiosis.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Cell Structure and Organization",
                },
                {
                  id: "video-2",
                  title: "Ecosystem Dynamics",
                  type: "video",
                  description: "Comprehensive tutorial on ecosystem interactions.",
                  url: `/dashboard/courses/${params.courseId}/notes#videos`,
                  module: "Ecology and Environment",
                },
              ],
              quizzes: [
                {
                  id: "quiz-1",
                  title: "Cell Biology Quiz",
                  type: "quiz",
                  description: "Test your knowledge of cell structure and functions.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Cell Structure and Organization",
                },
                {
                  id: "quiz-2",
                  title: "Genetics Quiz",
                  type: "quiz",
                  description: "Test your understanding of heredity and variation.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "Genetics and Evolution",
                },
              ],
              practiceTests: [
                {
                  id: "practice-1",
                  title: "JAMB Biology Practice Test",
                  type: "practice",
                  description: "Full-length practice test with questions from all modules.",
                  url: `/dashboard/courses/${params.courseId}/quiz`,
                  module: "All Modules",
                },
              ],
              lessons: [
                {
                  id: "lesson-1-1",
                  title: "Cell Theory and Structure",
                  type: "lesson",
                  description: "Learn about the fundamental principles of cell theory and cell structure.",
                  url: `/dashboard/courses/${params.courseId}/lessons/lesson-1-1`,
                  module: "Cell Structure and Organization",
                },
              ],
            },
          })
        } else {
          // If course not found
          notFound()
        }
      } catch (error) {
        console.error("Failed to fetch course materials:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseMaterials()
  }, [params.courseId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading course materials...</p>
      </div>
    )
  }

  if (!course) {
    return notFound()
  }

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "quiz":
        return <FileQuestion className="h-5 w-5" />
      case "practice":
        return <BookOpen className="h-5 w-5" />
      case "lesson":
        return <BookOpen className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title} - Course Materials</h1>
          <p className="text-muted-foreground">Access all study materials for your {course.exam} preparation</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/courses/${course.id}`}>Back to Course</Link>
        </Button>
      </div>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <div className="grid gap-6 md:grid-cols-2">
            {course.materials.lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.module}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                  <Button asChild className="w-full">
                    <Link href={lesson.url}>Start Lesson</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <div className="grid gap-6 md:grid-cols-2">
            {course.materials.notes.map((note) => (
              <Card key={note.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.module}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{note.description}</p>
                  <Button asChild className="w-full">
                    <Link href={note.url}>
                      <Download className="mr-2 h-4 w-4" />
                      View Notes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid gap-6 md:grid-cols-2">
            {course.materials.videos.map((video) => (
              <Card key={video.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.module}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                  <Button asChild className="w-full">
                    <Link href={video.url}>Watch Video</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes">
          <div className="grid gap-6 md:grid-cols-2">
            {course.materials.quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.module}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                  <Button asChild className="w-full">
                    <Link href={quiz.url}>Take Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <div className="grid gap-6 md:grid-cols-2">
            {course.materials.practiceTests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>{test.module}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                  <Button asChild className="w-full">
                    <Link href={test.url}>Start Practice Test</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
