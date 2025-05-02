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
import { Clock, FileText } from "lucide-react";

interface PracticeTest {
	id: string;
	title: string;
	description: string;
	questionCount: number;
	estimatedTime: string;
	lastAttempt?: string;
	score?: number;
}

export default function LessonPracticePage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [practiceTests, setPracticeTests] = useState<PracticeTest[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPracticeTests = async () => {
			try {
				// In a real app, this would be an API call to get practice tests
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Simulate retrieving practice tests
				if (lessonId.includes("lesson-1-")) {
					setPracticeTests([
						{
							id: "practice-1",
							title: "Practice Set 1",
							description:
								"Basic practice problems to reinforce concepts.",
							questionCount: 10,
							estimatedTime: "20 minutes",
							lastAttempt: "2023-05-15",
							score: 80,
						},
						{
							id: "practice-2",
							title: "Challenge Problems",
							description:
								"Advanced problems to test deeper understanding.",
							questionCount: 5,
							estimatedTime: "30 minutes",
						},
					]);
				} else {
					setPracticeTests([]);
				}
			} catch (error) {
				console.error("Failed to fetch practice tests:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPracticeTests();
	}, [courseId, lessonId]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">
					Loading practice tests...
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Practice Tests
					</h1>
					<p className="text-muted-foreground">
						Apply your knowledge with these practice exercises
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

				{practiceTests.length > 0 ? (
					<div className="grid gap-6">
						{practiceTests.map((test) => (
							<Card key={test.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle>{test.title}</CardTitle>
											<CardDescription>
												{test.description}
											</CardDescription>
										</div>
										{test.score !== undefined && (
											<div className="px-3 py-1 rounded-md bg-green-100 text-green-800 font-medium">
												{test.score}%
											</div>
										)}
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center text-sm text-muted-foreground mb-4">
										<FileText className="mr-2 h-4 w-4" />
										<span>
											{test.questionCount} questions
										</span>
										<span className="mx-2">•</span>
										<Clock className="mr-2 h-4 w-4" />
										<span>{test.estimatedTime}</span>
										{test.lastAttempt && (
											<>
												<span className="mx-2">•</span>
												<span>
													Last attempt:{" "}
													{new Date(
														test.lastAttempt
													).toLocaleDateString()}
												</span>
											</>
										)}
									</div>
									<Button className="w-full" asChild>
										<Link
											href={`/dashboard/courses/${courseId}/lessons/${lessonId}/practice/${test.id}`}>
											{test.score !== undefined
												? "Retry"
												: "Start"}{" "}
											Practice Test
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
								No practice tests available for this lesson.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
