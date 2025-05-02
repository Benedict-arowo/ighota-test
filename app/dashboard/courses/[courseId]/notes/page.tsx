"use client";

import { useParams } from "next/navigation";
import { CourseNotes } from "@/components/course-notes";

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
			{
				id: "verbs",
				title: "Verbs and Tenses",
				content: `
          <h2>Verbs</h2>
          <p>Verbs are words that express actions, states, or occurrences.</p>
          
          <h3>Types of Verbs</h3>
          <ul>
            <li><strong>Action Verbs:</strong> Express physical or mental actions (e.g., run, think, eat)</li>
            <li><strong>Linking Verbs:</strong> Connect the subject to additional information (e.g., is, seem, become)</li>
            <li><strong>Helping Verbs:</strong> Help the main verb express tense or mood (e.g., has, will, should)</li>
          </ul>
          
          <h3>Verb Tenses</h3>
          <p>Verb tenses indicate when an action takes place.</p>
          
          <h4>Present Tense</h4>
          <ul>
            <li><strong>Simple Present:</strong> I walk</li>
            <li><strong>Present Continuous:</strong> I am walking</li>
            <li><strong>Present Perfect:</strong> I have walked</li>
            <li><strong>Present Perfect Continuous:</strong> I have been walking</li>
          </ul>
          
          <h4>Past Tense</h4>
          <ul>
            <li><strong>Simple Past:</strong> I walked</li>
            <li><strong>Past Continuous:</strong> I was walking</li>
            <li><strong>Past Perfect:</strong> I had walked</li>
            <li><strong>Past Perfect Continuous:</strong> I had been walking</li>
          </ul>
          
          <h4>Future Tense</h4>
          <ul>
            <li><strong>Simple Future:</strong> I will walk</li>
            <li><strong>Future Continuous:</strong> I will be walking</li>
            <li><strong>Future Perfect:</strong> I will have walked</li>
            <li><strong>Future Perfect Continuous:</strong> I will have been walking</li>
          </ul>
        `,
			},
		],
		videos: [
			{
				id: "v1",
				title: "Understanding Nouns and Pronouns",
				youtubeId: "4E2Hq-_rKcM",
				description:
					"This video explains the different types of nouns and pronouns and how to use them correctly.",
			},
			{
				id: "v2",
				title: "Mastering Verb Tenses",
				youtubeId: "PNEhqmotgylE",
				description:
					"Learn how to use different verb tenses correctly in your writing and speaking.",
			},
		],
	},
	"biology-jamb": {
		title: "Cell Biology Notes",
		description: "Comprehensive notes on cell structure and functions",
		sections: [
			{
				id: "cell-theory",
				title: "Cell Theory and Structure",
				content: `
          <h2>Cell Theory</h2>
          <p>The cell theory is one of the fundamental concepts in biology. It states that:</p>
          <ol>
            <li>All living organisms are composed of one or more cells.</li>
            <li>The cell is the basic unit of life.</li>
            <li>All cells arise from pre-existing cells.</li>
          </ol>
          
          <h3>Types of Cells</h3>
          <p>There are two main types of cells:</p>
          
          <h4>1. Prokaryotic Cells</h4>
          <ul>
            <li>No true nucleus (DNA is not enclosed in a nuclear membrane)</li>
            <li>No membrane-bound organelles</li>
            <li>Smaller in size (typically 0.1-5.0 μm)</li>
            <li>Examples: bacteria and archaea</li>
          </ul>
          
          <h4>2. Eukaryotic Cells</h4>
          <ul>
            <li>Contains a true nucleus (DNA enclosed in a nuclear membrane)</li>
            <li>Contains membrane-bound organelles</li>
            <li>Larger in size (typically 10-100 μm)</li>
            <li>Examples: plant cells, animal cells, fungi, and protists</li>
          </ul>
        `,
			},
			{
				id: "cell-organelles",
				title: "Cell Organelles and Their Functions",
				content: `
          <h2>Cell Organelles</h2>
          <p>Eukaryotic cells contain various organelles, each with specific functions:</p>
          
          <h3>Nucleus</h3>
          <p>The control center of the cell, containing DNA organized into chromosomes.</p>
          <ul>
            <li>Controls cell activities</li>
            <li>Contains genetic material</li>
            <li>Surrounded by a nuclear membrane with nuclear pores</li>
          </ul>
          
          <h3>Mitochondria</h3>
          <p>The powerhouse of the cell, responsible for cellular respiration and ATP production.</p>
          <ul>
            <li>Has its own DNA</li>
            <li>Double membrane structure</li>
            <li>Inner membrane folded into cristae</li>
          </ul>
          
          <h3>Chloroplasts</h3>
          <p>Found in plant cells, responsible for photosynthesis.</p>
          <ul>
            <li>Contains chlorophyll</li>
            <li>Has its own DNA</li>
            <li>Contains thylakoids arranged in grana</li>
          </ul>
          
          <h3>Endoplasmic Reticulum (ER)</h3>
          <p>A network of membranes involved in protein synthesis (rough ER) and lipid synthesis (smooth ER).</p>
          <ul>
            <li>Rough ER has ribosomes attached</li>
            <li>Smooth ER lacks ribosomes</li>
          </ul>
          
          <h3>Golgi Apparatus</h3>
          <p>Modifies, sorts, and packages proteins for secretion or use within the cell.</p>
          
          <h3>Lysosomes</h3>
          <p>Contain digestive enzymes for breaking down waste materials and cellular debris.</p>
          
          <h3>Ribosomes</h3>
          <p>Sites of protein synthesis.</p>
          <ul>
            <li>Can be free in cytoplasm or attached to ER</li>
            <li>Composed of RNA and proteins</li>
          </ul>
        `,
			},
		],
		videos: [
			{
				id: "v1",
				title: "Cell Structure and Function",
				youtubeId: "URUJD5NEXC8",
				description:
					"This video explains the structure and functions of different cell organelles.",
			},
			{
				id: "v2",
				title: "Prokaryotic vs Eukaryotic Cells",
				youtubeId: "Pxujitlv8wc",
				description:
					"Learn about the differences between prokaryotic and eukaryotic cells.",
			},
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
