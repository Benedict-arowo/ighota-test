import type { XpActivity } from "@/types/gamification"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface XpActivityListProps {
  activities: XpActivity[]
  className?: string
}

export function XpActivityList({ activities, className }: XpActivityListProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Recent XP Activity</CardTitle>
        <CardDescription className="text-xs">Your latest XP earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-medium">+{activity.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
