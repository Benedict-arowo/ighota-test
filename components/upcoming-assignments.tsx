import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "upcoming"
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
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
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">Due: {assignment.dueDate}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
