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
import { Clock } from "lucide-react";

interface Quiz {
	id: string;
	title: string;
	description: string;
	questionCount: number;
	estimatedTime: string;
	difficulty: "Easy" | "Medium" | "Hard";
}

export default function LessonQuizzesPage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				// In a real app, this would be an API call to get lesson quizzes
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Simulate retrieving quizzes
				if (lessonId.includes("lesson-1-")) {
					setQuizzes([
						{
							id: "quiz-1",
							title: "Quick Check",
							description:
								"Test your understanding of the basic concepts covered in this lesson.",
							questionCount: 5,
							estimatedTime: "5 minutes",
							difficulty: "Easy",
						},
						{
							id: "quiz-2",
							title: "Comprehensive Quiz",
							description:
								"A thorough assessment of all material covered in this lesson.",
							questionCount: 10,
							estimatedTime: "15 minutes",
							difficulty: "Medium",
						},
					]);
				} else {
					setQuizzes([]);
				}
			} catch (error) {
				console.error("Failed to fetch quizzes:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuizzes();
	}, [courseId, lessonId]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">Loading quizzes...</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Lesson Quizzes
					</h1>
					<p className="text-muted-foreground">
						Test your understanding with these quizzes
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

				{quizzes.length > 0 ? (
					<div className="grid md:grid-cols-2 gap-6">
						{quizzes.map((quiz) => (
							<Card key={quiz.id} className="overflow-hidden">
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle>{quiz.title}</CardTitle>
											<CardDescription>
												{quiz.description}
											</CardDescription>
										</div>
										<div
											className={`px-2 py-1 rounded-md text-xs font-medium ${
												quiz.difficulty === "Easy"
													? "bg-green-100 text-green-800"
													: quiz.difficulty ===
													  "Medium"
													? "bg-yellow-100 text-yellow-800"
													: "bg-red-100 text-red-800"
											}`}>
											{quiz.difficulty}
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center text-sm text-muted-foreground mb-4">
										<Clock className="mr-2 h-4 w-4" />
										<span>{quiz.estimatedTime}</span>
										<span className="mx-2">•</span>
										<span>
											{quiz.questionCount} questions
										</span>
									</div>
									<Button className="w-full" asChild>
										<Link
											href={`/dashboard/courses/${courseId}/lessons/${lessonId}/quizzes/${quiz.id}`}>
											Start Quiz
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<p className="text-muted-foreground text-center">
								No quizzes available for this lesson.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
