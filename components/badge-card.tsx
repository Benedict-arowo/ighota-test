import type { Badge as BadgeType } from "@/types/gamification"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BadgeCardProps {
  badge: BadgeType
  className?: string
}

const rarityColors = {
  common: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  uncommon: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
  rare: "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  epic: "bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200",
  legendary: "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200",
}

export function BadgeCard({ badge, className }: BadgeCardProps) {
  const isEarned = !!badge.earnedAt

  return (
    <Card className={cn("overflow-hidden transition-all", isEarned ? "" : "opacity-50 grayscale", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{badge.name}</CardTitle>
          <Badge className={cn(rarityColors[badge.rarity], "capitalize")}>{badge.rarity}</Badge>
        </div>
        <CardDescription className="text-xs">{badge.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-4">
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: badge.icon }}
        />
      </CardContent>
      {isEarned && (
        <CardFooter className="pt-1 pb-2">
          <p className="text-xs text-muted-foreground">Earned on {new Date(badge.earnedAt!).toLocaleDateString()}</p>
        </CardFooter>
      )}
    </Card>
  )
}
