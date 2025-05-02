"use client";

import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AchievementCard } from "@/components/gamification/achievement-card"
// import { BadgeCard } from "@/components/gamification/badge-card"
// import { XpProgress } from "@/components/gamification/xp-progress"
// import { StreakDisplay } from "@/components/gamification/streak-display"
// import { XpActivityList } from "@/components/gamification/xp-activity-list"

import type { GamificationProfile } from "@/types/gamification";
import { Sparkles, Award, Medal } from "lucide-react";
import { AchievementCard } from "@/components/achievement-card";
import { BadgeCard } from "@/components/badge-card";
import { XpProgress } from "@/components/xp-progress";
import { StreakDisplay } from "@/components/streak-display";
import { XpActivityList } from "@/components/xp-activity-list";

export default function AchievementsPage() {
	const [gamificationProfile, setGamificationProfile] =
		useState<GamificationProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchGamificationProfile = async () => {
			try {
				// In a real app, this would be an API call
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Mock data
				setGamificationProfile({
					level: {
						level: 5,
						currentXp: 350,
						xpToNextLevel: 500,
						totalXpEarned: 1850,
					},
					streak: {
						current: 7,
						longest: 14,
						lastActive: new Date().toISOString(),
					},
					achievements: [
						{
							id: "first-course",
							title: "First Steps",
							description: "Enroll in your first course",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
							unlockedAt: "2023-04-15T10:30:00Z",
							category: "course",
						},
						{
							id: "complete-lesson",
							title: "Knowledge Seeker",
							description: "Complete 10 lessons",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
							progress: 7,
							maxProgress: 10,
							category: "course",
						},
						{
							id: "perfect-quiz",
							title: "Perfect Score",
							description: "Get 100% on a quiz",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
							unlockedAt: "2023-04-20T14:15:00Z",
							category: "quiz",
						},
						{
							id: "streak-7",
							title: "Week Warrior",
							description: "Maintain a 7-day streak",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
							unlockedAt: "2023-05-01T08:00:00Z",
							category: "streak",
						},
						{
							id: "assignment-master",
							title: "Assignment Master",
							description:
								"Complete 5 assignments with a score of 90% or higher",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-file-check"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>',
							progress: 3,
							maxProgress: 5,
							category: "assignment",
						},
					],
					badges: [
						{
							id: "early-adopter",
							name: "Early Adopter",
							description:
								"One of the first users to join Ighota",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
							rarity: "rare",
							earnedAt: "2023-04-10T09:00:00Z",
						},
						{
							id: "math-enthusiast",
							name: "Math Enthusiast",
							description:
								"Complete all lessons in a Mathematics course",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>',
							rarity: "uncommon",
						},
						{
							id: "perfect-attendance",
							name: "Perfect Attendance",
							description: "Log in for 30 consecutive days",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-calendar-check"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>',
							rarity: "epic",
						},
						{
							id: "quiz-master",
							name: "Quiz Master",
							description: "Score 100% on 5 different quizzes",
							icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M12 8v8"/><circle cx="12" cy="18" r="4"/></svg>',
							rarity: "legendary",
						},
					],
					recentXpActivities: [
						{
							id: "xp-1",
							activity: "Completed Mathematics Lesson 3",
							xp: 50,
							timestamp: "2023-05-10T14:30:00Z",
						},
						{
							id: "xp-2",
							activity: "Submitted English Assignment",
							xp: 75,
							timestamp: "2023-05-09T16:45:00Z",
						},
						{
							id: "xp-3",
							activity: "Daily Login Bonus",
							xp: 10,
							timestamp: "2023-05-10T09:15:00Z",
						},
						{
							id: "xp-4",
							activity: "Completed Quiz with 90% Score",
							xp: 45,
							timestamp: "2023-05-08T11:20:00Z",
						},
						{
							id: "xp-5",
							activity: "Streak Bonus (7 days)",
							xp: 35,
							timestamp: "2023-05-10T09:15:00Z",
						},
					],
				});
			} catch (error) {
				console.error("Failed to fetch gamification profile:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGamificationProfile();
	}, []);

	if (isLoading) {
		return (
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Achievements & Rewards
					</h1>
					<p className="text-muted-foreground">
						Track your progress and earn rewards
					</p>
				</div>
				<div className="space-y-4">
					<div className="h-12 w-full animate-pulse rounded-md bg-muted"></div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="h-32 animate-pulse rounded-md bg-muted"></div>
						<div className="h-32 animate-pulse rounded-md bg-muted"></div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{Array(8)
							.fill(null)
							.map((_, i) => (
								<div
									key={i}
									className="h-40 animate-pulse rounded-md bg-muted"></div>
							))}
					</div>
				</div>
			</div>
		);
	}

	if (!gamificationProfile) {
		return (
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Achievements & Rewards
					</h1>
					<p className="text-muted-foreground">
						Track your progress and earn rewards
					</p>
				</div>
				<div className="flex items-center justify-center p-8 text-center">
					<div className="space-y-2">
						<p>
							Failed to load gamification profile. Please try
							again later.
						</p>
						<button className="text-primary underline">
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Achievements & Rewards
				</h1>
				<p className="text-muted-foreground">
					Track your progress and earn rewards
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-4">
					<XpProgress userLevel={gamificationProfile.level} />
					<StreakDisplay streak={gamificationProfile.streak} />
				</div>
				<XpActivityList
					activities={gamificationProfile.recentXpActivities}
				/>
			</div>

			<Tabs defaultValue="achievements">
				<TabsList className="grid w-full grid-cols-3 mb-8">
					<TabsTrigger
						value="achievements"
						className="flex items-center gap-2">
						<Award className="h-4 w-4" />
						<span>Achievements</span>
					</TabsTrigger>
					<TabsTrigger
						value="badges"
						className="flex items-center gap-2">
						<Medal className="h-4 w-4" />
						<span>Badges</span>
					</TabsTrigger>
					<TabsTrigger
						value="leaderboard"
						className="flex items-center gap-2">
						<Sparkles className="h-4 w-4" />
						<span>Leaderboard</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="achievements" className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{gamificationProfile.achievements.map((achievement) => (
							<AchievementCard
								key={achievement.id}
								achievement={achievement}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="badges" className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{gamificationProfile.badges.map((badge) => (
							<BadgeCard key={badge.id} badge={badge} />
						))}
					</div>
				</TabsContent>

				<TabsContent value="leaderboard" className="space-y-4">
					<div className="rounded-md border">
						<div className="p-4">
							<h3 className="text-lg font-medium">
								Weekly Leaderboard
							</h3>
							<p className="text-sm text-muted-foreground">
								Top students this week
							</p>
						</div>
						<div className="px-4 py-2 bg-muted/50">
							<div className="grid grid-cols-12 text-xs font-medium">
								<div className="col-span-1">#</div>
								<div className="col-span-7">Student</div>
								<div className="col-span-2 text-right">
									Level
								</div>
								<div className="col-span-2 text-right">XP</div>
							</div>
						</div>
						<div className="divide-y">
							{[
								{
									rank: 1,
									name: "John D.",
									level: 8,
									xp: 2450,
								},
								{
									rank: 2,
									name: "Sarah M.",
									level: 7,
									xp: 2320,
								},
								{
									rank: 3,
									name: "Michael T.",
									level: 7,
									xp: 2180,
								},
								{
									rank: 4,
									name: "Emma W.",
									level: 6,
									xp: 1950,
								},
								{
									rank: 5,
									name: "You",
									level: 5,
									xp: 1850,
									isCurrentUser: true,
								},
								{
									rank: 6,
									name: "David L.",
									level: 5,
									xp: 1720,
								},
								{
									rank: 7,
									name: "Sophia R.",
									level: 4,
									xp: 1540,
								},
								{
									rank: 8,
									name: "James B.",
									level: 4,
									xp: 1490,
								},
								{
									rank: 9,
									name: "Olivia P.",
									level: 3,
									xp: 1320,
								},
								{
									rank: 10,
									name: "William K.",
									level: 3,
									xp: 1280,
								},
							].map((student) => (
								<div
									key={student.rank}
									className={cn(
										"grid grid-cols-12 items-center px-4 py-3",
										student.isCurrentUser && "bg-primary/5"
									)}>
									<div className="col-span-1 font-medium">
										{student.rank}
									</div>
									<div className="col-span-7 flex items-center gap-2">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
											{student.name.charAt(0)}
										</div>
										<span
											className={cn(
												student.isCurrentUser &&
													"font-medium"
											)}>
											{student.name}
										</span>
										{student.isCurrentUser && (
											<span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
												You
											</span>
										)}
									</div>
									<div className="col-span-2 text-right">
										{student.level}
									</div>
									<div className="col-span-2 text-right font-medium">
										{student.xp.toLocaleString()}
									</div>
								</div>
							))}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
