"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface QuizOption {
  id: string
  label: string
  text: string
}

export interface QuizQuestionProps {
  id: string
  question: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
}

export function QuizQuestion({ question, options, correctOptionId, explanation }: QuizQuestionProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const isCorrect = selectedOptionId === correctOptionId
  const hasAnswered = selectedOptionId !== null

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered) return
    setSelectedOptionId(optionId)
  }

  const correctOption = options.find((option) => option.id === correctOptionId)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-full border p-4 text-left transition-all hover:border-primary",
                hasAnswered &&
                  option.id === selectedOptionId &&
                  isCorrect &&
                  "border-green-500 bg-green-50 dark:bg-green-950",
                hasAnswered &&
                  option.id === selectedOptionId &&
                  !isCorrect &&
                  "border-red-500 bg-red-50 dark:bg-red-950",
                hasAnswered &&
                  option.id === correctOptionId &&
                  option.id !== selectedOptionId &&
                  "border-green-500 bg-green-50 dark:bg-green-950",
              )}
              disabled={hasAnswered}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  hasAnswered &&
                    option.id === selectedOptionId &&
                    isCorrect &&
                    "border-green-500 bg-green-500 text-white",
                  hasAnswered && option.id === selectedOptionId && !isCorrect && "border-red-500 bg-red-500 text-white",
                  hasAnswered &&
                    option.id === correctOptionId &&
                    option.id !== selectedOptionId &&
                    "border-green-500 bg-green-500 text-white",
                  !hasAnswered && "border-muted-foreground bg-background text-foreground",
                )}
              >
                {hasAnswered && option.id === selectedOptionId && isCorrect && <Check className="h-4 w-4" />}
                {hasAnswered && option.id === selectedOptionId && !isCorrect && <X className="h-4 w-4" />}
                {!(hasAnswered && option.id === selectedOptionId) && option.label}
              </div>
              <span>{option.text}</span>
            </button>
          ))}
        </div>

        {hasAnswered && (
          <div
            className={cn(
              "mt-4 rounded-lg border p-4",
              isCorrect
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400",
            )}
          >
            <div className="flex items-center gap-2 font-medium">
              {isCorrect ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5" />
                  <span>Incorrect</span>
                </>
              )}
            </div>

            {!isCorrect && (
              <div className="mt-2">
                <p>
                  The correct answer is: {correctOption?.label} - {correctOption?.text}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="mt-2">
                <p className="font-medium">Explanation:</p>
                <p>{explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {hasAnswered && (
        <CardFooter>
          <Button variant="outline" onClick={() => setShowExplanation(!showExplanation)} className="w-full">
            {showExplanation ? "Hide Explanation" : "See Full Explanation"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
