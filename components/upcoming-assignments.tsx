import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "pending"
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Check if an assignment is due soon (within 3 days)
  const isDueSoon = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No upcoming assignments</p>
          ) : (
            assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-1">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {assignment.course} • Due: {formatDate(assignment.dueDate)}
                      {isDueSoon(assignment.dueDate) && <span className="ml-1 text-red-500 font-medium">Soon!</span>}
                    </p>
                  </div>
                </div>
                <Button asChild size="sm">
                  <Link href={`/dashboard/assignments/${assignment.id}`}>View</Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
