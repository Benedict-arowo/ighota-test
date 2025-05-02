import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AssignmentLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
