import type { Metadata } from "next";
import { CourseCard } from "@/components/dashboard/course-card";

export const metadata: Metadata = {
	title: "My Courses | Ighota",
	description: "Manage and view your enrolled courses",
};

// Mock data - would come from API in real implementation
const enrolledCourses = [
	{
		id: "mathematics-wassce",
		title: "Introduction to Mathematics",
		description:
			"Learn the fundamentals of mathematics including algebra, geometry, and calculus.",
		progress: 75,
		totalLessons: 12,
		completedLessons: 9,
		lastAccessed: "2 days ago",
		image: "/placeholder.svg?height=200&width=400",
	},
	{
		id: "english-wassce",
		title: "English Literature",
		description:
			"Explore classic and contemporary literature through analysis and discussion.",
		progress: 40,
		totalLessons: 15,
		completedLessons: 6,
		lastAccessed: "Yesterday",
		image: "/placeholder.svg?height=200&width=400",
	},
	{
		id: "biology-jamb",
		title: "Introduction to Physics",
		description:
			"Discover the fundamental principles of physics and how they apply to the world around us.",
		progress: 20,
		totalLessons: 18,
		completedLessons: 3,
		lastAccessed: "1 week ago",
		image: "/placeholder.svg?height=200&width=400",
	},
	{
		id: "4",
		title: "World History",
		description:
			"Explore the major events and developments throughout human history.",
		progress: 60,
		totalLessons: 20,
		completedLessons: 12,
		lastAccessed: "3 days ago",
		image: "/placeholder.svg?height=200&width=400",
	},
	{
		id: "5",
		title: "Computer Science Fundamentals",
		description:
			"Learn the basics of programming, algorithms, and computer systems.",
		progress: 30,
		totalLessons: 25,
		completedLessons: 7,
		lastAccessed: "5 days ago",
		image: "/placeholder.svg?height=200&width=400",
	},
];

export default function CoursesPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					My Courses
				</h1>
				<p className="text-muted-foreground">
					Manage and continue your enrolled courses
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{enrolledCourses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}
			</div>
		</div>
	);
}
