"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { LessonTabs } from "@/components/lesson-tabs";

export default function LessonNotesPage() {
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [notes, setNotes] = useState("");
	const [savedNotes, setSavedNotes] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				// In a real app, this would be an API call to get saved notes
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Simulate retrieving saved notes
				const savedNotes =
					localStorage.getItem(`notes-${courseId}-${lessonId}`) || "";
				setNotes(savedNotes);
				setSavedNotes(savedNotes);
			} catch (error) {
				console.error("Failed to fetch notes:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNotes();
	}, [courseId, lessonId]);

	const saveNotes = async () => {
		setIsSaving(true);

		try {
			// In a real app, this would be an API call to save notes
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Simulate saving notes
			localStorage.setItem(`notes-${courseId}-${lessonId}`, notes);
			setSavedNotes(notes);
		} catch (error) {
			console.error("Failed to save notes:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const hasChanges = notes !== savedNotes;

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-muted-foreground">Loading notes...</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Lesson Notes
					</h1>
					<p className="text-muted-foreground">
						Take notes while studying this lesson
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

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle>Your Notes</CardTitle>
						<Button
							onClick={saveNotes}
							disabled={isSaving || !hasChanges}
							size="sm">
							{isSaving ? "Saving..." : "Save"}
							<Save className="ml-2 h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent>
						<Textarea
							placeholder="Start taking notes..."
							className="min-h-[300px] resize-y"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
