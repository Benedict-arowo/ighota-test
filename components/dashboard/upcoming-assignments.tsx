import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "upcoming" | "overdue" | "completed"
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "overdue":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return ""
    }
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
              <div key={assignment.id} className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{assignment.dueDate}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
