"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, Play, User } from "lucide-react"

interface CourseModule {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  type: "video" | "reading" | "quiz"
}

interface CourseDetail {
  id: string
  title: string
  exam: string
  image: string
  description: string
  instructor: string
  progress: number
  lastAccessed: string
  modules: CourseModule[]
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("content")

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data based on courseId
        if (params.courseId === "mathematics-wassce") {
          setCourse({
            id: "mathematics-wassce",
            title: "Mathematics",
            exam: "WASSCE",
            image: "/placeholder.svg?height=400&width=800&text=Mathematics",
            description: "A comprehensive mathematics course designed to prepare students for the WASSCE examination.",
            instructor: "Dr. Adebayo Johnson",
            progress: 45,
            lastAccessed: "2023-04-28T14:30:00Z",
            modules: [
              {
                id: "module-1",
                title: "Number and Numeration",
                description: "Learn about number bases, modular arithmetic, and more.",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "Introduction to Number Bases",
                    duration: "25 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-2",
                    title: "Converting Between Number Bases",
                    duration: "30 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-3",
                    title: "Modular Arithmetic",
                    duration: "35 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-4",
                    title: "Number Bases Quiz",
                    duration: "20 min",
                    completed: true,
                    type: "quiz",
                  },
                ],
              },
              {
                id: "module-2",
                title: "Algebra",
                description: "Master algebraic expressions, equations, and functions.",
                lessons: [
                  {
                    id: "lesson-2-1",
                    title: "Algebraic Expressions",
                    duration: "30 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-2-2",
                    title: "Simple Equations and Inequalities",
                    duration: "40 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-2-3",
                    title: "Quadratic Equations",
                    duration: "45 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-2-4",
                    title: "Algebra Quiz",
                    duration: "25 min",
                    completed: false,
                    type: "quiz",
                  },
                ],
              },
              {
                id: "module-3",
                title: "Geometry",
                description: "Explore angles, polygons, circles, and trigonometry.",
                lessons: [
                  {
                    id: "lesson-3-1",
                    title: "Angles and Lines",
                    duration: "30 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-3-2",
                    title: "Polygons",
                    duration: "35 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-3-3",
                    title: "Circles",
                    duration: "40 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-3-4",
                    title: "Trigonometry",
                    duration: "45 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-3-5",
                    title: "Geometry Quiz",
                    duration: "30 min",
                    completed: false,
                    type: "quiz",
                  },
                ],
              },
              {
                id: "module-4",
                title: "Statistics and Probability",
                description: "Learn data presentation, measures of central tendency, and probability.",
                lessons: [
                  {
                    id: "lesson-4-1",
                    title: "Data Presentation",
                    duration: "35 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-4-2",
                    title: "Measures of Central Tendency",
                    duration: "40 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-4-3",
                    title: "Probability",
                    duration: "45 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-4-4",
                    title: "Permutation and Combination",
                    duration: "50 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-4-5",
                    title: "Statistics and Probability Quiz",
                    duration: "30 min",
                    completed: false,
                    type: "quiz",
                  },
                ],
              },
            ],
          })
        } else if (params.courseId === "english-wassce") {
          setCourse({
            id: "english-wassce",
            title: "English Language",
            exam: "WASSCE",
            image: "/placeholder.svg?height=400&width=800&text=English Language",
            description: "Master the English language for the WASSCE examination.",
            instructor: "Mrs. Elizabeth Okonkwo",
            progress: 30,
            lastAccessed: "2023-04-27T10:15:00Z",
            modules: [
              {
                id: "module-1",
                title: "Grammar",
                description: "Learn about parts of speech, tenses, and sentence structure.",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "Parts of Speech",
                    duration: "30 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-2",
                    title: "Tenses",
                    duration: "35 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-3",
                    title: "Sentence Structure",
                    duration: "40 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-1-4",
                    title: "Common Errors",
                    duration: "30 min",
                    completed: false,
                    type: "video",
                  },
                  {
                    id: "lesson-1-5",
                    title: "Grammar Quiz",
                    duration: "25 min",
                    completed: false,
                    type: "quiz",
                  },
                ],
              },
              // More modules would be here
            ],
          })
        } else if (params.courseId === "biology-jamb") {
          setCourse({
            id: "biology-jamb",
            title: "Biology",
            exam: "JAMB",
            image: "/placeholder.svg?height=400&width=800&text=Biology",
            description: "Prepare for the JAMB Biology examination with our comprehensive course.",
            instructor: "Prof. Chika Nweke",
            progress: 60,
            lastAccessed: "2023-04-29T09:45:00Z",
            modules: [
              {
                id: "module-1",
                title: "Cell Structure and Organization",
                description: "Learn about cell theory, structure, functions, and division.",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "Cell Theory",
                    duration: "25 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-2",
                    title: "Cell Structure and Functions",
                    duration: "35 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-3",
                    title: "Cell Division",
                    duration: "40 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-4",
                    title: "Tissues",
                    duration: "30 min",
                    completed: true,
                    type: "video",
                  },
                  {
                    id: "lesson-1-5",
                    title: "Cell Biology Quiz",
                    duration: "25 min",
                    completed: true,
                    type: "quiz",
                  },
                ],
              },
              // More modules would be here
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
  }, [params.courseId])

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

  // Calculate total lessons and completed lessons
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  // Find the next lesson to continue
  const findNextLesson = () => {
    for (const module of course.modules) {
      const nextLesson = module.lessons.find((lesson) => !lesson.completed)
      if (nextLesson) {
        return { moduleId: module.id, lessonId: nextLesson.id, title: nextLesson.title }
      }
    }
    return null
  }

  const nextLesson = findNextLesson()

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <Badge className="self-start md:self-auto px-3 py-1 text-sm">{course.exam}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>
              You've completed {completedLessons} out of {totalLessons} lessons ({course.progress}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={course.progress} className="h-2" />

            {nextLesson ? (
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Continue where you left off:</h3>
                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href={`/dashboard/courses/${course.id}/lessons/${nextLesson.lessonId}`}>
                    <Play className="mr-2 h-4 w-4" />
                    {nextLesson.title}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-green-800 dark:text-green-400">
                  Congratulations! You've completed all lessons.
                </h3>
                <p className="text-sm text-green-700 dark:text-green-500">
                  You can review any lesson or take the final exam.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Instructor</p>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Lessons</p>
                <p className="text-sm text-muted-foreground">{totalLessons} lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Accessed</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(course.lastAccessed).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/dashboard/courses/${course.id}/materials`}>
                <FileText className="mr-2 h-4 w-4" />
                Course Materials
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {course.modules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-lg">
                  <div className="flex flex-col items-start text-left">
                    <div className="font-medium">
                      Module {moduleIndex + 1}: {module.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {module.lessons.filter((lesson) => lesson.completed).length} of {module.lessons.length} lessons
                      completed
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="pt-2 pb-4">
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type === "video" ? "Video" : lesson.type === "reading" ? "Reading" : "Quiz"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            asChild
                            size="sm"
                            variant={lesson.completed ? "outline" : "default"}
                            className={!lesson.completed ? "bg-yellow-500 hover:bg-yellow-600 text-black" : undefined}
                          >
                            <Link href={`/dashboard/courses/${course.id}/lessons/${lesson.id}`}>
                              {lesson.completed ? "Review" : "Start"}
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>About This Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-muted-foreground">
                  {course.description} This comprehensive course is designed to prepare students for the {course.exam}{" "}
                  examination. It covers all essential topics and provides extensive practice with past questions to
                  ensure you're fully prepared for your exams.
                </p>
                <h3 className="text-lg font-medium">What You'll Learn</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {course.modules.map((module) => (
                    <li key={module.id}>{module.title}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium">Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">Expert in {course.title}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
