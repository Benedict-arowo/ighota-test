import type { UserStreak } from "@/types/gamification"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakDisplayProps {
  streak: UserStreak
  className?: string
}

export function StreakDisplay({ streak, className }: StreakDisplayProps) {
  const isActive = new Date(streak.lastActive).toDateString() === new Date().toDateString()

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
        <CardDescription className="text-xs">Keep learning daily to maintain your streak</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                isActive ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground",
              )}
            >
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak.current} days</p>
              <p className="text-xs text-muted-foreground">Longest: {streak.longest} days</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{isActive ? "Completed today" : "Not completed today"}</p>
            <p className="text-xs font-medium text-primary">
              {isActive ? "Keep it up!" : "Study today to maintain your streak"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
