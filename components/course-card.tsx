import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  id?: string
  title?: string
  progress?: number
  lastAccessed?: string
  image?: string
  loading?: boolean
  isFree?: boolean
}

export function CourseCard({
  id,
  title,
  progress = 0,
  lastAccessed,
  image,
  loading = false,
  isFree = false,
}: CourseCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="p-4">
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
        <CardFooter className="p-4 flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full bg-muted">
          <img
            src={image || `/placeholder.svg?height=160&width=320&text=${encodeURIComponent(title || "Course")}`}
            alt={title}
            className="h-full w-full object-cover"
          />
          {isFree && <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">Free</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <span className="text-xs text-muted-foreground">Last accessed: {lastAccessed}</span>
        <Link href={`/dashboard/courses/${id}`} className="text-xs font-medium text-primary">
          Continue
        </Link>
      </CardFooter>
    </Card>
  )
}
