"use client";

import { SubjectPerformance } from "@/components/subject-performance";

// import { SubjectPerformance } from "@/components/dashboard/subject-performance"

const performanceData = [
	{
		subject: "Mathematics",
		score: 85,
		color: "bg-blue-500",
		subtopics: [
			{ name: "Algebra", score: 90, color: "bg-blue-500" },
			{ name: "Geometry", score: 75, color: "bg-blue-500" },
			{ name: "Calculus", score: 88, color: "bg-blue-500" },
		],
	},
	{
		subject: "English",
		score: 72,
		color: "bg-green-500",
		subtopics: [
			{ name: "Grammar", score: 65, color: "bg-green-500" },
			{ name: "Literature", score: 80, color: "bg-green-500" },
			{ name: "Writing", score: 70, color: "bg-green-500" },
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

export default function PerformancePage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Performance
				</h1>
				<p className="text-muted-foreground">
					Track your academic performance across all subjects
				</p>
			</div>

			<SubjectPerformance data={performanceData} />
		</div>
	);
}
