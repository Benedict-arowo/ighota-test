import type { UserLevel } from "@/types/gamification"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

interface XpProgressProps {
  userLevel: UserLevel
  className?: string
}

export function XpProgress({ userLevel, className }: XpProgressProps) {
  const progressPercentage = Math.round((userLevel.currentXp / userLevel.xpToNextLevel) * 100)

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-medium">Level {userLevel.level}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {userLevel.currentXp} / {userLevel.xpToNextLevel} XP
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  )
}
