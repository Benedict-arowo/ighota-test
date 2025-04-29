import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  title: string
  value: number
  max: number
  color?: string
}

export function ProgressCard({ title, value, max, color = "bg-primary" }: ProgressCardProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{percentage}%</div>
          <div className="text-xs text-muted-foreground">
            {value}/{max} completed
          </div>
        </div>
        <Progress value={percentage} className="mt-2 h-2" indicatorClassName={color} />
      </CardContent>
    </Card>
  )
}
