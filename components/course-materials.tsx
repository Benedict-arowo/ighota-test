import Link from "next/link"
import { FileText, Video, Download, CheckCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Material {
  id: string
  title: string
  type: "video" | "document" | "download"
  url: string
  duration?: string
  completed?: boolean
}

interface CourseMaterialsProps {
  materials: Material[]
  title: string
}

export function CourseMaterials({ materials, title }: CourseMaterialsProps) {
  const getIcon = (type: Material["type"]) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "download":
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {getIcon(material.type)}
                </div>
                <div>
                  <p className="font-medium">{material.title}</p>
                  {material.duration && <p className="text-xs text-muted-foreground">{material.duration}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {material.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                <Button asChild size="sm" variant="outline">
                  <Link href={material.url}>{material.type === "download" ? "Download" : "View"}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
