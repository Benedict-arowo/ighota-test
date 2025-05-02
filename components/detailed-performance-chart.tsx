"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SubtopicScore {
  name: string
  score: number
  color: string
}

interface SubjectScore {
  subject: string
  score: number
  color: string
  subtopics: SubtopicScore[]
}

interface DetailedPerformanceChartProps {
  subjectData: SubjectScore[]
  loading?: boolean
}

export function DetailedPerformanceChart({ subjectData, loading = false }: DetailedPerformanceChartProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-2 bg-muted rounded animate-pulse" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-1">
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-2 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {subjectData.map((subject) => (
        <SubjectItem key={subject.subject} subject={subject} />
      ))}
    </div>
  )
}

function SubjectItem({ subject }: { subject: SubjectScore }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span>{subject.subject}</span>
          </button>
          <span className="text-sm font-medium">{subject.score}%</span>
        </div>
        <Progress value={subject.score} className={`h-2 w-full ${subject.color}`} />
      </div>

      {isOpen && (
        <div className="space-y-2 rounded-md bg-muted/50 p-3">
          <div className="text-xs font-medium text-muted-foreground">Subtopics</div>
          {subject.subtopics.map((subtopic) => (
            <div key={subtopic.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{subtopic.name}</span>
                <span>{subtopic.score}%</span>
              </div>
              <Progress value={subtopic.score} className={`h-1.5 w-full ${subtopic.color}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
