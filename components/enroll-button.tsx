"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface EnrollButtonProps {
  courseId: string
  isEnrolled?: boolean
}

export function EnrollButton({ courseId, isEnrolled = false }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/auth/login?redirect=/courses/${courseId}`)
      return
    }

    setLoading(true)
    try {
      // Mock API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Successfully enrolled!",
        description: "You have been enrolled in this course.",
      })

      router.refresh()
      router.push(`/dashboard/courses/${courseId}`)
    } catch (error) {
      toast({
        title: "Failed to enroll",
        description: "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <Button asChild>
        <a href={`/dashboard/courses/${courseId}`}>Continue Learning</a>
      </Button>
    )
  }

  return (
    <Button onClick={handleEnroll} disabled={loading}>
      {loading ? "Enrolling..." : "Enroll Now"}
    </Button>
  )
}
