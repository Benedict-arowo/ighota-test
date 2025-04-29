import Link from "next/link"
import { Clock, BookOpen } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  id: string
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed?: string
  image?: string
}

export function CourseCard({
  id,
  title,
  description,
  progress,
  totalLessons,
  completedLessons,
  lastAccessed,
  image,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          {lastAccessed && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last: {lastAccessed}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/courses/${id}`}>Continue Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
