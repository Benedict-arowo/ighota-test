import type { Achievement } from "@/types/gamification"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AchievementCardProps {
  achievement: Achievement
  className?: string
}

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt
  const hasProgress = achievement.progress !== undefined && achievement.maxProgress !== undefined
  const progressPercentage = hasProgress ? Math.round((achievement.progress! / achievement.maxProgress!) * 100) : 0

  return (
    <Card className={cn("overflow-hidden transition-all", isUnlocked ? "border-primary" : "opacity-75", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{achievement.title}</CardTitle>
          <div className="rounded-full bg-muted p-1">
            <div
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center",
                isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground",
              )}
              dangerouslySetInnerHTML={{ __html: achievement.icon }}
            />
          </div>
        </div>
        <CardDescription className="text-xs">{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasProgress && (
          <div className="space-y-1">
            <Progress value={progressPercentage} className="h-1" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {achievement.progress} / {achievement.maxProgress}
              </span>
              <span>{progressPercentage}%</span>
            </div>
          </div>
        )}
      </CardContent>
      {isUnlocked && (
        <CardFooter className="pt-1 pb-2">
          <p className="text-xs text-muted-foreground">
            Unlocked on {new Date(achievement.unlockedAt!).toLocaleDateString()}
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
