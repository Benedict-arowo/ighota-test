import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface MetricsCardProps {
  title: string
  percentage: number
  completed: string
  total: string
}

export function MetricsCard({ title, percentage, completed, total }: MetricsCardProps) {
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-4xl font-bold">{percentage}%</p>
          </div>
          <Progress value={percentage} className="h-2 bg-gray-100" indicatorClassName="bg-yellow-400" />
          <div className="text-right text-sm text-muted-foreground">
            {completed}/{total} completed
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
