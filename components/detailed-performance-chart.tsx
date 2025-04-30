"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
}

export function DetailedPerformanceChart({ subjectData }: DetailedPerformanceChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
        <CardDescription>Your performance across subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <SubjectBreakdown data={subjectData} />
      </CardContent>
    </Card>
  )
}

function SubjectBreakdown({ data }: { data: SubjectScore[] }) {
  return (
    <div className="space-y-6">
      {data.map((subject) => (
        <SubjectItem key={subject.subject} subject={subject} />
      ))}
    </div>
  )
}

function SubjectItem({ subject }: { subject: SubjectScore }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:underline">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span>{subject.subject}</span>
          </CollapsibleTrigger>
          <span className="text-sm font-medium">{subject.score}%</span>
        </div>
        <Progress value={subject.score} className={`h-2 w-full ${subject.color}`} />
      </div>

      <CollapsibleContent className="space-y-2 rounded-md bg-muted/50 p-3">
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
      </CollapsibleContent>
    </Collapsible>
  )
}
