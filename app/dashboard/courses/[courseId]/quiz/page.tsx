"use client";

import { Quiz } from "@/components/quiz";
import { useParams } from "next/navigation";

// Mock quiz data - in a real app, this would come from an API
const quizzes = {
	"mathematics-wassce": {
		title: "Introduction to Linear Equations Quiz",
		questions: [
			{
				id: "q1",
				question: "What is the solution to 2x + 4 = 10?",
				options: [
					{ id: "a", label: "A", text: "x = 3" },
					{ id: "b", label: "B", text: "x = 4" },
					{ id: "c", label: "C", text: "x = 5" },
					{ id: "d", label: "D", text: "x = 6" },
				],
				correctOptionId: "a",
				explanation:
					"To solve 2x + 4 = 10, we need to isolate x. First, subtract 4 from both sides: 2x = 6. Then, divide both sides by 2: x = 3.",
			},
			{
				id: "q2",
				question: "Which of the following is a linear equation?",
				options: [
					{ id: "a", label: "A", text: "y = x²" },
					{ id: "b", label: "B", text: "y = 3x + 2" },
					{ id: "c", label: "C", text: "y = 1/x" },
					{ id: "d", label: "D", text: "y = √x" },
				],
				correctOptionId: "b",
				explanation:
					"A linear equation has the form y = mx + b, where m and b are constants. Option B (y = 3x + 2) is in this form, with m = 3 and b = 2.",
			},
			{
				id: "q3",
				question: "Solve for x: 3x - 7 = 8",
				options: [
					{ id: "a", label: "A", text: "x = 3" },
					{ id: "b", label: "B", text: "x = 5" },
					{ id: "c", label: "C", text: "x = 7" },
					{ id: "d", label: "D", text: "x = 15" },
				],
				correctOptionId: "b",
				explanation:
					"To solve 3x - 7 = 8, add 7 to both sides: 3x = 15. Then divide both sides by 3: x = 5.",
			},
			{
				id: "q4",
				question: "If 5x + 2 = 3x - 6, what is the value of x?",
				options: [
					{ id: "a", label: "A", text: "x = -4" },
					{ id: "b", label: "B", text: "x = -2" },
					{ id: "c", label: "C", text: "x = 2" },
					{ id: "d", label: "D", text: "x = 4" },
				],
				correctOptionId: "a",
				explanation:
					"To solve 5x + 2 = 3x - 6, first subtract 3x from both sides: 2x + 2 = -6. Then subtract 2 from both sides: 2x = -8. Finally, divide both sides by 2: x = -4.",
			},
			{
				id: "q5",
				question:
					"Which of the following is the slope-intercept form of a linear equation?",
				options: [
					{ id: "a", label: "A", text: "ax + by = c" },
					{ id: "b", label: "B", text: "y - y₁ = m(x - x₁)" },
					{ id: "c", label: "C", text: "y = mx + b" },
					{ id: "d", label: "D", text: "y = ax² + bx + c" },
				],
				correctOptionId: "c",
				explanation:
					"The slope-intercept form of a linear equation is y = mx + b, where m is the slope and b is the y-intercept.",
			},
		],
	},
	"english-wassce": {
		title: "English Grammar Quiz",
		questions: [
			{
				id: "q1",
				question: "Which of the following is a proper noun?",
				options: [
					{ id: "a", label: "A", text: "city" },
					{ id: "b", label: "B", text: "London" },
					{ id: "c", label: "C", text: "beautiful" },
					{ id: "d", label: "D", text: "quickly" },
				],
				correctOptionId: "b",
				explanation:
					"A proper noun is a specific name for a particular person, place, or thing. 'London' is a proper noun because it names a specific city.",
			},
			{
				id: "q2",
				question: "Which sentence uses the correct form of the verb?",
				options: [
					{
						id: "a",
						label: "A",
						text: "They was going to the store.",
					},
					{
						id: "b",
						label: "B",
						text: "She have completed her assignment.",
					},
					{
						id: "c",
						label: "C",
						text: "He doesn't know the answer.",
					},
					{
						id: "d",
						label: "D",
						text: "We is studying for the exam.",
					},
				],
				correctOptionId: "c",
				explanation:
					"The correct form of the verb should agree with the subject. 'He' is singular and requires the singular form 'doesn't' (does not).",
			},
			{
				id: "q3",
				question:
					"Identify the adverb in the sentence: 'She speaks very fluently.'",
				options: [
					{ id: "a", label: "A", text: "she" },
					{ id: "b", label: "B", text: "speaks" },
					{ id: "c", label: "C", text: "very" },
					{ id: "d", label: "D", text: "fluently" },
				],
				correctOptionId: "d",
				explanation:
					"'Fluently' is an adverb because it describes how she speaks. Adverbs often end in '-ly' and modify verbs, adjectives, or other adverbs.",
			},
			{
				id: "q4",
				question: "Which of the following is a complex sentence?",
				options: [
					{
						id: "a",
						label: "A",
						text: "I went to the store and bought some milk.",
					},
					{
						id: "b",
						label: "B",
						text: "Although it was raining, we went for a walk.",
					},
					{ id: "c", label: "C", text: "The movie was boring." },
					{
						id: "d",
						label: "D",
						text: "She studied hard; she passed the exam.",
					},
				],
				correctOptionId: "b",
				explanation:
					"A complex sentence contains an independent clause and at least one dependent clause. 'Although it was raining' is a dependent clause, and 'we went for a walk' is an independent clause.",
			},
		],
	},
	"biology-jamb": {
		title: "Cell Biology Quiz",
		questions: [
			{
				id: "q1",
				question:
					"Which organelle is known as the 'powerhouse' of the cell?",
				options: [
					{ id: "a", label: "A", text: "Nucleus" },
					{ id: "b", label: "B", text: "Mitochondria" },
					{ id: "c", label: "C", text: "Endoplasmic Reticulum" },
					{ id: "d", label: "D", text: "Golgi Apparatus" },
				],
				correctOptionId: "b",
				explanation:
					"Mitochondria are known as the 'powerhouse' of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.",
			},
			{
				id: "q2",
				question:
					"Which of the following is NOT a function of the cell membrane?",
				options: [
					{
						id: "a",
						label: "A",
						text: "Controlling what enters and exits the cell",
					},
					{
						id: "b",
						label: "B",
						text: "Providing structural support",
					},
					{ id: "c", label: "C", text: "Protein synthesis" },
					{ id: "d", label: "D", text: "Cell signaling" },
				],
				correctOptionId: "c",
				explanation:
					"Protein synthesis occurs in the ribosomes, not in the cell membrane. The cell membrane controls what enters and exits the cell, provides structural support, and is involved in cell signaling.",
			},
			{
				id: "q3",
				question:
					"Which of the following is a characteristic of prokaryotic cells?",
				options: [
					{ id: "a", label: "A", text: "Presence of a nucleus" },
					{ id: "b", label: "B", text: "Presence of mitochondria" },
					{
						id: "c",
						label: "C",
						text: "Absence of a nuclear membrane",
					},
					{ id: "d", label: "D", text: "Presence of chloroplasts" },
				],
				correctOptionId: "c",
				explanation:
					"Prokaryotic cells do not have a nuclear membrane, which means their genetic material is not enclosed within a nucleus. This is a key characteristic that distinguishes them from eukaryotic cells.",
			},
			{
				id: "q4",
				question:
					"Which of the following is responsible for protein synthesis in cells?",
				options: [
					{ id: "a", label: "A", text: "Lysosomes" },
					{ id: "b", label: "B", text: "Ribosomes" },
					{ id: "c", label: "C", text: "Golgi apparatus" },
					{ id: "d", label: "D", text: "Vacuoles" },
				],
				correctOptionId: "b",
				explanation:
					"Ribosomes are responsible for protein synthesis in cells. They can be found floating freely in the cytoplasm or attached to the endoplasmic reticulum.",
			},
		],
	},
};

export default function CourseQuizPage() {
	const params = useParams();
	const courseId = params.courseId as string;

	const quizData = quizzes[courseId];

	if (!quizData) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-muted-foreground">
					No quiz available for this course yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Course Quiz
				</h1>
				<p className="text-muted-foreground">
					Test your knowledge with this quiz
				</p>
			</div>

			<Quiz {...quizData} />
		</div>
	);
}
