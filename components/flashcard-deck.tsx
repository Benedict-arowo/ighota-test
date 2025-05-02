"use client"

import { useState } from "react"
import { Flashcard } from "./flashcard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { flashcardApi, type Flashcard as FlashcardType } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface FlashcardDeckProps {
  courseId: string
  setId: string
  cards: FlashcardType[]
  title: string
  description?: string
}

export function FlashcardDeck({ courseId, setId, cards, title, description }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState(false)
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0 })
  const { toast } = useToast()

  const currentCard = cards[currentIndex]
  const progress = Math.round((studiedCards.size / cards.length) * 100)

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleRate = async (difficulty: "easy" | "medium" | "hard") => {
    try {
      // Update the card's difficulty in the backend
      await flashcardApi.updateFlashcardProgress(courseId, setId, currentCard.id, difficulty)

      // Update local stats
      setStats((prev) => ({
        ...prev,
        [difficulty]: prev[difficulty] + 1,
      }))

      // Mark card as studied
      setStudiedCards((prev) => new Set(prev).add(currentCard.id))

      // Move to next card
      handleNext()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update card progress",
        variant: "destructive",
      })
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setStudiedCards(new Set())
    setCompleted(false)
    setStats({ easy: 0, medium: 0, hard: 0 })
  }

  if (cards.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">No flashcards available in this set.</p>
        </CardContent>
      </Card>
    )
  }

  if (completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Study Session Complete!</CardTitle>
          <CardDescription>You've completed studying all {cards.length} cards in this set.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Your Performance:</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-green-50 rounded-md">
                  <p className="text-green-600 font-bold text-xl">{stats.easy}</p>
                  <p className="text-sm text-green-600">Easy</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-md">
                  <p className="text-yellow-600 font-bold text-xl">{stats.medium}</p>
                  <p className="text-sm text-yellow-600">Medium</p>
                </div>
                <div className="p-2 bg-red-50 rounded-md">
                  <p className="text-red-600 font-bold text-xl">{stats.hard}</p>
                  <p className="text-sm text-red-600">Hard</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full">
            Study Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-sm text-muted-foreground">
            {studiedCards.size}/{cards.length}
          </span>
        </div>
      </div>

      <Flashcard card={currentCard} onNext={handleNext} onPrevious={handlePrevious} onRate={handleRate} />
    </div>
  )
}
