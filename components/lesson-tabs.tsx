"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface LessonTabsProps {
  courseId: string
  lessonId: string
}

export function LessonTabs({ courseId, lessonId }: LessonTabsProps) {
  const pathname = usePathname()

  const tabs = [
    {
      name: "Lesson",
      href: `/dashboard/courses/${courseId}/lessons/${lessonId}`,
    },
    {
      name: "Notes",
      href: `/dashboard/courses/${courseId}/lessons/${lessonId}/notes`,
    },
    {
      name: "Quizzes",
      href: `/dashboard/courses/${courseId}/lessons/${lessonId}/quizzes`,
    },
    {
      name: "Flashcards",
      href: `/dashboard/courses/${courseId}/lessons/${lessonId}/flashcards`,
    },
  ]

  return (
    <div className="border-b">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "px-3 py-2 text-sm font-medium",
                isActive ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
