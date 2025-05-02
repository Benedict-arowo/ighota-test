"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuizPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string
  const quizId = params.quizId as string

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz</h1>
          <p className="text-muted-foreground">Test your understanding</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/quizzes`}>Back to Quizzes</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Quiz content for {quizId} would be displayed here.</p>
          <div className="mt-8 flex justify-end">
            <Button asChild>
              <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/quizzes`}>Finish Quiz</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
