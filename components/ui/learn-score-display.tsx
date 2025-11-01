'use client'

import { LearnScore, LearnScoreComponents } from '@/types/edulendx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getGrade, getGradeColor } from '@/lib/learnScore'
import { Trophy, BookOpen, DollarSign, Award, Users } from 'lucide-react'

interface LearnScoreDisplayProps {
  learnScore: LearnScore
  showHistory?: boolean
  compact?: boolean
}

export function LearnScoreDisplay({
  learnScore,
  showHistory = false,
  compact = false,
}: LearnScoreDisplayProps) {
  const gradeColor = getGradeColor(learnScore.grade)

  const componentDetails = [
    {
      name: 'Academic Achievements',
      value: learnScore.components.academicAchievements,
      max: 400,
      icon: BookOpen,
      color: '#3b82f6',
    },
    {
      name: 'Loan Repayment',
      value: learnScore.components.loanRepayment,
      max: 350,
      icon: DollarSign,
      color: '#10b981',
    },
    {
      name: 'Scholarships Earned',
      value: learnScore.components.scholarshipsEarned,
      max: 150,
      icon: Award,
      color: '#f59e0b',
    },
    {
      name: 'Community Contribution',
      value: learnScore.components.communityContribution,
      max: 100,
      icon: Users,
      color: '#8b5cf6',
    },
  ]

  if (compact) {
    return (
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: gradeColor }}
          >
            {learnScore.grade}
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold">{learnScore.total}</div>
          <div className="text-sm text-gray-400">LearnScore</div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span>LearnScore</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold">{learnScore.total}</div>
            <div className="text-sm text-gray-400">out of 1000</div>
          </div>
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white"
            style={{ backgroundColor: gradeColor }}
          >
            {learnScore.grade}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <Progress value={(learnScore.total / 1000) * 100} className="h-3" />
        </div>

        {/* Component Breakdown */}
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-semibold text-gray-300">Breakdown</h4>
          {componentDetails.map((component) => {
            const Icon = component.icon
            const percentage = (component.value / component.max) * 100

            return (
              <div key={component.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon
                      className="h-4 w-4"
                      style={{ color: component.color }}
                    />
                    <span className="text-gray-300">{component.name}</span>
                  </div>
                  <span className="font-semibold">
                    {component.value}/{component.max}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  style={
                    {
                      '--progress-background': component.color,
                    } as React.CSSProperties
                  }
                />
              </div>
            )
          })}
        </div>

        {/* History */}
        {showHistory && learnScore.history.length > 0 && (
          <div className="pt-4 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Recent Changes
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {learnScore.history.slice(0, 5).map((entry, index) => (
                <div
                  key={index}
                  className="text-sm flex items-center justify-between"
                >
                  <span className="text-gray-400">{entry.reason}</span>
                  <span className="font-semibold">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center">
          Last updated: {new Date(learnScore.lastUpdated).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}
