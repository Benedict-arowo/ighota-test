"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Flashcard as FlashcardType } from "@/lib/api-client"

interface FlashcardProps {
  card: FlashcardType
  onNext?: () => void
  onPrevious?: () => void
  onRate?: (difficulty: "easy" | "medium" | "hard") => void
  showNavigation?: boolean
  showRating?: boolean
}

export function Flashcard({
  card,
  onNext,
  onPrevious,
  onRate,
  showNavigation = true,
  showRating = true,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative perspective">
        <div
          className={cn(
            "flashcard-container w-full h-64 cursor-pointer transition-transform duration-500",
            flipped ? "rotate-y-180" : "",
          )}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <Card
            className={cn(
              "absolute inset-0 backface-hidden p-6 flex items-center justify-center",
              !flipped ? "visible" : "invisible",
            )}
          >
            <CardContent className="p-0 text-center">
              <div className="text-xl font-medium">{card.front}</div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card
            className={cn(
              "absolute inset-0 backface-hidden rotate-y-180 p-6 flex items-center justify-center",
              flipped ? "visible" : "invisible",
            )}
          >
            <CardContent className="p-0 text-center">
              <div className="text-xl">{card.back}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        {showNavigation && (
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              if (onPrevious) onPrevious()
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setFlipped(false)
          }}
        >
          <RotateCw className="h-4 w-4" />
        </Button>

        {showNavigation && (
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              if (onNext) onNext()
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showRating && flipped && (
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            variant="outline"
            className="border-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation()
              if (onRate) onRate("hard")
            }}
          >
            Hard
          </Button>
          <Button
            variant="outline"
            className="border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
            onClick={(e) => {
              e.stopPropagation()
              if (onRate) onRate("medium")
            }}
          >
            Medium
          </Button>
          <Button
            variant="outline"
            className="border-green-500 hover:bg-green-50 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation()
              if (onRate) onRate("easy")
            }}
          >
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}
