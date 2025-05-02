import { Suspense } from "react";
import { FlashcardSetCard } from "@/components/flashcard-set-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock data for flashcard sets
const mockFlashcardSets = [
	{
		id: "1",
		title: "Basic Concepts",
		description: "Fundamental concepts and definitions",
		courseId: "1",
		module: "Introduction",
		cardCount: 15,
		lastStudied: "2023-04-15T10:30:00Z",
	},
	{
		id: "2",
		title: "Key Formulas",
		description: "Important formulas and equations",
		courseId: "1",
		module: "Core Principles",
		cardCount: 20,
		lastStudied: null,
	},
	{
		id: "3",
		title: "Vocabulary",
		description: "Essential terminology and definitions",
		courseId: "1",
		module: "Language",
		cardCount: 30,
		lastStudied: "2023-05-20T14:45:00Z",
	},
	{
		id: "4",
		title: "Practice Problems",
		description: "Common problem types and solutions",
		courseId: "1",
		module: "Application",
		cardCount: 12,
		lastStudied: "2023-06-10T09:15:00Z",
	},
];

export default function FlashcardsPage({
	params,
}: {
	params: { courseId: string };
}) {
	const { courseId } = params;

	// In a real implementation, you would fetch the flashcard sets from the API
	// const flashcardSets = await flashcardApi.getFlashcardSets(courseId)
	const flashcardSets = mockFlashcardSets;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" asChild>
						<Link href={`/dashboard/courses/${courseId}`}>
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<h1 className="text-2xl font-bold">Flashcards</h1>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Suspense fallback={<FlashcardSetsSkeleton />}>
					{flashcardSets.map((set) => (
						<FlashcardSetCard
							key={set.id}
							set={set}
							courseId={courseId}
						/>
					))}
				</Suspense>
			</div>
		</div>
	);
}

function FlashcardSetsSkeleton() {
	return (
		<>
			{[1, 2, 3, 4].map((i) => (
				<Card key={i} className="h-[200px]">
					<CardContent className="p-6">
						<div className="space-y-3">
							<div className="h-5 bg-muted rounded animate-pulse w-3/4" />
							<div className="h-4 bg-muted rounded animate-pulse w-full" />
							<div className="h-4 bg-muted rounded animate-pulse w-1/2" />
							<div className="h-4 bg-muted rounded animate-pulse w-2/3" />
							<div className="h-8 bg-muted rounded animate-pulse w-full mt-6" />
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
}
