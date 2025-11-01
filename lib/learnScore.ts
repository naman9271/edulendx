import { LearnScoreComponents, LearnScore } from '@/types/edulendx'

/**
 * Calculate total LearnScore from components
 */
export function calculateLearnScore(components: LearnScoreComponents): number {
  const total =
    components.academicAchievements +
    components.loanRepayment +
    components.scholarshipsEarned +
    components.communityContribution

  return Math.min(1000, Math.max(0, total))
}

/**
 * Get letter grade from score
 */
export function getGrade(
  score: number
): 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F' {
  if (score >= 900) return 'A+'
  if (score >= 800) return 'A'
  if (score >= 700) return 'B+'
  if (score >= 600) return 'B'
  if (score >= 500) return 'C+'
  if (score >= 400) return 'C'
  if (score >= 300) return 'D'
  return 'F'
}

/**
 * Get color for grade visualization
 */
export function getGradeColor(
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F'
): string {
  const colors = {
    'A+': '#10b981', // green-500
    A: '#22c55e', // green-400
    'B+': '#84cc16', // lime-500
    B: '#eab308', // yellow-500
    'C+': '#f59e0b', // amber-500
    C: '#f97316', // orange-500
    D: '#ef4444', // red-500
    F: '#dc2626', // red-600
  }
  return colors[grade]
}

/**
 * Calculate academic achievements score (max 400)
 */
export function calculateAcademicScore(
  gpa: number,
  coursesCompleted: number,
  certificatesCount: number
): number {
  const gpaScore = (gpa / 4.0) * 200 // Max 200 for 4.0 GPA
  const coursesScore = Math.min(100, coursesCompleted * 2) // Max 100
  const certScore = Math.min(100, certificatesCount * 20) // Max 100

  return Math.min(400, gpaScore + coursesScore + certScore)
}

/**
 * Calculate loan repayment score (max 350)
 */
export function calculateLoanRepaymentScore(
  onTimePayments: number,
  latePayments: number,
  completedLoans: number,
  defaultedLoans: number
): number {
  // Penalties for defaults and late payments
  const defaultPenalty = defaultedLoans * 100
  const latePenalty = latePayments * 10

  // Rewards for on-time and completed
  const onTimeReward = onTimePayments * 5
  const completionReward = completedLoans * 50

  const score = onTimeReward + completionReward - defaultPenalty - latePenalty

  return Math.min(350, Math.max(0, score))
}

/**
 * Calculate scholarship score (max 150)
 */
export function calculateScholarshipScore(
  scholarshipsReceived: number,
  totalScholarshipAmount: number
): number {
  const countScore = Math.min(75, scholarshipsReceived * 15)
  const amountScore = Math.min(75, (totalScholarshipAmount / 1000) * 10)

  return Math.min(150, countScore + amountScore)
}

/**
 * Calculate community contribution score (max 100)
 */
export function calculateCommunityScore(
  daoVotes: number,
  helpedStudents: number,
  platformAge: number // in days
): number {
  const voteScore = Math.min(40, daoVotes * 5)
  const helpScore = Math.min(40, helpedStudents * 10)
  const ageScore = Math.min(20, platformAge / 30) // 1 point per month

  return Math.min(100, voteScore + helpScore + ageScore)
}

/**
 * Get recommended interest rate based on LearnScore
 */
export function getRecommendedInterestRate(learnScore: number): {
  min: number
  max: number
  recommended: number
} {
  if (learnScore >= 800) return { min: 5, max: 7, recommended: 6 }
  if (learnScore >= 700) return { min: 7, max: 10, recommended: 8 }
  if (learnScore >= 600) return { min: 10, max: 13, recommended: 11 }
  if (learnScore >= 500) return { min: 13, max: 17, recommended: 15 }
  return { min: 17, max: 25, recommended: 20 }
}

/**
 * Calculate risk level from LearnScore
 */
export function getRiskLevel(learnScore: number): {
  level: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'
  color: string
  description: string
} {
  if (learnScore >= 800)
    return {
      level: 'Very Low',
      color: '#10b981',
      description: 'Excellent credit history and academic performance',
    }
  if (learnScore >= 700)
    return {
      level: 'Low',
      color: '#22c55e',
      description: 'Good credit history with strong academics',
    }
  if (learnScore >= 600)
    return {
      level: 'Medium',
      color: '#eab308',
      description: 'Moderate credit history, average academics',
    }
  if (learnScore >= 500)
    return {
      level: 'High',
      color: '#f97316',
      description: 'Limited credit history or poor payment record',
    }
  return {
    level: 'Very High',
    color: '#dc2626',
    description: 'Poor credit history or defaults',
  }
}

/**
 * Mock function to build complete LearnScore object
 * In production, this would fetch from blockchain
 */
export function buildLearnScore(components: LearnScoreComponents): LearnScore {
  const total = calculateLearnScore(components)
  const grade = getGrade(total)

  return {
    total,
    components,
    grade,
    lastUpdated: new Date().toISOString(),
    history: [],
  }
}
