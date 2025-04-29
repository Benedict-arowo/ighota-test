import type { Metadata } from "next"

import { ProgressCard } from "@/components/dashboard/progress-card"
import { CourseCard } from "@/components/dashboard/course-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { UpcomingAssignments } from "@/components/dashboard/upcoming-assignments"
import { QuizResults } from "@/components/dashboard/quiz-results"

export const metadata: Metadata = {
  title: "Student Dashboard | Ighota",
  description: "Track your progress and manage your courses",
}

// Mock data - would come from API in real implementation
const overallProgress = {
  coursesCompleted: 2,
  totalCourses: 5,
  lessonsCompleted: 24,
  totalLessons: 45,
  quizzesCompleted: 12,
  totalQuizzes: 20,
  overallScore: 78,
}

const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    description: "Learn the fundamentals of mathematics including algebra, geometry, and calculus.",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    lastAccessed: "2 days ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "English Literature",
    description: "Explore classic and contemporary literature through analysis and discussion.",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    lastAccessed: "Yesterday",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Introduction to Physics",
    description: "Discover the fundamental principles of physics and how they apply to the world around us.",
    progress: 20,
    totalLessons: 18,
    completedLessons: 3,
    lastAccessed: "1 week ago",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const subjectPerformance = [
  { subject: "Mathematics", score: 85, color: "bg-blue-500" },
  { subject: "English", score: 72, color: "bg-green-500" },
  { subject: "Science", score: 90, color: "bg-purple-500" },
  { subject: "History", score: 65, color: "bg-yellow-500" },
  { subject: "Geography", score: 78, color: "bg-pink-500" },
]

const testTypePerformance = [
  { subject: "Multiple Choice", score: 88, color: "bg-blue-500" },
  { subject: "Essay", score: 70, color: "bg-green-500" },
  { subject: "Problem Solving", score: 82, color: "bg-purple-500" },
  { subject: "Short Answer", score: 75, color: "bg-yellow-500" },
]

const upcomingAssignments = [
  {
    id: "1",
    title: "Mathematics Assignment 3",
    course: "Introduction to Mathematics",
    dueDate: "Tomorrow",
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "English Essay",
    course: "English Literature",
    dueDate: "3 days",
    status: "upcoming" as const,
  },
  {
    id: "3",
    title: "Physics Lab Report",
    course: "Introduction to Physics",
    dueDate: "Yesterday",
    status: "overdue" as const,
  },
]

const quizResults = [
  {
    id: "1",
    title: "Mathematics Quiz 2",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    date: "2 days ago",
  },
  {
    id: "2",
    title: "English Vocabulary Test",
    score: 70,
    totalQuestions: 30,
    correctAnswers: 21,
    date: "1 week ago",
  },
  {
    id: "3",
    title: "Physics Principles Quiz",
    score: 90,
    totalQuestions: 15,
    correctAnswers: 13,
    date: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and manage your courses</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProgressCard
          title="Course Completion"
          value={overallProgress.coursesCompleted}
          max={overallProgress.totalCourses}
          color="bg-blue-500"
        />
        <ProgressCard
          title="Lessons Completed"
          value={overallProgress.lessonsCompleted}
          max={overallProgress.totalLessons}
          color="bg-green-500"
        />
        <ProgressCard
          title="Quizzes Completed"
          value={overallProgress.quizzesCompleted}
          max={overallProgress.totalQuizzes}
          color="bg-purple-500"
        />
        <ProgressCard title="Overall Score" value={overallProgress.overallScore} max={100} color="bg-yellow-500" />
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">My Courses</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PerformanceChart subjectData={subjectPerformance} testTypeData={testTypePerformance} />
        <div className="space-y-4">
          <UpcomingAssignments assignments={upcomingAssignments} />
          <QuizResults results={quizResults} />
        </div>
      </div>
    </div>
  )
}
