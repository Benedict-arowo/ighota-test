"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from "lucide-react"

interface Flashcard {
  id: string
  front: string
  back: string
}

export default function FlashcardSetPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const restart = searchParams.get("restart") === "true"

  const courseId = params.courseId as string
  const lessonId = params.lessonId as string
  const setId = params.setId as string

  const [cards, setCards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [completed, setCompleted] = useState<Record<string, "correct" | "incorrect" | null>>({})

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        // In a real app, this would be an API call to get flashcards
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Simulate retrieving flashcards
        const mockCards = [
          {
            id: "card-1",
            front: "What is modular arithmetic?",
            back: "A system of arithmetic for integers, where numbers 'wrap around' after reaching a certain value—the modulus.",
          },
          {
            id: "card-2",
            front: "What does 17 ≡ 5 (mod 12) mean?",
            back: "It means that 17 and 5 have the same remainder when divided by 12.",
          },
          {
            id: "card-3",
            front: "What is a common example of modular arithmetic in daily life?",
            back: "A 12-hour clock uses modulo 12 arithmetic.",
          },
          { id: "card-4", front: "What is the remainder when 23 is divided by 5?", back: "3, because 23 = 4 × 5 + 3" },
          {
            id: "card-5",
            front: "If the time is 10 o'clock, what time will it be after 15 hours?",
            back: "1 o'clock, because (10 + 15) mod 12 = 25 mod 12 = 1",
          },
        ]

        setCards(mockCards)

        // If not restarting, try to load progress
        if (!restart) {
          const savedProgress = localStorage.getItem(`flashcards-progress-${setId}`)
          if (savedProgress) {
            try {
              const { index, completed: savedCompleted } = JSON.parse(savedProgress)
              setCurrentIndex(index)
              setCompleted(savedCompleted)
            } catch (e) {
              console.error("Failed to parse saved progress", e)
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch flashcards:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlashcards()
  }, [setId, restart])

  // Save progress when it changes
  useEffect(() => {
    if (cards.length > 0 && !isLoading) {
      localStorage.setItem(
        `flashcards-progress-${setId}`,
        JSON.stringify({
          index: currentIndex,
          completed,
        }),
      )
    }
  }, [currentIndex, completed, cards, setId, isLoading])

  const handleNext = () => {
    setFlipped(false)
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    setFlipped(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleMarkCard = (status: "correct" | "incorrect") => {
    if (cards[currentIndex]) {
      setCompleted({
        ...completed,
        [cards[currentIndex].id]: status,
      })
      handleNext()
    }
  }

  const resetDeck = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setCompleted({})
  }

  // Calculate progress
  const totalCards = cards.length
  const completedCards = Object.values(completed).filter((v) => v !== null).length
  const progress = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading flashcards...</p>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg mb-4">No flashcards found in this set.</p>
        <Button asChild>
          <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/flashcards`}>Back to Flashcard Sets</Link>
        </Button>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-muted-foreground">Study and memorize key concepts</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/courses/${courseId}/lessons/${lessonId}/flashcards`}>Back to Sets</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-muted-foreground mr-3">{progress}% Complete</div>
            <Button size="sm" variant="outline" onClick={resetDeck}>
              <RotateCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-full h-2 w-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div
          onClick={handleFlip}
          className="relative w-full aspect-[3/2] min-h-[300px] cursor-pointer perspective-1000"
        >
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}
          >
            <Card className="absolute w-full h-full p-8 backface-hidden flex flex-col justify-center items-center">
              <CardContent className="p-0 text-center text-xl font-medium">{currentCard.front}</CardContent>
            </Card>
            <Card className="absolute w-full h-full p-8 backface-hidden rotate-y-180 flex flex-col justify-center items-center">
              <CardContent className="p-0 text-center">
                <div className="text-lg">{currentCard.back}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900"
              onClick={() => handleMarkCard("incorrect")}
            >
              <X className="mr-2 h-4 w-4" />
              Didn't Know
            </Button>
            <Button
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900"
              onClick={() => handleMarkCard("correct")}
            >
              <Check className="mr-2 h-4 w-4" />
              Got It
            </Button>
          </div>

          <Button onClick={handleNext} disabled={currentIndex === cards.length - 1}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
