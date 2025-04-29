import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Progress Tracking | Ighota",
	description: "Track your academic progress across all courses",
};

export default function ProgressPage() {
	return (
		<div className="container py-6">
			<h1 className="text-2xl font-bold">Progress Tracking</h1>
			<p className="mt-2 text-gray-600">
				Monitor your progress across all courses and subjects.
			</p>

			{/* Add your progress tracking components here */}
			{/* <ProgressCard data={overallProgress} /> */}
			{/* <PerformanceChart data={subjectPerformance} /> */}
			{/* <UpcomingAssignments data={upcomingAssignments} /> */}
			{/* <QuizResults data={quizResults} /> */}
		</div>
	);
}
