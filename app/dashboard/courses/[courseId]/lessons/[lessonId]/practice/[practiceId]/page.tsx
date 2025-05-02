"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PracticeTestPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string
  const practiceId = params.practiceId as string

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Test</h1>
          <p className="text-muted-foreground">Apply your knowledge</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/practice`}>Back to Practice Tests</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Test Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Practice test content for {practiceId} would be displayed here.</p>
          <div className="mt-8 flex justify-end">
            <Button asChild>
              <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/practice`}>Submit Answers</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
