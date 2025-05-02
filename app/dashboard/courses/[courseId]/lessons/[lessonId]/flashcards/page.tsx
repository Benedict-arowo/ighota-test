"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { LessonTabs } from "@/components/lesson-tabs";
import { Clock, BookOpen, RotateCw } from "lucide-react";

interface FlashcardSet {
	id: string;
	title: string;
	description: string;
	cardCount: number;
	estimatedTime: string;
	lastReviewed?: string;
	progress?: number;
}

export default function LessonFlashcardsPage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFlashcardSets = async () => {
			try {
				// In a real app, this would be an API call to get flashcard sets
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Simulate retrieving flashcard sets
				if (lessonId.includes("lesson-1-")) {
					setFlashcardSets([
						{
							id: "flashcards-1",
							title: "Key Concepts",
							description:
								"Review the most important concepts from this lesson.",
							cardCount: 15,
							estimatedTime: "10 minutes",
							lastReviewed: "2023-05-18",
							progress: 75,
						},
						{
							id: "flashcards-2",
							title: "Terminology",
							description:
								"Master the important terms from this lesson.",
							cardCount: 12,
							estimatedTime: "8 minutes",
						},
					]);
				} else {
					setFlashcardSets([]);
				}
			} catch (error) {
				console.error("Failed to fetch flashcard sets:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFlashcardSets();
	}, [courseId, lessonId]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">
					Loading flashcard sets...
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Flashcards
					</h1>
					<p className="text-muted-foreground">
						Review and memorize key concepts with flashcards
					</p>
				</div>
				<Button asChild variant="outline">
					<Link href={`/dashboard/courses/${courseId}`}>
						Back to Course
					</Link>
				</Button>
			</div>

			<div className="space-y-6">
				<LessonTabs courseId={courseId} lessonId={lessonId} />

				{flashcardSets.length > 0 ? (
					<div className="grid md:grid-cols-2 gap-6">
						{flashcardSets.map((set) => (
							<Card key={set.id}>
								<CardHeader>
									<CardTitle>{set.title}</CardTitle>
									<CardDescription>
										{set.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex items-center text-sm text-muted-foreground mb-4">
										<BookOpen className="mr-2 h-4 w-4" />
										<span>{set.cardCount} cards</span>
										<span className="mx-2">•</span>
										<Clock className="mr-2 h-4 w-4" />
										<span>{set.estimatedTime}</span>
									</div>

									{set.progress !== undefined && (
										<div className="mb-4">
											<div className="flex justify-between mb-1">
												<span className="text-xs text-muted-foreground">
													Progress
												</span>
												<span className="text-xs font-medium">
													{set.progress}%
												</span>
											</div>
											<div className="h-2 bg-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-primary"
													style={{
														width: `${set.progress}%`,
													}}></div>
											</div>
										</div>
									)}

									<div className="flex space-x-2">
										<Button className="flex-1" asChild>
											<Link
												href={`/dashboard/courses/${courseId}/lessons/${lessonId}/flashcards/${set.id}`}>
												{set.progress !== undefined
													? "Continue"
													: "Start"}
											</Link>
										</Button>
										{set.progress !== undefined && (
											<Button
												variant="outline"
												size="icon"
												className="aspect-square"
												asChild>
												<Link
													href={`/dashboard/courses/${courseId}/lessons/${lessonId}/flashcards/${set.id}?restart=true`}>
													<RotateCw className="h-4 w-4" />
													<span className="sr-only">
														Restart
													</span>
												</Link>
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<p className="text-muted-foreground text-center">
								No flashcard sets available for this lesson.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
