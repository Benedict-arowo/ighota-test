export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  category: "course" | "quiz" | "assignment" | "streak" | "general"
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  earnedAt?: string
}

export interface XpActivity {
  id: string
  activity: string
  xp: number
  timestamp: string
}

export interface UserLevel {
  level: number
  currentXp: number
  xpToNextLevel: number
  totalXpEarned: number
}

export interface UserStreak {
  current: number
  longest: number
  lastActive: string
}

export interface GamificationProfile {
  level: UserLevel
  streak: UserStreak
  achievements: Achievement[]
  badges: Badge[]
  recentXpActivities: XpActivity[]
}
