'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { GraduationCap, TrendingUp, Award, DollarSign, Users, ArrowUpRight, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Header } from '@/components/ui/header'
import { LearnScoreDisplay } from '@/components/ui/learn-score-display'
import { EduIDMintingComponent } from '@/components/eduid/EduIDMintingComponent'
import type { EduID, LearnScore, LoanRecord, ScholarshipRecord } from '@/types/edulendx'

// Mock data for demonstration
const mockEduID: EduID | null = null // Set to null to show minting flow

const mockLearnScore: LearnScore = {
  total: 785,
  grade: 'B+',
  components: {
    academicAchievements: 340,
    loanRepayment: 280,
    scholarshipsEarned: 120,
    communityContribution: 45,
  },
  lastUpdated: new Date().toISOString(),
  history: [
    { score: 785, date: new Date().toISOString(), reason: 'Completed CS301 with A grade' },
    { score: 760, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), reason: 'On-time loan payment' },
  ]
}

const mockLoans: LoanRecord[] = [
  {
    loanNftId: '1',
    amount: 5000,
    status: 'active',
    startedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    onTimePayments: 4,
    latePayments: 0,
    defaulted: false,
  },
]

const mockScholarships: ScholarshipRecord[] = [
  {
    poolId: '1',
    poolName: 'STEM Excellence Scholarship',
    amount: 2000,
    receivedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    reason: 'GPA > 3.5, CS Major',
    transactionHash: '0x1234...',
  },
]

// Extended mock data for UI (not in type definition)
const mockLoanDetails = {
  interestRate: 700,
  remainingBalance: 3200,
  nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  nextPaymentAmount: 450,
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [showEduIDMinting, setShowEduIDMinting] = useState(false)
  
  // Mock EduID - in real app, fetch from blockchain
  const hasEduID = mockEduID !== null

  if (!isConnected) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24">
          <Card className="max-w-md w-full bg-slate-900/50 backdrop-blur-lg border-slate-800 p-12 text-center">
            <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-slate-500 mb-8">
              Please connect your wallet to access your dashboard
            </p>
          </Card>
        </div>
      </>
    )
  }

  if (!hasEduID && !showEduIDMinting) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-12 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-8">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome to EduLendX!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Create your EduID to start your journey in decentralized education financing
            </p>
            <div className="space-y-4 text-left mb-10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Soulbound Identity NFT</h3>
                  <p className="text-sm text-slate-500">Your permanent academic identity on blockchain</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Build Your LearnScore</h3>
                  <p className="text-sm text-slate-500">Reputation system based on achievements and behavior</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Access Funding</h3>
                  <p className="text-sm text-slate-500">Scholarships and loans based on your reputation</p>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-6 text-lg rounded-full shadow-2xl shadow-blue-500/30 transition-all hover:scale-105"
              onClick={() => setShowEduIDMinting(true)}
            >
              Create Your EduID
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </motion.div>
        </div>
      </>
    )
  }

  if (showEduIDMinting && !hasEduID) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 p-4 pt-24">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="outline"
              className="mb-6 border-slate-700 hover:bg-slate-800"
              onClick={() => setShowEduIDMinting(false)}
            >
              ← Back to Dashboard
            </Button>
            <EduIDMintingComponent />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 p-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Badge className="bg-slate-800 border-slate-700 text-slate-300">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Badge>
          </div>
          <p className="text-slate-500">Manage your academic identity, loans, and scholarships</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">{mockLearnScore.total}</div>
            <div className="text-sm text-slate-500">LearnScore™</div>
            <Badge className="mt-2 bg-blue-500/10 border-blue-500/30 text-blue-400">
              Grade {mockLearnScore.grade}
            </Badge>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${mockLoanDetails.remainingBalance.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Outstanding Loans</div>
            <div className="mt-2 text-xs text-green-400">
              Next Payment: ${mockLoanDetails.nextPaymentAmount}
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-indigo-500/10">
                <Award className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${mockScholarships[0]?.amount.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Scholarships Earned</div>
            <div className="mt-2 text-xs text-slate-600">
              {mockScholarships.length} scholarship{mockScholarships.length !== 1 ? 's' : ''}
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-sky-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-sky-500/10">
                <Users className="w-6 h-6 text-sky-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-sm text-slate-500">Students Helped</div>
            <div className="mt-2 text-xs text-slate-600">
              Through DAO participation
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - LearnScore */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <LearnScoreDisplay 
              learnScore={mockLearnScore}
              showHistory={true}
              compact={false}
            />
          </motion.div>

          {/* Right Column - Loans & Scholarships */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Active Loans */}
            <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-lg border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Loans</h2>
                <Link href="/loans">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Request Loan
                  </Button>
                </Link>
              </div>

              {mockLoans.length > 0 ? (
                <div className="space-y-4">
                  {mockLoans.map((loan) => (
                    <div 
                      key={loan.loanNftId}
                      className="bg-black/30 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Loan #{loan.loanNftId}</div>
                          <div className="text-2xl font-bold">${loan.amount.toLocaleString()}</div>
                        </div>
                        <Badge className="bg-green-500/20 border-green-500/50 text-green-300">
                          {loan.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Interest Rate</div>
                          <div className="font-semibold">{mockLoanDetails.interestRate / 100}% APR</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Remaining</div>
                          <div className="font-semibold">${mockLoanDetails.remainingBalance.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Next Payment</span>
                          <span className="font-bold">${mockLoanDetails.nextPaymentAmount}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Due: {mockLoanDetails.nextPaymentDate.toLocaleDateString()}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                        Make Payment
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No active loans</p>
                  <Link href="/loans">
                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                      Browse Loan Options
                    </Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Scholarships */}
            <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-lg border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Scholarships</h2>
                <Link href="/scholarships">
                  <Button size="sm" variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                    View All
                  </Button>
                </Link>
              </div>

              {mockScholarships.length > 0 ? (
                <div className="space-y-4">
                  {mockScholarships.map((scholarship, index) => (
                    <div 
                      key={index}
                      className="bg-black/30 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{scholarship.poolName}</h3>
                          <p className="text-sm text-gray-400">{scholarship.reason}</p>
                        </div>
                        <Badge className="bg-green-500/20 border-green-500/50 text-green-300">
                          completed
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-400">
                            ${scholarship.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            Received {new Date(scholarship.receivedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Award className="w-8 h-8 text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No scholarships yet</p>
                  <Link href="/scholarships">
                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                      Explore Scholarships
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/scholarships" className="block">
                <Button variant="outline" className="w-full h-auto py-6 border-purple-500/50 hover:bg-purple-500/10 flex-col gap-2">
                  <Award className="w-8 h-8 text-purple-400" />
                  <span>Apply for Scholarships</span>
                </Button>
              </Link>
              <Link href="/loans" className="block">
                <Button variant="outline" className="w-full h-auto py-6 border-purple-500/50 hover:bg-purple-500/10 flex-col gap-2">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <span>Request a Loan</span>
                </Button>
              </Link>
              <Link href="/governance" className="block">
                <Button variant="outline" className="w-full h-auto py-6 border-purple-500/50 hover:bg-purple-500/10 flex-col gap-2">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span>DAO Governance</span>
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
        </div>
      </div>
    </>
  )
}
