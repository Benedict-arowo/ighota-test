"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, FileText, CheckCircle } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  content: string
  videoUrl?: string
  attachments?: Array<{
    id: string
    name: string
    url: string
    type: string
  }>
  completed?: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

// Mock data - in a real app, this would come from an API
const courseLessons = {
  "mathematics-wassce": [
    {
      id: "module-1",
      title: "Number and Numeration",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Introduction to Number Bases",
          description: "Learn about different number systems and how to convert between them.",
          content: `
            <div class="prose dark:prose-invert max-w-none">
              <h2>Introduction to Number Bases</h2>
              <p>A number base (or radix) is the number of digits or symbols used to represent numbers in a positional numeral system. The most common base is base 10 (decimal), which uses the digits 0-9.</p>
              
              <h3>Common Number Bases</h3>
              <ul>
                <li><strong>Base 2 (Binary):</strong> Uses digits 0 and 1</li>
                <li><strong>Base 8 (Octal):</strong> Uses digits 0-7</li>
                <li><strong>Base 10 (Decimal):</strong> Uses digits 0-9</li>
                <li><strong>Base 16 (Hexadecimal):</strong> Uses digits 0-9 and letters A-F</li>
              </ul>
              
              <h3>Converting Between Bases</h3>
              <p>To convert a number from one base to another, you can follow these steps:</p>
              
              <h4>Converting from any base to decimal (base 10)</h4>
              <p>Multiply each digit by its place value and sum the results.</p>
              
              <div class="bg-muted p-4 rounded-md my-4">
                <p class="font-mono">Example: Convert binary 1011 to decimal</p>
                <p>1 × 2³ + 0 × 2² + 1 × 2¹ + 1 × 2⁰</p>
                <p>= 8 + 0 + 2 + 1</p>
                <p>= 11</p>
              </div>
              
              <h4>Converting from decimal to any base</h4>
              <p>Divide the decimal number by the target base repeatedly, noting the remainders. The remainders, read from bottom to top, form the result.</p>
              
              <div class="bg-muted p-4 rounded-md my-4">
                <p class="font-mono">Example: Convert decimal 25 to binary</p>
                <p>25 ÷ 2 = 12 remainder 1</p>
                <p>12 ÷ 2 = 6 remainder 0</p>
                <p>6 ÷ 2 = 3 remainder 0</p>
                <p>3 ÷ 2 = 1 remainder 1</p>
                <p>1 ÷ 2 = 0 remainder 1</p>
                <p>Reading from bottom to top: 11001</p>
              </div>
              
              <h3>Practice Problems</h3>
              <ol>
                <li>Convert binary 10110 to decimal.</li>
                <li>Convert decimal 47 to binary.</li>
                <li>Convert hexadecimal 2F to decimal.</li>
                <li>Convert decimal 100 to octal.</li>
              </ol>
              
              <div class="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md my-4">
                <p class="font-medium">Important Note:</p>
                <p>Understanding number bases is crucial for computer science and digital electronics. Binary is the foundation of all computing systems.</p>
              </div>
            </div>
          `,
          videoUrl: "https://www.youtube.com/embed/ku4KOFQ-bB4",
          attachments: [
            {
              id: "att-1",
              name: "Number Bases Cheat Sheet",
              url: "#",
              type: "pdf",
            },
            {
              id: "att-2",
              name: "Practice Problems",
              url: "#",
              type: "pdf",
            },
          ],
        },
        {
          id: "lesson-1-2",
          title: "Modular Arithmetic",
          description: "Understand the principles of modular arithmetic and its applications.",
          content: `
            <div class="prose dark:prose-invert max-w-none">
              <h2>Modular Arithmetic</h2>
              <p>Modular arithmetic is a system of arithmetic for integers, where numbers "wrap around" after reaching a certain value—the modulus.</p>
              
              <h3>Basic Concept</h3>
              <p>In modular arithmetic, we say that two numbers are congruent modulo n if they have the same remainder when divided by n.</p>
              
              <div class="bg-muted p-4 rounded-md my-4">
                <p class="font-mono">Example: 17 ≡ 5 (mod 12)</p>
                <p>This means that 17 and 5 have the same remainder when divided by 12.</p>
                <p>17 ÷ 12 = 1 remainder 5</p>
                <p>5 ÷ 12 = 0 remainder 5</p>
              </div>
              
              <h3>Applications</h3>
              <ul>
                <li><strong>Clock Arithmetic:</strong> A 12-hour clock uses modulo 12 arithmetic.</li>
                <li><strong>Cryptography:</strong> Many encryption algorithms rely on modular arithmetic.</li>
                <li><strong>Computer Science:</strong> Used in hashing functions and random number generation.</li>
              </ul>
              
              <h3>Properties of Modular Arithmetic</h3>
              <p>For any integers a, b, and positive integer n:</p>
              <ul>
                <li>If a ≡ b (mod n), then a + c ≡ b + c (mod n) for any integer c.</li>
                <li>If a ≡ b (mod n), then ac ≡ bc (mod n) for any integer c.</li>
              </ul>
              
              <h3>Practice Problems</h3>
              <ol>
                <li>Calculate 23 mod 5.</li>
                <li>Find the remainder when 47 is divided by 7.</li>
                <li>If the time is 10 o'clock, what time will it be after 15 hours?</li>
              </ol>
            </div>
          `,
        },
      ],
    },
    {
      id: "module-2",
      title: "Algebra",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Algebraic Expressions",
          description: "Learn how to work with algebraic expressions and simplify them.",
          content: `
            <div class="prose dark:prose-invert max-w-none">
              <h2>Algebraic Expressions</h2>
              <p>An algebraic expression is a combination of variables, numbers, and operations. Understanding how to manipulate these expressions is fundamental to algebra.</p>
              
              <h3>Components of Algebraic Expressions</h3>
              <ul>
                <li><strong>Variables:</strong> Letters that represent unknown values (e.g., x, y, z)</li>
                <li><strong>Coefficients:</strong> Numbers that multiply variables (e.g., 5 in 5x)</li>
                <li><strong>Constants:</strong> Numbers without variables (e.g., 7 in 3x + 7)</li>
                <li><strong>Terms:</strong> Parts of an expression separated by + or - signs</li>
              </ul>
              
              <h3>Simplifying Algebraic Expressions</h3>
              <p>To simplify an algebraic expression:</p>
              <ol>
                <li>Combine like terms (terms with the same variables raised to the same powers)</li>
                <li>Apply the distributive property where needed</li>
                <li>Simplify numerical expressions using order of operations</li>
              </ol>
              
              <div class="bg-muted p-4 rounded-md my-4">
                <p class="font-mono">Example: Simplify 3x + 2y - 5x + 4y + 2</p>
                <p>Combine like terms:</p>
                <p>3x - 5x = -2x</p>
                <p>2y + 4y = 6y</p>
                <p>Result: -2x + 6y + 2</p>
              </div>
              
              <h3>Practice Problems</h3>
              <ol>
                <li>Simplify: 7a + 3b - 4a + 5b</li>
                <li>Simplify: 2(x + 3) - 4(2x - 1)</li>
                <li>Simplify: 3(2x + 4) + 2(x - 3)</li>
              </ol>
            </div>
          `,
        },
      ],
    },
  ],
  "english-wassce": [
    {
      id: "module-1",
      title: "Grammar",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Parts of Speech",
          description: "Learn about the different parts of speech in English grammar.",
          content: `
            <div class="prose dark:prose-invert max-w-none">
              <h2>Parts of Speech</h2>
              <p>Parts of speech are categories of words based on their function in a sentence. Understanding these categories helps in constructing grammatically correct sentences.</p>
              
              <h3>The Eight Parts of Speech</h3>
              
              <h4>1. Nouns</h4>
              <p>Nouns name people, places, things, or ideas.</p>
              <p><em>Examples:</em> teacher, London, book, happiness</p>
              
              <h4>2. Pronouns</h4>
              <p>Pronouns replace nouns to avoid repetition.</p>
              <p><em>Examples:</em> I, you, he, she, it, we, they</p>
              
              <h4>3. Verbs</h4>
              <p>Verbs express actions, states, or occurrences.</p>
              <p><em>Examples:</em> run, think, is, become</p>
              
              <h4>4. Adjectives</h4>
              <p>Adjectives modify or describe nouns and pronouns.</p>
              <p><em>Examples:</em> happy, tall, blue, five</p>
              
              <h4>5. Adverbs</h4>
              <p>Adverbs modify verbs, adjectives, or other adverbs.</p>
              <p><em>Examples:</em> quickly, very, well, tomorrow</p>
              
              <h4>6. Prepositions</h4>
              <p>Prepositions show relationships between nouns/pronouns and other words in a sentence.</p>
              <p><em>Examples:</em> in, on, at, by, with</p>
              
              <h4>7. Conjunctions</h4>
              <p>Conjunctions connect words, phrases, or clauses.</p>
              <p><em>Examples:</em> and, but, or, because</p>
              
              <h4>8. Interjections</h4>
              <p>Interjections express strong emotions or surprise.</p>
              <p><em>Examples:</em> Oh!, Wow!, Ouch!</p>
              
              <h3>Practice Exercise</h3>
              <p>Identify the parts of speech for each word in the following sentence:</p>
              <p>"The excited children quickly ran to the colorful playground."</p>
            </div>
          `,
        },
      ],
    },
  ],
  "biology-jamb": [
    {
      id: "module-1",
      title: "Cell Structure and Organization",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Cell Theory and Structure",
          description: "Learn about the fundamental principles of cell theory and cell structure.",
          content: `
            <div class="prose dark:prose-invert max-w-none">
              <h2>Cell Theory and Structure</h2>
              <p>The cell theory is one of the fundamental concepts in biology. It states that:</p>
              <ol>
                <li>All living organisms are composed of one or more cells.</li>
                <li>The cell is the basic unit of life.</li>
                <li>All cells arise from pre-existing cells.</li>
              </ol>
              
              <h3>Types of Cells</h3>
              <p>There are two main types of cells:</p>
              
              <h4>1. Prokaryotic Cells</h4>
              <ul>
                <li>No true nucleus (DNA is not enclosed in a nuclear membrane)</li>
                <li>No membrane-bound organelles</li>
                <li>Smaller in size (typically 0.1-5.0 μm)</li>
                <li>Examples: bacteria and archaea</li>
              </ul>
              
              <h4>2. Eukaryotic Cells</h4>
              <ul>
                <li>Contains a true nucleus (DNA enclosed in a nuclear membrane)</li>
                <li>Contains membrane-bound organelles</li>
                <li>Larger in size (typically 10-100 μm)</li>
                <li>Examples: plant cells, animal cells, fungi, and protists</li>
              </ul>
              
              <h3>Cell Organelles and Their Functions</h3>
              
              <h4>Nucleus</h4>
              <p>The control center of the cell, containing DNA organized into chromosomes.</p>
              
              <h4>Mitochondria</h4>
              <p>The powerhouse of the cell, responsible for cellular respiration and ATP production.</p>
              
              <h4>Chloroplasts</h4>
              <p>Found in plant cells, responsible for photosynthesis.</p>
              
              <h4>Endoplasmic Reticulum (ER)</h4>
              <p>A network of membranes involved in protein synthesis (rough ER) and lipid synthesis (smooth ER).</p>
              
              <h4>Golgi Apparatus</h4>
              <p>Modifies, sorts, and packages proteins for secretion or use within the cell.</p>
              
              <h4>Lysosomes</h4>
              <p>Contain digestive enzymes for breaking down waste materials and cellular debris.</p>
              
              <h4>Ribosomes</h4>
              <p>Sites of protein synthesis.</p>
              
              <h3>Practice Questions</h3>
              <ol>
                <li>Compare and contrast prokaryotic and eukaryotic cells.</li>
                <li>Explain the role of the mitochondria in cellular respiration.</li>
                <li>Why are chloroplasts found only in plant cells and not in animal cells?</li>
              </ol>
            </div>
          `,
        },
      ],
    },
  ],
}

export default function LessonPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [nextLesson, setNextLesson] = useState<{ moduleId: string; lessonId: string } | null>(null)
  const [prevLesson, setPrevLesson] = useState<{ moduleId: string; lessonId: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const courseLessonData = courseLessons[courseId]
        if (!courseLessonData) {
          notFound()
        }

        // Find the current lesson and its module
        let foundLesson: Lesson | null = null
        let foundModule: Module | null = null
        let nextLessonData = null
        let prevLessonData = null

        // Find all lessons to determine next/prev
        const allLessons: Array<{ moduleId: string; moduleIndex: number; lessonId: string; lessonIndex: number }> = []

        courseLessonData.forEach((module, moduleIndex) => {
          module.lessons.forEach((lesson, lessonIndex) => {
            allLessons.push({
              moduleId: module.id,
              moduleIndex,
              lessonId: lesson.id,
              lessonIndex,
            })

            if (lesson.id === lessonId) {
              foundLesson = lesson
              foundModule = module
            }
          })
        })

        // If lesson not found
        if (!foundLesson || !foundModule) {
          notFound()
        }

        // Find current lesson index in the flat array
        const currentIndex = allLessons.findIndex((item) => item.lessonId === lessonId)

        // Set next lesson if available
        if (currentIndex < allLessons.length - 1) {
          const next = allLessons[currentIndex + 1]
          nextLessonData = {
            moduleId: next.moduleId,
            lessonId: next.lessonId,
          }
        }

        // Set previous lesson if available
        if (currentIndex > 0) {
          const prev = allLessons[currentIndex - 1]
          prevLessonData = {
            moduleId: prev.moduleId,
            lessonId: prev.lessonId,
          }
        }

        setCurrentLesson(foundLesson)
        setCurrentModule(foundModule)
        setNextLesson(nextLessonData)
        setPrevLesson(prevLessonData)
        setIsCompleted(!!foundLesson.completed)
      } catch (error) {
        console.error("Failed to fetch lesson:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    fetchLessonData()
  }, [courseId, lessonId])

  const markAsCompleted = () => {
    // In a real app, this would be an API call to update the lesson status
    setIsCompleted(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading lesson content...</p>
      </div>
    )
  }

  if (!currentLesson || !currentModule) {
    return notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentLesson.title}</h1>
          <p className="text-muted-foreground">
            {currentModule.title} • {currentLesson.description}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/courses/${courseId}`}>Back to Course</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentLesson.videoUrl && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />

          {currentLesson.attachments && currentLesson.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Attachments</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {currentLesson.attachments.map((attachment) => (
                  <Card key={attachment.id} className="flex items-center p-4">
                    <FileText className="h-8 w-8 text-primary mr-4" />
                    <div className="flex-1">
                      <h4 className="font-medium">{attachment.name}</h4>
                      <p className="text-sm text-muted-foreground">{attachment.type.toUpperCase()}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={attachment.url}>Download</Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          {prevLesson ? (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/courses/${courseId}/lessons/${prevLesson.lessonId}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
          )}

          {nextLesson ? (
            <Button asChild>
              <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson.lessonId}`}>
                Next Lesson
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button disabled>
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button
          variant={isCompleted ? "outline" : "default"}
          className={
            isCompleted
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 border-green-200 dark:border-green-900"
              : ""
          }
          onClick={markAsCompleted}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>
    </div>
  )
}
