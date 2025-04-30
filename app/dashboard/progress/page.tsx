import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Progress Tracking | Ighota",
  description: "Track your academic progress across all courses",
}

// Mock data - would come from API in real implementation
const subjectPerformance = [
  {
    subject: "Mathematics",
    score: 85,
    color: "bg-blue-500",
    subtopics: [
      { name: "Algebra", score: 92, color: "bg-blue-400" },
      { name: "Geometry", score: 78, color: "bg-blue-400" },
      { name: "Calculus", score: 85, color: "bg-blue-400" },
      { name: "Statistics", score: 88, color: "bg-blue-400" },
    ],
  },
  {
    subject: "English",
    score: 72,
    color: "bg-green-500",
    subtopics: [
      { name: "Grammar", score: 80, color: "bg-green-400" },
      { name: "Literature", score: 75, color: "bg-green-400" },
      { name: "Composition", score: 68, color: "bg-green-400" },
      { name: "Comprehension", score: 65, color: "bg-green-400" },
    ],
  },
  {
    subject: "Science",
    score: 90,
    color: "bg-purple-500",
    subtopics: [
      { name: "Biology", score: 95, color: "bg-purple-400" },
      { name: "Chemistry", score: 88, color: "bg-purple-400" },
      { name: "Physics", score: 92, color: "bg-purple-400" },
      { name: "Earth Science", score: 85, color: "bg-purple-400" },
    ],
  },
  {
    subject: "History",
    score: 65,
    color: "bg-yellow-500",
    subtopics: [
      { name: "Ancient History", score: 70, color: "bg-yellow-400" },
      { name: "Medieval History", score: 62, color: "bg-yellow-400" },
      { name: "Modern History", score: 68, color: "bg-yellow-400" },
      { name: "World Wars", score: 60, color: "bg-yellow-400" },
    ],
  },
  {
    subject: "Geography",
    score: 78,
    color: "bg-pink-500",
    subtopics: [
      { name: "Physical Geography", score: 82, color: "bg-pink-400" },
      { name: "Human Geography", score: 75, color: "bg-pink-400" },
      { name: "Cartography", score: 80, color: "bg-pink-400" },
      { name: "Environmental Geography", score: 76, color: "bg-pink-400" },
    ],
  },
]

const courseProgress = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "English Literature",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Introduction to Physics",
    progress: 20,
    totalLessons: 18,
    completedLessons: 3,
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "World History",
    progress: 60,
    totalLessons: 14,
    completedLessons: 8,
    color: "bg-yellow-500",
  },
  {
    id: "5",
    title: "Geography Fundamentals",
    progress: 85,
    totalLessons: 10,
    completedLessons: 8,
    color: "bg-pink-500",
  },
]

const timeSpent = [
  { subject: "Mathematics", hours: 24, color: "bg-blue-500" },
  { subject: "English", hours: 18, color: "bg-green-500" },
  { subject: "Science", hours: 22, color: "bg-purple-500" },
  { subject: "History", hours: 12, color: "bg-yellow-500" },
  { subject: "Geography", hours: 15, color: "bg-pink-500" },
]

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-muted-foreground">Track your academic progress across all subjects and courses</p>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="time">Time Spent</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Subject Performance</h2>
          <div className="grid gap-4">
            {subjectPerformance.map((subject) => (
              <Card key={subject.subject}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{subject.subject}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Overall Score</div>
                      <div className="text-sm font-medium">{subject.score}%</div>
                    </div>
                    <Progress value={subject.score} className="h-2" indicatorClassName={subject.color} />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Subtopics</h4>
                    {subject.subtopics.map((subtopic) => (
                      <div key={subtopic.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-xs">{subtopic.name}</div>
                          <div className="text-xs">{subtopic.score}%</div>
                        </div>
                        <Progress value={subtopic.score} className="h-1" indicatorClassName={subtopic.color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Course Progress</h2>
          <div className="grid gap-4">
            {courseProgress.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-sm font-medium">{course.progress}%</div>
                    </div>
                    <Progress value={course.progress} className="h-2" indicatorClassName={course.color} />
                    <div className="text-xs text-muted-foreground text-right">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Time Spent</h2>
          <Card>
            <CardHeader>
              <CardTitle>Study Hours by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeSpent.map((item) => (
                  <div key={item.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{item.subject}</div>
                      <div className="text-sm font-medium">{item.hours} hours</div>
                    </div>
                    <Progress
                      value={(item.hours / Math.max(...timeSpent.map((i) => i.hours))) * 100}
                      className="h-2"
                      indicatorClassName={item.color}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
