"use client";

import { CourseNotes } from "@/components/course-notes";
import { useParams } from "next/navigation";

// Mock notes data - in a real app, this would come from an API
const courseNotes = {
	"mathematics-wassce": {
		title: "Linear Equations Notes",
		description:
			"Comprehensive notes on linear equations and their applications",
		sections: [
			{
				id: "intro",
				title: "Introduction to Linear Equations",
				content: `
          <h2>What is a Linear Equation?</h2>
          <p>A linear equation is an equation that forms a straight line when plotted on a graph. The standard form of a linear equation is:</p>
          <div class="bg-muted p-4 rounded-md my-4">
            <p class="text-center font-mono text-lg">ax + by = c</p>
          </div>
          <p>where a, b, and c are constants, and a and b are not both zero.</p>
          
          <h3>Common Forms of Linear Equations</h3>
          <ul>
            <li><strong>Standard Form:</strong> ax + by = c</li>
            <li><strong>Slope-Intercept Form:</strong> y = mx + b (where m is the slope and b is the y-intercept)</li>
            <li><strong>Point-Slope Form:</strong> y - y₁ = m(x - x₁) (where m is the slope and (x₁, y₁) is a point on the line)</li>
          </ul>
          
          <h3>Key Concepts</h3>
          <p>Understanding linear equations requires familiarity with these key concepts:</p>
          <ul>
            <li><strong>Slope:</strong> The steepness of a line, calculated as the ratio of the vertical change to the horizontal change.</li>
            <li><strong>Y-intercept:</strong> The point where the line crosses the y-axis.</li>
            <li><strong>X-intercept:</strong> The point where the line crosses the x-axis.</li>
          </ul>
        `,
			},
			{
				id: "solving",
				title: "Solving Linear Equations",
				content: `
          <h2>Methods for Solving Linear Equations</h2>
          <p>There are several methods to solve linear equations:</p>
          
          <h3>1. Isolation Method</h3>
          <p>The most common method involves isolating the variable by performing the same operations on both sides of the equation.</p>
          
          <div class="bg-muted p-4 rounded-md my-4">
            <p class="font-mono">Example: Solve 2x + 5 = 11</p>
            <ol class="list-decimal list-inside mt-2">
              <li>Subtract 5 from both sides: 2x = 6</li>
              <li>Divide both sides by 2: x = 3</li>
            </ol>
          </div>
          
          <h3>2. Substitution Method</h3>
          <p>Used for solving systems of linear equations by expressing one variable in terms of the other.</p>
          
          <h3>3. Elimination Method</h3>
          <p>Used for systems of linear equations by adding or subtracting equations to eliminate a variable.</p>
          
          <h3>4. Graphical Method</h3>
          <p>Solving by finding the point of intersection on a graph.</p>
          
          <div class="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md my-4">
            <p class="font-medium">Important Note:</p>
            <p>Always check your solution by substituting it back into the original equation!</p>
          </div>
        `,
			},
			{
				id: "applications",
				title: "Applications of Linear Equations",
				content: `
          <h2>Real-World Applications</h2>
          <p>Linear equations are used in many real-world scenarios:</p>
          
          <h3>1. Finance</h3>
          <p>Linear equations can model financial situations such as:</p>
          <ul>
            <li>Simple interest calculations</li>
            <li>Cost and revenue analysis</li>
            <li>Break-even analysis</li>
          </ul>
          
          <h3>2. Physics</h3>
          <p>Many physical relationships are linear:</p>
          <ul>
            <li>Distance-time relationships for constant velocity</li>
            <li>Force and acceleration (F = ma)</li>
            <li>Ohm's law in electricity (V = IR)</li>
          </ul>
          
          <h3>3. Conversion Problems</h3>
          <p>Converting between different units or systems often involves linear equations.</p>
          
          <div class="bg-muted p-4 rounded-md my-4">
            <p class="font-mono">Example: Temperature Conversion</p>
            <p>The relationship between Celsius (C) and Fahrenheit (F) is:</p>
            <p class="text-center my-2">F = (9/5)C + 32</p>
          </div>
          
          <h3>4. Mixture Problems</h3>
          <p>Problems involving mixtures of different solutions or materials.</p>
          
          <h3>5. Motion Problems</h3>
          <p>Problems involving distance, rate, and time.</p>
        `,
			},
		],
		videos: [
			{
				id: "v1",
				title: "Introduction to Linear Equations",
				youtubeId: "MXV65Q_ZyB0",
				description:
					"This video introduces the concept of linear equations and their basic properties.",
			},
			{
				id: "v2",
				title: "Solving Linear Equations Step by Step",
				youtubeId: "Qyd_v3DGzTM",
				description:
					"Learn how to solve linear equations using a step-by-step approach.",
			},
			{
				id: "v3",
				title: "Applications of Linear Equations",
				youtubeId: "8htcZca0JIA",
				description:
					"Discover how linear equations are used to solve real-world problems.",
			},
		],
	},
	"english-wassce": {
		title: "English Grammar Notes",
		description: "Comprehensive notes on English grammar and usage",
		sections: [
			{
				id: "nouns",
				title: "Nouns and Pronouns",
				content: `
          <h2>Nouns</h2>
          <p>Nouns are words that name people, places, things, or ideas.</p>
          
          <h3>Types of Nouns</h3>
          <ul>
            <li><strong>Common Nouns:</strong> General names for people, places, or things (e.g., city, teacher, book)</li>
            <li><strong>Proper Nouns:</strong> Specific names for people, places, or things (e.g., London, Mr. Smith, The Great Gatsby)</li>
            <li><strong>Concrete Nouns:</strong> Things that can be perceived by the senses (e.g., chair, water, music)</li>
            <li><strong>Abstract Nouns:</strong> Ideas, qualities, or states (e.g., love, freedom, happiness)</li>
            <li><strong>Collective Nouns:</strong> Groups of people or things (e.g., team, flock, committee)</li>
          </ul>
          
          <h2>Pronouns</h2>
          <p>Pronouns are words that replace nouns to avoid repetition.</p>
          
          <h3>Types of Pronouns</h3>
          <ul>
            <li><strong>Personal Pronouns:</strong> I, you, he, she, it, we, they</li>
            <li><strong>Possessive Pronouns:</strong> mine, yours, his, hers, its, ours, theirs</li>
            <li><strong>Reflexive Pronouns:</strong> myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</li>
            <li><strong>Relative Pronouns:</strong> who, whom, whose, which, that</li>
            <li><strong>Interrogative Pronouns:</strong> who, whom, whose, which, what</li>
            <li><strong>Demonstrative Pronouns:</strong> this, that, these, those</li>
            <li><strong>Indefinite Pronouns:</strong> anyone, everyone, someone, no one, anybody, etc.</li>
          </ul>
        `,
			},
			// More sections would be added here
		],
		videos: [
			{
				id: "v1",
				title: "Understanding Nouns and Pronouns",
				youtubeId: "4E2Hq-_rKcM",
				description:
					"This video explains the different types of nouns and pronouns and how to use them correctly.",
			},
			// More videos would be added here
		],
	},
};

export default function CourseNotesPage() {
	const params = useParams();
	const courseId = params.courseId as string;

	const notesData = courseNotes[courseId];

	if (!notesData) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-muted-foreground">
					No notes available for this course yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Course Notes
				</h1>
				<p className="text-muted-foreground">
					Study materials and resources for this course
				</p>
			</div>

			<CourseNotes {...notesData} />
		</div>
	);
}
