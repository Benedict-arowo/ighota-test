"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	AlertCircle,
	ArrowLeft,
	Calendar,
	CheckCircle,
	Clock,
	FileText,
	Upload,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Question {
	id: string;
	type: "multiple-choice" | "short-answer" | "essay" | "file-upload";
	question: string;
	options?: string[];
	answer?: string | string[] | File;
	points: number;
}

interface Assignment {
	id: string;
	title: string;
	course: string;
	courseId: string;
	description: string;
	dueDate: string;
	status: "pending" | "submitted" | "graded";
	progress: number;
	score?: number;
	feedback?: string;
	questions: Question[];
	submittedAt?: string;
	timeSpent?: number;
}

export default function AssignmentPage() {
	const params = useParams();
	const router = useRouter();
	const assignmentId = params.assignmentId as string;

	const [assignment, setAssignment] = useState<Assignment | null>(null);
	const [answers, setAnswers] = useState<
		Record<string, string | string[] | File>
	>({});
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [activeTab, setActiveTab] = useState("questions");
	const [timeSpent, setTimeSpent] = useState(0);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const fetchAssignment = async () => {
			try {
				// In a real app, this would be an API call
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Mock data based on assignmentId
				let mockAssignment: Assignment | null = null;

				if (assignmentId === "assignment-1") {
					mockAssignment = {
						id: "assignment-1",
						title: "Number Bases and Modular Arithmetic",
						course: "Mathematics",
						courseId: "mathematics-wassce",
						description:
							"This assignment tests your understanding of number bases and modular arithmetic concepts.",
						dueDate: "2023-05-15T23:59:59Z",
						status: "submitted",
						progress: 100,
						submittedAt: "2023-05-14T14:30:00Z",
						timeSpent: 45 * 60, // 45 minutes in seconds
						questions: [
							{
								id: "q1",
								type: "multiple-choice",
								question:
									"Convert the decimal number 27 to binary.",
								options: ["11011", "10111", "11101", "11001"],
								answer: "11011",
								points: 5,
							},
							{
								id: "q2",
								type: "multiple-choice",
								question: "What is 37 mod 5?",
								options: ["0", "1", "2", "3", "4"],
								answer: "2",
								points: 5,
							},
							{
								id: "q3",
								type: "short-answer",
								question:
									"Convert the hexadecimal number A7 to decimal.",
								answer: "167",
								points: 10,
							},
							{
								id: "q4",
								type: "essay",
								question:
									"Explain the concept of modular arithmetic and provide a real-world example of its application.",
								answer: "Modular arithmetic is a system of arithmetic for integers, where numbers wrap around when reaching a certain value, called the modulus. A real-world example is a 12-hour clock, which works on modulo 12. After 12, the hours start again from 1, effectively performing arithmetic modulo 12.",
								points: 15,
							},
						],
					};
				} else if (assignmentId === "assignment-2") {
					mockAssignment = {
						id: "assignment-2",
						title: "Algebraic Expressions",
						course: "Mathematics",
						courseId: "mathematics-wassce",
						description:
							"This assignment tests your understanding of algebraic expressions and equations.",
						dueDate: "2023-05-20T23:59:59Z",
						status: "graded",
						progress: 100,
						score: 85,
						submittedAt: "2023-05-19T16:45:00Z",
						timeSpent: 55 * 60, // 55 minutes in seconds
						feedback:
							"Good work! You demonstrated a strong understanding of algebraic expressions. However, you could improve on factorization techniques.",
						questions: [
							{
								id: "q1",
								type: "multiple-choice",
								question:
									"Simplify the expression: 3(x + 2) - 2(x - 1)",
								options: ["x + 8", "x + 4", "5x + 4", "x + 5"],
								answer: "x + 8",
								points: 5,
							},
							{
								id: "q2",
								type: "multiple-choice",
								question: "Factor the expression: x² - 9",
								options: [
									"(x - 3)(x + 3)",
									"(x - 3)²",
									"(x + 3)²",
									"(x - 9)(x + 1)",
								],
								answer: "(x - 3)(x + 3)",
								points: 5,
							},
							{
								id: "q3",
								type: "short-answer",
								question: "Solve for x: 2x - 5 = 11",
								answer: "8",
								points: 10,
							},
							{
								id: "q4",
								type: "essay",
								question:
									"Explain the difference between an expression and an equation, and provide examples of each.",
								answer: "An algebraic expression is a combination of variables, numbers, and operations without an equals sign. For example, 3x + 2y is an expression. An equation, on the other hand, is a statement that two expressions are equal, indicated by an equals sign. For example, 3x + 2y = 10 is an equation. Expressions can be simplified or evaluated, while equations can be solved to find the value(s) of the variable(s).",
								points: 15,
							},
						],
					};
				} else if (assignmentId === "assignment-3") {
					mockAssignment = {
						id: "assignment-3",
						title: "Essay Writing: Argumentative Essay",
						course: "English Language",
						courseId: "english-wassce",
						description:
							"Write an argumentative essay on the given topic, following the guidelines provided.",
						dueDate: "2023-05-25T23:59:59Z",
						status: "pending",
						progress: 30,
						questions: [
							{
								id: "q1",
								type: "essay",
								question:
									"Write an argumentative essay on the topic: 'Should social media be regulated by governments?' Your essay should be between 500-700 words and include a clear thesis statement, supporting arguments, counterarguments, and a conclusion.",
								answer: "Social media has become an integral part of modern life, connecting people across the globe and providing platforms for expression. However, the question of whether governments should regulate these platforms is complex and multifaceted...",
								points: 50,
							},
							{
								id: "q2",
								type: "file-upload",
								question:
									"Upload your essay as a PDF or Word document. Make sure your name and ID are included in the header.",
								points: 0, // No additional points, just for submission
							},
						],
					};
				} else if (assignmentId === "assignment-4") {
					mockAssignment = {
						id: "assignment-4",
						title: "Cell Biology Quiz",
						course: "Biology",
						courseId: "biology-jamb",
						description:
							"This quiz tests your knowledge of cell biology concepts.",
						dueDate: "2023-05-10T23:59:59Z",
						status: "pending",
						progress: 0,
						questions: [
							{
								id: "q1",
								type: "multiple-choice",
								question:
									"Which organelle is known as the 'powerhouse' of the cell?",
								options: [
									"Nucleus",
									"Mitochondria",
									"Golgi Apparatus",
									"Endoplasmic Reticulum",
								],
								points: 5,
							},
							{
								id: "q2",
								type: "multiple-choice",
								question:
									"Which of the following is NOT a function of the cell membrane?",
								options: [
									"Protection",
									"Transport",
									"Energy production",
									"Cell recognition",
								],
								points: 5,
							},
							{
								id: "q3",
								type: "short-answer",
								question:
									"Name the process by which cells divide to form two identical daughter cells.",
								points: 10,
							},
							{
								id: "q4",
								type: "essay",
								question:
									"Compare and contrast prokaryotic and eukaryotic cells, highlighting at least three major differences.",
								points: 15,
							},
						],
					};
				} else if (assignmentId === "assignment-5") {
					mockAssignment = {
						id: "assignment-5",
						title: "Geometry: Circles and Triangles",
						course: "Mathematics",
						courseId: "mathematics-wassce",
						description:
							"This assignment tests your understanding of geometric principles related to circles and triangles.",
						dueDate: "2023-06-05T23:59:59Z",
						status: "pending",
						progress: 0,
						questions: [
							{
								id: "q1",
								type: "multiple-choice",
								question:
									"What is the formula for the area of a circle?",
								options: ["πr²", "2πr", "πd", "πr²/2"],
								points: 5,
							},
							{
								id: "q2",
								type: "multiple-choice",
								question:
									"In a right-angled triangle, which theorem relates the squares of the sides?",
								options: [
									"Pythagorean theorem",
									"Law of sines",
									"Law of cosines",
									"Angle bisector theorem",
								],
								points: 5,
							},
							{
								id: "q3",
								type: "short-answer",
								question:
									"Calculate the area of a triangle with base 8 cm and height 6 cm.",
								points: 10,
							},
							{
								id: "q4",
								type: "essay",
								question:
									"Explain the relationship between the inscribed angle and the central angle that subtend the same arc in a circle. Provide a proof or detailed explanation.",
								points: 15,
							},
						],
					};
				} else {
					// If assignment not found
					router.push("/dashboard/assignments");
					return;
				}

				setAssignment(mockAssignment);

				// Initialize answers from existing answers if any
				if (mockAssignment.questions) {
					const initialAnswers: Record<
						string,
						string | string[] | File
					> = {};
					mockAssignment.questions.forEach((q) => {
						if (q.answer) {
							initialAnswers[q.id] = q.answer;
						}
					});
					setAnswers(initialAnswers);
				}

				// Start timer if assignment is pending
				if (mockAssignment.status === "pending") {
					startTimer(mockAssignment.timeSpent || 0);
				} else if (mockAssignment.timeSpent) {
					setTimeSpent(mockAssignment.timeSpent);
				}
			} catch (error) {
				console.error("Failed to fetch assignment:", error);
				router.push("/dashboard/assignments");
			} finally {
				setIsLoading(false);
			}
		};

		fetchAssignment();

		// Cleanup timer on unmount
		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [assignmentId, router]);

	const startTimer = (initialTime: number) => {
		setTimeSpent(initialTime);
		const intervalId = setInterval(() => {
			setTimeSpent((prev) => prev + 1);
		}, 1000);
		setTimer(intervalId);
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleAnswerChange = (
		questionId: string,
		value: string | string[] | File
	) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));

		// Update progress
		// if (assignment) {  (
		//   ...prev,
		//   [questionId]: value,))

		// Update progress
		if (assignment) {
			const totalQuestions = assignment.questions.length;
			const answeredQuestions = Object.keys(answers).length;
			const newProgress = Math.round(
				(answeredQuestions / totalQuestions) * 100
			);

			// Only update if progress has changed
			if (newProgress !== assignment.progress) {
				setAssignment({
					...assignment,
					progress: newProgress,
				});
			}
		}
	};

	const handleFileUpload = (
		questionId: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			setAnswers((prev) => ({
				...prev,
				[questionId]: file,
			}));
		}
	};

	const handleSubmit = async () => {
		if (!assignment) return;

		setIsSubmitting(true);

		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Stop the timer
			if (timer) {
				clearInterval(timer);
				setTimer(null);
			}

			// Update assignment status
			setAssignment({
				...assignment,
				status: "submitted",
				progress: 100,
				submittedAt: new Date().toISOString(),
				timeSpent: timeSpent,
			});

			// Show success message and redirect after a delay
			setTimeout(() => {
				router.push("/dashboard/assignments");
			}, 2000);
		} catch (error) {
			console.error("Failed to submit assignment:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSaveDraft = async () => {
		if (!assignment) return;

		setIsSubmitting(true);

		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Update assignment with current progress
			setAssignment({
				...assignment,
				timeSpent: timeSpent,
			});

			// Show success message
			alert("Draft saved successfully!");
		} catch (error) {
			console.error("Failed to save draft:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isPastDue = (dueDate: string) => {
		const now = new Date();
		const due = new Date(dueDate);
		return now > due;
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">
					Loading assignment...
				</p>
			</div>
		);
	}

	if (!assignment) {
		return (
			<div className="text-center py-12">
				<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
					<FileText className="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 className="text-lg font-medium mb-2">
					Assignment not found
				</h3>
				<p className="text-muted-foreground mb-4">
					The assignment you're looking for doesn't exist or has been
					removed.
				</p>
				<Button asChild>
					<Link href="/dashboard/assignments">
						Back to Assignments
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" asChild>
						<Link href="/dashboard/assignments">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							{assignment.title}
						</h1>
						<p className="text-muted-foreground">
							{assignment.course}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{assignment.status === "pending" && (
						<>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Clock className="h-4 w-4" />
								<span>{formatTime(timeSpent)}</span>
							</div>
							<Button
								variant="outline"
								onClick={handleSaveDraft}
								disabled={isSubmitting}>
								Save Draft
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={isSubmitting}>
								{isSubmitting
									? "Submitting..."
									: "Submit Assignment"}
							</Button>
						</>
					)}
					{assignment.status === "submitted" && (
						<Badge
							variant="outline"
							className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
							Submitted
						</Badge>
					)}
					{assignment.status === "graded" && (
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
								Graded
							</Badge>
							<span className="text-sm font-medium">
								Score: {assignment.score}%
							</span>
						</div>
					)}
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Assignment Details</CardTitle>
					<CardDescription>{assignment.description}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm">
								Due: {formatDate(assignment.dueDate)}
								{isPastDue(assignment.dueDate) &&
									assignment.status === "pending" && (
										<span className="ml-2 text-red-500 font-medium">
											Past due!
										</span>
									)}
							</span>
						</div>
						{assignment.submittedAt && (
							<div className="flex items-center gap-2">
								<Upload className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">
									Submitted:{" "}
									{formatDate(assignment.submittedAt)}
								</span>
							</div>
						)}
					</div>

					{assignment.status === "pending" && (
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Progress</span>
								<span>{assignment.progress}%</span>
							</div>
							<Progress
								value={assignment.progress}
								className="h-2"
							/>
						</div>
					)}

					{isPastDue(assignment.dueDate) &&
						assignment.status === "pending" && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>Assignment Past Due</AlertTitle>
								<AlertDescription>
									This assignment was due on{" "}
									{formatDate(assignment.dueDate)}. You can
									still submit it, but it may be marked as
									late.
								</AlertDescription>
							</Alert>
						)}
				</CardContent>
			</Card>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full">
				<TabsList className="grid w-full grid-cols-2 mb-8">
					<TabsTrigger value="questions">Questions</TabsTrigger>
					{(assignment.status === "submitted" ||
						assignment.status === "graded") && (
						<TabsTrigger value="submission">
							Submission & Feedback
						</TabsTrigger>
					)}
				</TabsList>

				<TabsContent value="questions" className="space-y-6">
					{assignment.questions.map((question, index) => (
						<Card key={question.id}>
							<CardHeader>
								<CardTitle className="text-lg">
									Question {index + 1}{" "}
									<span className="text-sm font-normal">
										({question.points} points)
									</span>
								</CardTitle>
								<CardDescription>
									{question.question}
								</CardDescription>
							</CardHeader>
							<CardContent>
								{question.type === "multiple-choice" &&
									question.options && (
										<div className="space-y-3">
											{question.options.map(
												(option, optIndex) => (
													<div
														key={optIndex}
														className="flex items-center space-x-2">
														<input
															type="radio"
															id={`${question.id}-${optIndex}`}
															name={question.id}
															value={option}
															checked={
																answers[
																	question.id
																] === option
															}
															onChange={() =>
																handleAnswerChange(
																	question.id,
																	option
																)
															}
															disabled={
																assignment.status !==
																"pending"
															}
															className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
														/>
														<Label
															htmlFor={`${question.id}-${optIndex}`}>
															{option}
														</Label>
													</div>
												)
											)}
										</div>
									)}

								{question.type === "short-answer" && (
									<div className="space-y-2">
										<Label htmlFor={question.id}>
											Your Answer
										</Label>
										<Input
											id={question.id}
											value={
												(answers[
													question.id
												] as string) || ""
											}
											onChange={(e) =>
												handleAnswerChange(
													question.id,
													e.target.value
												)
											}
											disabled={
												assignment.status !== "pending"
											}
											placeholder="Type your answer here..."
										/>
									</div>
								)}

								{question.type === "essay" && (
									<div className="space-y-2">
										<Label htmlFor={question.id}>
											Your Answer
										</Label>
										<Textarea
											id={question.id}
											value={
												(answers[
													question.id
												] as string) || ""
											}
											onChange={(e) =>
												handleAnswerChange(
													question.id,
													e.target.value
												)
											}
											disabled={
												assignment.status !== "pending"
											}
											placeholder="Type your essay here..."
											className="min-h-[200px]"
										/>
									</div>
								)}

								{question.type === "file-upload" && (
									<div className="space-y-2">
										<Label htmlFor={question.id}>
											Upload File
										</Label>
										<Input
											id={question.id}
											type="file"
											onChange={(e) =>
												handleFileUpload(question.id, e)
											}
											disabled={
												assignment.status !== "pending"
											}
											className="cursor-pointer"
										/>
										{answers[question.id] && (
											<p className="text-sm text-muted-foreground">
												File selected:{" "}
												{
													(
														answers[
															question.id
														] as File
													).name
												}
											</p>
										)}
									</div>
								)}
							</CardContent>
						</Card>
					))}

					{assignment.status === "pending" && (
						<div className="flex justify-between">
							<Button
								variant="outline"
								onClick={handleSaveDraft}
								disabled={isSubmitting}>
								Save Draft
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={isSubmitting}>
								{isSubmitting
									? "Submitting..."
									: "Submit Assignment"}
							</Button>
						</div>
					)}
				</TabsContent>

				<TabsContent value="submission" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Submission Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex items-center gap-2">
									<Upload className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Submitted:{" "}
										{formatDate(
											assignment.submittedAt || ""
										)}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Time spent:{" "}
										{formatTime(assignment.timeSpent || 0)}
									</span>
								</div>
							</div>

							{assignment.status === "graded" && (
								<div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
									<div className="flex items-center gap-2 mb-2">
										<CheckCircle className="h-5 w-5 text-green-500" />
										<h3 className="font-medium text-green-800 dark:text-green-400">
											Score: {assignment.score}%
										</h3>
									</div>
									{assignment.feedback && (
										<div className="mt-2">
											<p className="text-sm font-medium mb-1">
												Instructor Feedback:
											</p>
											<p className="text-sm text-green-700 dark:text-green-300">
												{assignment.feedback}
											</p>
										</div>
									)}
								</div>
							)}
						</CardContent>
					</Card>

					<div className="space-y-6">
						<h3 className="text-lg font-medium">Your Answers</h3>
						{assignment.questions.map((question, index) => (
							<Card key={question.id}>
								<CardHeader>
									<CardTitle className="text-lg">
										Question {index + 1}{" "}
										<span className="text-sm font-normal">
											({question.points} points)
										</span>
									</CardTitle>
									<CardDescription>
										{question.question}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<h4 className="text-sm font-medium mb-1">
												Your Answer:
											</h4>
											{question.type ===
												"multiple-choice" && (
												<p>
													{
														answers[
															question.id
														] as string
													}
												</p>
											)}
											{question.type ===
												"short-answer" && (
												<p>
													{
														answers[
															question.id
														] as string
													}
												</p>
											)}
											{question.type === "essay" && (
												<div className="p-3 bg-muted rounded-md">
													<p className="text-sm whitespace-pre-wrap">
														{
															answers[
																question.id
															] as string
														}
													</p>
												</div>
											)}
											{question.type === "file-upload" &&
												answers[question.id] && (
													<p className="text-sm">
														File uploaded:{" "}
														{
															(
																answers[
																	question.id
																] as File
															).name
														}
													</p>
												)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
