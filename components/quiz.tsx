"use client"

import { useState } from "react"
import { QuizQuestion, type QuizQuestionProps } from "./quiz-question"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export interface QuizProps {
  title: string
  description?: string
  questions: QuizQuestionProps[]
}

export function Quiz({ title, description, questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (answeredQuestions.size / questions.length) * 100

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuestionAnswered = (questionIndex: number) => {
    setAnsweredQuestions((prev) => {
      const updated = new Set(prev)
      updated.add(questionIndex)
      return updated
    })
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnsweredQuestions(new Set())
    setShowResults(false)
  }

  if (showResults) {
    const score = answeredQuestions.size
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold">{percentage}%</p>
            <p className="text-muted-foreground">
              You answered {score} out of {questions.length} questions correctly
            </p>
          </div>

          <Progress value={percentage} className="h-2" />

          <div className="space-y-2">
            {questions.map((question, index) => (
              <div key={question.id} className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">Question {index + 1}</span>
                <span
                  className={
                    answeredQuestions.has(index)
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {answeredQuestions.has(index) ? "Correct" : "Incorrect"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full">
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
        <div className="flex items-center justify-between text-sm">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <QuizQuestion
        key={currentQuestion.id}
        {...currentQuestion}
        onAnswered={() => handleQuestionAnswered(currentQuestionIndex)}
      />

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!answeredQuestions.has(currentQuestionIndex)}>
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}
