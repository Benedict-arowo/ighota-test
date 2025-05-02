"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Flashcard, FlashcardSet } from "@/lib/api-client";

// Mock data for flashcards
const mockFlashcardData = {
	set: {
		id: "1",
		title: "Basic Concepts",
		description: "Fundamental concepts and definitions",
		courseId: "1",
		module: "Introduction",
		cardCount: 4,
		lastStudied: "2023-04-15T10:30:00Z",
	},
	cards: [
		{
			id: "1",
			front: "What is the capital of France?",
			back: "Paris",
			courseId: "1",
			setId: "1",
		},
		{
			id: "2",
			front: "What is the largest planet in our solar system?",
			back: "Jupiter",
			courseId: "1",
			setId: "1",
		},
		{
			id: "3",
			front: "What is the chemical symbol for gold?",
			back: "Au",
			courseId: "1",
			setId: "1",
		},
		{
			id: "4",
			front: "What is the square root of 144?",
			back: "12",
			courseId: "1",
			setId: "1",
		},
	],
};

export default function FlashcardStudyPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [loading, setLoading] = useState(true);
	const [flashcardData, setFlashcardData] = useState<{
		set: FlashcardSet;
		cards: Flashcard[];
	} | null>(null);

	const courseId = params.courseId as string;
	const setId = params.setId as string;

	useEffect(() => {
		const fetchFlashcards = async () => {
			try {
				setLoading(true);
				// In a real implementation, you would fetch the flashcards from the API
				// const data = await flashcardApi.getFlashcardSet(courseId, setId)
				// setFlashcardData(data)

				// Using mock data for now
				setFlashcardData(mockFlashcardData);
			} catch (error) {
				toast({
					title: "Error",
					description: "Failed to load flashcards",
					variant: "destructive",
				});
			} finally {
				setLoading(false);
			}
		};

		fetchFlashcards();
	}, [courseId, setId, toast]);

	const handleBack = () => {
		router.push(`/dashboard/courses/${courseId}/flashcards`);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (!flashcardData) {
		return (
			<div className="text-center py-12">
				<h2 className="text-xl font-semibold mb-2">
					Flashcard set not found
				</h2>
				<p className="text-muted-foreground mb-6">
					The flashcard set you're looking for doesn't exist or has
					been removed.
				</p>
				<Button onClick={handleBack}>Go Back</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="icon" onClick={handleBack}>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h1 className="text-2xl font-bold">Study Flashcards</h1>
			</div>

			<FlashcardDeck
				courseId={courseId}
				setId={setId}
				cards={flashcardData.cards}
				title={flashcardData.set.title}
				description={flashcardData.set.description}
			/>
		</div>
	);
}
