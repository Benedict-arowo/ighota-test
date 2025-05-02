"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import {
	BookOpen,
	FileText,
	Play,
	ListChecks,
	BookmarkIcon,
} from "lucide-react";

// Mock course data
const mockCourse = {
	id: "1",
	title: "Introduction to Mathematics",
	description: "A comprehensive introduction to basic mathematical concepts",
	instructor: "Dr. Jane Smith",
	progress: 35,
	modules: [
		{
			id: "1",
			title: "Module 1: Numbers and Operations",
			lessons: [
				{
					id: "lesson-1-1",
					title: "Lesson 1: Natural Numbers",
					completed: true,
				},
				{
					id: "lesson-1-2",
					title: "Lesson 2: Integer Operations",
					completed: true,
				},
				{ id: "3", title: "Lesson 3: Fractions", completed: false },
			],
		},
		{
			id: "2",
			title: "Module 2: Algebra Basics",
			lessons: [
				{
					id: "lesson-2-1",
					title: "Lesson 1: Variables and Expressions",
					completed: false,
				},
				{ id: "5", title: "Lesson 2: Equations", completed: false },
				{ id: "6", title: "Lesson 3: Inequalities", completed: false },
			],
		},
	],
};

export default function CoursePage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const [course, setCourse] = useState(mockCourse);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const fetchCourse = async () => {
			try {
				// In a real app, you would fetch the course data from an API
				// const response = await api.get(`/courses/${courseId}`)
				// setCourse(response.data)
				setCourse(mockCourse);
			} catch (error) {
				console.error("Error fetching course:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [courseId]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">{course.title}</h1>
				<p className="text-muted-foreground">{course.description}</p>
				<p className="text-sm mt-2">Instructor: {course.instructor}</p>
			</div>

			<Tabs defaultValue="overview">
				<TabsList className="grid grid-cols-5 w-full max-w-2xl">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="lessons">Lessons</TabsTrigger>
					<TabsTrigger value="materials">Materials</TabsTrigger>
					<TabsTrigger value="flashcards">Flashcards</TabsTrigger>
					<TabsTrigger value="quizzes">Quizzes</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Course Progress</CardTitle>
							<CardDescription>
								Your current progress in this course
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
								<div
									className="h-full bg-primary"
									style={{
										width: `${course.progress}%`,
									}}></div>
							</div>
							<p className="text-sm text-muted-foreground mt-2">
								{course.progress}% complete
							</p>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Quick Links
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Button
										variant="outline"
										className="w-full justify-start"
										asChild>
										<Link
											href={`/dashboard/courses/${courseId}/lessons`}>
											<Play className="mr-2 h-4 w-4" />
											Continue Learning
										</Link>
									</Button>
									<Button
										variant="outline"
										className="w-full justify-start"
										asChild>
										<Link
											href={`/dashboard/courses/${courseId}/materials`}>
											<FileText className="mr-2 h-4 w-4" />
											Course Materials
										</Link>
									</Button>
									<Button
										variant="outline"
										className="w-full justify-start"
										asChild>
										<Link
											href={`/dashboard/courses/${courseId}/flashcards`}>
											<BookmarkIcon className="mr-2 h-4 w-4" />
											Flashcards
										</Link>
									</Button>
									<Button
										variant="outline"
										className="w-full justify-start"
										asChild>
										<Link
											href={`/dashboard/courses/${courseId}/quiz`}>
											<ListChecks className="mr-2 h-4 w-4" />
											Quizzes
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Course Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div>
										<span className="text-sm font-medium">
											Instructor:
										</span>
										<span className="text-sm ml-2">
											{course.instructor}
										</span>
									</div>
									<div>
										<span className="text-sm font-medium">
											Modules:
										</span>
										<span className="text-sm ml-2">
											{course.modules.length}
										</span>
									</div>
									<div>
										<span className="text-sm font-medium">
											Total Lessons:
										</span>
										<span className="text-sm ml-2">
											{course.modules.reduce(
												(acc, module) =>
													acc + module.lessons.length,
												0
											)}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="lessons" className="space-y-4">
					{course.modules.map((module) => (
						<Card key={module.id}>
							<CardHeader>
								<CardTitle>{module.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{module.lessons.map((lesson) => (
										<li
											key={lesson.id}
											className="flex items-center justify-between">
											<div className="flex items-center">
												{lesson.completed ? (
													<div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
												) : (
													<div className="h-4 w-4 rounded-full border border-gray-300 mr-2"></div>
												)}
												<span>{lesson.title}</span>
											</div>
											<Button size="sm" asChild>
												<Link
													href={`/dashboard/courses/${courseId}/lessons/${lesson.id}`}>
													{lesson.completed
														? "Review"
														: "Start"}
												</Link>
											</Button>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</TabsContent>

				<TabsContent value="materials" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button
							variant="outline"
							className="h-24 flex flex-col items-center justify-center"
							asChild>
							<Link
								href={`/dashboard/courses/${courseId}/materials`}>
								<FileText className="h-8 w-8 mb-2" />
								<span>Course Materials</span>
							</Link>
						</Button>
						<Button
							variant="outline"
							className="h-24 flex flex-col items-center justify-center"
							asChild>
							<Link href={`/dashboard/courses/${courseId}/notes`}>
								<BookOpen className="h-8 w-8 mb-2" />
								<span>My Notes</span>
							</Link>
						</Button>
					</div>
				</TabsContent>

				<TabsContent value="flashcards" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button
							variant="outline"
							className="h-24 flex flex-col items-center justify-center"
							asChild>
							<Link
								href={`/dashboard/courses/${courseId}/flashcards`}>
								<BookmarkIcon className="h-8 w-8 mb-2" />
								<span>Study Flashcards</span>
							</Link>
						</Button>
					</div>
				</TabsContent>

				<TabsContent value="quizzes" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button
							variant="outline"
							className="h-24 flex flex-col items-center justify-center"
							asChild>
							<Link href={`/dashboard/courses/${courseId}/quiz`}>
								<ListChecks className="h-8 w-8 mb-2" />
								<span>Take Quiz</span>
							</Link>
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
