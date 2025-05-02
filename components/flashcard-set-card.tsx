import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen } from "lucide-react"
import type { FlashcardSet } from "@/lib/api-client"

interface FlashcardSetCardProps {
  set: FlashcardSet
  courseId: string
}

export function FlashcardSetCard({ set, courseId }: FlashcardSetCardProps) {
  const formattedDate = set.lastStudied
    ? new Date(set.lastStudied).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Never studied"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{set.title}</CardTitle>
        <CardDescription>{set.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BookOpen className="h-4 w-4" />
          <span>{set.cardCount} cards</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last studied: {formattedDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/courses/${courseId}/flashcards/${set.id}`}>Study Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
