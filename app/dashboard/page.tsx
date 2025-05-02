"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/dashboard/course-card";
import { MetricsCard } from "@/components/metrics-card";
import { SubjectPerformance } from "@/components/subject-performance";
import { XpProgress } from "@/components/xp-progress";

// Define the performance data
const performanceData = [
	{
		subject: "Mathematics",
		score: 85,
		color: "bg-blue-500",
		subtopics: [
			{ name: "Algebra", score: 92, color: "bg-blue-500" },
			{ name: "Geometry", score: 78, color: "bg-blue-500" },
			{ name: "Calculus", score: 85, color: "bg-blue-500" },
			{ name: "Statistics", score: 88, color: "bg-blue-500" },
		],
	},
	{
		subject: "English",
		score: 72,
		color: "bg-green-500",
		subtopics: [
			{ name: "Grammar", score: 80, color: "bg-green-500" },
			{ name: "Literature", score: 75, color: "bg-green-500" },
			{ name: "Composition", score: 68, color: "bg-green-500" },
			{ name: "Comprehension", score: 65, color: "bg-green-500" },
		],
	},
	{
		subject: "Science",
		score: 90,
		color: "bg-purple-500",
		subtopics: [
			{ name: "Physics", score: 92, color: "bg-purple-500" },
			{ name: "Chemistry", score: 88, color: "bg-purple-500" },
			{ name: "Biology", score: 90, color: "bg-purple-500" },
		],
	},
	{
		subject: "History",
		score: 65,
		color: "bg-yellow-500",
		subtopics: [
			{ name: "Ancient History", score: 70, color: "bg-yellow-500" },
			{ name: "Modern History", score: 60, color: "bg-yellow-500" },
		],
	},
	{
		subject: "Geography",
		score: 78,
		color: "bg-pink-500",
		subtopics: [
			{ name: "Physical Geography", score: 82, color: "bg-pink-500" },
			{ name: "Human Geography", score: 75, color: "bg-pink-500" },
		],
	},
];

export default function DashboardPage() {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [recentCourses, setRecentCourses] = useState([]);
	const [userLevel, setUserLevel] = useState(null);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				// In a real app, these would be API calls
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Mock data for recently viewed/studied courses
				setRecentCourses([
					{
						id: "mathematics-wassce",
						title: "Mathematics",
						progress: 35,
						lastAccessed: "2 hours ago",
						isFree: true,
					},
					{
						id: "english-wassce",
						title: "English Language",
						progress: 20,
						lastAccessed: "Yesterday",
						isFree: false,
					},
					{
						id: "biology-jamb",
						title: "Biology",
						progress: 15,
						lastAccessed: "3 days ago",
						isFree: true,
					},
				]);

				setUserLevel({
					level: 5,
					currentXp: 350,
					xpToNextLevel: 500,
					totalXpEarned: 1850,
				});
			} catch (error) {
				console.error("Failed to fetch dashboard data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Dashboard
					</h1>
					<p className="text-muted-foreground">
						Track your progress and manage your courses
					</p>
				</div>
				<Button
					asChild
					className="bg-yellow-500 hover:bg-yellow-600 text-black">
					<Link
						href="/subscription"
						className="flex items-center gap-2">
						<Sparkles className="h-4 w-4" />
						<span>Upgrade to Premium</span>
					</Link>
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<MetricsCard
					title="Course Completion"
					percentage={40}
					completed="2"
					total="5"
				/>
				<MetricsCard
					title="Lessons Completed"
					percentage={53}
					completed="24"
					total="45"
				/>
				<MetricsCard
					title="Quizzes Completed"
					percentage={60}
					completed="12"
					total="20"
				/>
				<MetricsCard
					title="Overall Score"
					percentage={78}
					completed="78"
					total="100"
				/>
			</div>

			<SubjectPerformance data={performanceData} />

			{userLevel && (
				<div className="rounded-lg border bg-white p-6">
					<div className="mb-4">
						<h2 className="text-2xl font-bold">
							Experience Points
						</h2>
						<p className="text-muted-foreground">
							Your learning progress and achievements
						</p>
					</div>
					<XpProgress userLevel={userLevel} />
				</div>
			)}

			<div>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold tracking-tight">
						Recently Studied
					</h2>
					<Link
						href="/courses"
						className="text-sm font-medium text-primary">
						Browse all courses
					</Link>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{isLoading
						? Array(3)
								.fill(null)
								.map((_, i) => (
									<CourseCard key={i} loading={true} />
								))
						: recentCourses.map((course) => (
								<CourseCard
									key={course.id}
									id={course.id}
									title={course.title}
									progress={course.progress}
									lastAccessed={course.lastAccessed}
									isFree={course.isFree}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
}
