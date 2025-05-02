"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonTabs } from "@/components/lesson-tabs";
// import { LessonTabs } from "@/components/lessons/lesson-tabs"

interface Video {
	id: string;
	title: string;
	description: string;
	videoUrl: string;
}

export default function LessonVideosPage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [videos, setVideos] = useState<Video[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				// In a real app, this would be an API call to get lesson videos
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Simulate retrieving videos
				if (lessonId === "lesson-1-1") {
					setVideos([
						{
							id: "vid-1",
							title: "Introduction to Number Bases",
							description:
								"A comprehensive overview of different number bases and conversion methods.",
							videoUrl:
								"https://www.youtube.com/embed/ku4KOFQ-bB4",
						},
						{
							id: "vid-2",
							title: "Binary and Hexadecimal Systems",
							description:
								"Deep dive into binary and hexadecimal number systems.",
							videoUrl:
								"https://www.youtube.com/embed/ku4KOFQ-bB4",
						},
					]);
				} else if (lessonId === "lesson-1-2") {
					setVideos([
						{
							id: "vid-1",
							title: "Modular Arithmetic Explained",
							description:
								"Learn about modular arithmetic and its applications.",
							videoUrl:
								"https://www.youtube.com/embed/ku4KOFQ-bB4",
						},
					]);
				} else {
					setVideos([]);
				}
			} catch (error) {
				console.error("Failed to fetch videos:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVideos();
	}, [courseId, lessonId]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">Loading videos...</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Lesson Videos
					</h1>
					<p className="text-muted-foreground">
						Watch instructional videos for this lesson
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

				{videos.length > 0 ? (
					<div className="grid gap-6">
						{videos.map((video) => (
							<Card key={video.id}>
								<CardHeader>
									<CardTitle>{video.title}</CardTitle>
									<p className="text-muted-foreground">
										{video.description}
									</p>
								</CardHeader>
								<CardContent>
									<div className="aspect-video overflow-hidden rounded-lg">
										<iframe
											width="100%"
											height="100%"
											src={video.videoUrl}
											title={video.title}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen></iframe>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<p className="text-muted-foreground text-center">
								No videos available for this lesson.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
