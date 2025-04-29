"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PerformanceData {
  subject: string
  score: number
  color: string
}

interface PerformanceChartProps {
  subjectData: PerformanceData[]
  testTypeData: PerformanceData[]
}

export function PerformanceChart({ subjectData, testTypeData }: PerformanceChartProps) {
  const renderBarChart = (data: PerformanceData[]) => {
    return (
      <div className="mt-4 space-y-4">
        {data.map((item) => (
          <div key={item.subject} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.subject}</span>
              <span className="text-sm font-medium">{item.score}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
        <CardDescription>Your performance across subjects and test types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="subjects">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="testTypes">By Test Type</TabsTrigger>
          </TabsList>
          <TabsContent value="subjects" className="pt-4">
            {renderBarChart(subjectData)}
          </TabsContent>
          <TabsContent value="testTypes" className="pt-4">
            {renderBarChart(testTypeData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
