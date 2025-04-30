"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileText, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface NoteSection {
  id: string
  title: string
  content: string
}

export interface VideoResource {
  id: string
  title: string
  youtubeId: string
  description?: string
}

export interface CourseNotesProps {
  title: string
  description?: string
  sections: NoteSection[]
  videos: VideoResource[]
}

export function CourseNotes({ title, description, sections, videos }: CourseNotesProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([sections[0]?.id]))

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const updated = new Set(prev)
      if (updated.has(sectionId)) {
        updated.delete(sectionId)
      } else {
        updated.add(sectionId)
      }
      return updated
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Videos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="mt-4 space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="rounded-lg border">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between p-4 font-medium"
                >
                  <span>{section.title}</span>
                  {expandedSections.has(section.id) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </Button>

                {expandedSections.has(section.id) && (
                  <div className="px-4 pb-4">
                    <Separator className="mb-4" />
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="mt-4 space-y-6">
            {videos.map((video) => (
              <div key={video.id} className="space-y-3">
                <h3 className="text-lg font-medium">{video.title}</h3>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {video.description && <p className="text-sm text-muted-foreground">{video.description}</p>}
                <Separator />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
