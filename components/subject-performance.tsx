"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SubtopicData {
  name: string
  score: number
  color?: string
}

interface SubjectData {
  subject: string
  score: number
  color?: string
  subtopics: SubtopicData[]
}

interface SubjectPerformanceProps {
  data: SubjectData | SubjectData[]
}

export function SubjectPerformance({ data }: SubjectPerformanceProps) {
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({})

  const toggleSubject = (subject: string) => {
    setOpenSubjects((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }))
  }

  // Convert single object to array if needed
  const subjectsArray = Array.isArray(data) ? data : [data]

  // Define color mapping for subjects
  const subjectColors = {
    Mathematics: "bg-blue-500",
    English: "bg-green-500",
    Science: "bg-purple-500",
    History: "bg-yellow-500",
    Geography: "bg-pink-500",
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Performance Analysis</h2>
        <p className="text-muted-foreground">Your performance across subjects</p>
      </div>

      <div className="space-y-6">
        {subjectsArray.map((subject) => {
          const isOpen = openSubjects[subject.subject]
          const subjectColor =
            subject.color || subjectColors[subject.subject as keyof typeof subjectColors] || "bg-yellow-400"

          return (
            <div key={subject.subject} className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSubject(subject.subject)}
                  className="flex items-center gap-2 text-base font-medium"
                >
                  {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  <span>{subject.subject}</span>
                </button>
                <span className="text-base font-medium">{subject.score}%</span>
              </div>

              <div className="relative h-2 w-full rounded-full bg-gray-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-yellow-400"
                  style={{ width: `${subject.score}%` }}
                >
                  <div className={`absolute right-0 top-0 h-full w-[15%] rounded-r-full ${subjectColor}`} />
                </div>
              </div>

              {isOpen && subject.subtopics && subject.subtopics.length > 0 && (
                <div className="mt-4 space-y-4 rounded-md bg-gray-50 p-4">
                  <div className="text-sm font-medium text-gray-500">Subtopics</div>
                  {subject.subtopics.map((subtopic) => (
                    <div key={subtopic.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{subtopic.name}</span>
                        <span>{subtopic.score}%</span>
                      </div>
                      <div className="relative h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-yellow-400"
                          style={{ width: `${subtopic.score}%` }}
                        >
                          <div className={`absolute right-0 top-0 h-full w-[15%] rounded-r-full ${subjectColor}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
