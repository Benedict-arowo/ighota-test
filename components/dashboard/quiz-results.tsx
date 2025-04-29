import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuizResult {
  id: string
  title: string
  score: number
  totalQuestions: number
  correctAnswers: number
  date: string
}

interface QuizResultsProps {
  results: QuizResult[]
}

export function QuizResults({ results }: QuizResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Quiz Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No quiz results yet</p>
          ) : (
            results.map((result) => (
              <div key={result.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm font-medium">
                    {result.score}% ({result.correctAnswers}/{result.totalQuestions})
                  </p>
                </div>
                <Progress
                  value={result.score}
                  className="h-2"
                  indicatorClassName={
                    result.score >= 80 ? "bg-green-500" : result.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                  }
                />
                <p className="text-xs text-muted-foreground text-right">{result.date}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
