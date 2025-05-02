"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Assignment {
  id: string
  title: string
  course: string
  courseId: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  progress: number
  score?: number
  feedback?: string
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setAssignments([
          {
            id: "assignment-1",
            title: "Number Bases and Modular Arithmetic",
            course: "Mathematics",
            courseId: "mathematics-wassce",
            dueDate: "2023-05-15T23:59:59Z",
            status: "submitted",
            progress: 100,
          },
          {
            id: "assignment-2",
            title: "Algebraic Expressions",
            course: "Mathematics",
            courseId: "mathematics-wassce",
            dueDate: "2023-05-20T23:59:59Z",
            status: "graded",
            progress: 100,
            score: 85,
            feedback: "Good work! You demonstrated a strong understanding of algebraic expressions.",
          },
          {
            id: "assignment-3",
            title: "Essay Writing: Argumentative Essay",
            course: "English Language",
            courseId: "english-wassce",
            dueDate: "2023-05-25T23:59:59Z",
            status: "pending",
            progress: 30,
          },
          {
            id: "assignment-4",
            title: "Cell Biology Quiz",
            course: "Biology",
            courseId: "biology-jamb",
            dueDate: "2023-05-10T23:59:59Z",
            status: "pending",
            progress: 0,
          },
          {
            id: "assignment-5",
            title: "Geometry: Circles and Triangles",
            course: "Mathematics",
            courseId: "mathematics-wassce",
            dueDate: "2023-06-05T23:59:59Z",
            status: "pending",
            progress: 0,
          },
        ])
      } catch (error) {
        console.error("Failed to fetch assignments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            Pending
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            Submitted
          </Badge>
        )
      case "graded":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Graded
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Check if an assignment is due soon (within 3 days)
  const isDueSoon = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  // Check if an assignment is past due
  const isPastDue = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    return now > due
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Manage and track your course assignments</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-2 bg-muted rounded mb-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : assignments.length > 0 ? (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Course:{" "}
                        <Link href={`/dashboard/courses/${assignment.courseId}`} className="hover:underline">
                          {assignment.course}
                        </Link>
                      </CardDescription>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Due: {formatDate(assignment.dueDate)}
                          {isDueSoon(assignment.dueDate) && assignment.status === "pending" && (
                            <span className="ml-2 text-red-500 font-medium">Due soon!</span>
                          )}
                        </span>
                      </div>
                      {assignment.status === "graded" && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Score: {assignment.score}%</span>
                        </div>
                      )}
                    </div>

                    {assignment.status === "pending" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    )}

                    {assignment.feedback && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm font-medium mb-1">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={
                        isPastDue(assignment.dueDate) && assignment.status === "pending"
                          ? "bg-red-500 hover:bg-red-600 text-white w-full"
                          : assignment.status === "graded"
                            ? "bg-green-500 hover:bg-green-600 text-white w-full"
                            : "bg-yellow-500 hover:bg-yellow-600 text-black w-full"
                      }
                    >
                      <Link href={`/dashboard/assignments/${assignment.id}`}>
                        {assignment.status === "pending" && assignment.progress === 0
                          ? "Start Assignment"
                          : assignment.status === "pending" && assignment.progress > 0
                            ? "Continue Assignment"
                            : assignment.status === "submitted"
                              ? "View Submission"
                              : assignment.status === "graded"
                                ? "View Feedback"
                                : isPastDue(assignment.dueDate)
                                  ? "Submit Late"
                                  : "Continue Assignment"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No assignments found</h3>
              <p className="text-muted-foreground mb-4">You don't have any assignments at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          <div className="space-y-4">
            {assignments
              .filter((assignment) => assignment.status === "pending")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Course:{" "}
                        <Link href={`/dashboard/courses/${assignment.courseId}`} className="hover:underline">
                          {assignment.course}
                        </Link>
                      </CardDescription>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Due: {formatDate(assignment.dueDate)}
                        {isDueSoon(assignment.dueDate) && (
                          <span className="ml-2 text-red-500 font-medium">Due soon!</span>
                        )}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={
                        isPastDue(assignment.dueDate)
                          ? "bg-red-500 hover:bg-red-600 text-white w-full"
                          : "bg-yellow-500 hover:bg-yellow-600 text-black w-full"
                      }
                    >
                      <Link href={`/dashboard/assignments/${assignment.id}`}>
                        {assignment.progress === 0
                          ? "Start Assignment"
                          : isPastDue(assignment.dueDate)
                            ? "Submit Late"
                            : "Continue Assignment"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted">
          <div className="space-y-4">
            {assignments
              .filter((assignment) => assignment.status === "submitted")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Course:{" "}
                        <Link href={`/dashboard/courses/${assignment.courseId}`} className="hover:underline">
                          {assignment.course}
                        </Link>
                      </CardDescription>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due: {formatDate(assignment.dueDate)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
                      <Link href={`/dashboard/assignments/${assignment.id}`}>View Submission</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graded">
          <div className="space-y-4">
            {assignments
              .filter((assignment) => assignment.status === "graded")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Course:{" "}
                        <Link href={`/dashboard/courses/${assignment.courseId}`} className="hover:underline">
                          {assignment.course}
                        </Link>
                      </CardDescription>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Due: {formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Score: {assignment.score}%</span>
                      </div>
                    </div>

                    {assignment.feedback && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm font-medium mb-1">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-green-500 hover:bg-green-600 text-white w-full">
                      <Link href={`/dashboard/assignments/${assignment.id}`}>View Feedback</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
