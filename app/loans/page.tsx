'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, TrendingUp, Clock, Shield, Plus, Filter, Search, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Header } from '@/components/ui/header'
import type { LoanNFT } from '@/types/edulendx'

// Mock loan marketplace data
const mockLoans: LoanNFT[] = [
  {
    id: '1',
    tokenId: '101',
    studentEduId: '501',
    requestedAmount: 5000,
    fundedAmount: 3000,
    repaidAmount: 0,
    interestRate: 700,
    term: 12,
    purpose: 'Spring 2026 Tuition - Computer Science',
    status: 'funded',
    lenders: [
      { address: '0x1234...', amountFunded: 2000, expectedReturn: 2140, fundedAt: new Date().toISOString() },
      { address: '0x5678...', amountFunded: 1000, expectedReturn: 1070, fundedAt: new Date().toISOString() },
    ],
    repaymentSchedule: [],
    contractAddress: '0xabcd...',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    fundingDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    ipfsHash: 'Qm...',
  },
  {
    id: '2',
    tokenId: '102',
    studentEduId: '502',
    requestedAmount: 3000,
    fundedAmount: 1500,
    repaidAmount: 0,
    interestRate: 900,
    term: 6,
    purpose: 'Certification Program - AWS Cloud Practitioner',
    status: 'approved',
    lenders: [
      { address: '0x9999...', amountFunded: 1500, expectedReturn: 1567.5, fundedAt: new Date().toISOString() },
    ],
    repaymentSchedule: [],
    contractAddress: '0xefgh...',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    fundingDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    ipfsHash: 'Qm...',
  },
  {
    id: '3',
    tokenId: '103',
    studentEduId: '503',
    requestedAmount: 8000,
    fundedAmount: 0,
    repaidAmount: 0,
    interestRate: 600,
    term: 18,
    purpose: 'Graduate Program Tuition - Data Science Masters',
    status: 'pending',
    lenders: [],
    repaymentSchedule: [],
    contractAddress: '0xijkl...',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    fundingDeadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    ipfsHash: 'Qm...',
  },
]

// Mock student data (LearnScores)
const mockStudentScores: Record<string, number> = {
  '501': 785,
  '502': 640,
  '503': 850,
}

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLoan, setSelectedLoan] = useState<LoanNFT | null>(null)
  const [fundingAmount, setFundingAmount] = useState('')

  const filteredLoans = mockLoans.filter(loan =>
    loan.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
      case 'approved': return 'bg-blue-500/20 border-blue-500/50 text-blue-300'
      case 'funded': return 'bg-green-500/20 border-green-500/50 text-green-300'
      case 'repaying': return 'bg-purple-500/20 border-purple-500/50 text-purple-300'
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-300'
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 800) return { level: 'Very Low', color: 'text-green-400' }
    if (score >= 700) return { level: 'Low', color: 'text-blue-400' }
    if (score >= 600) return { level: 'Medium', color: 'text-yellow-400' }
    if (score >= 500) return { level: 'High', color: 'text-orange-400' }
    return { level: 'Very High', color: 'text-red-400' }
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
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Loan Marketplace
            </h1>
            <p className="text-slate-500 text-lg">Fund students or request loans with fair, transparent terms</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4 mr-2" />
            Request Loan
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-blue-500/30 transition-all">
            <DollarSign className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold">
              ${mockLoans.reduce((sum, l) => sum + l.requestedAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Total Requested</div>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-cyan-500/30 transition-all">
            <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
            <div className="text-3xl font-bold">
              ${mockLoans.reduce((sum, l) => sum + l.fundedAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Total Funded</div>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-indigo-500/30 transition-all">
            <Clock className="w-8 h-8 text-indigo-400 mb-3" />
            <div className="text-3xl font-bold">{mockLoans.length}</div>
            <div className="text-sm text-slate-500">Active Loans</div>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-sky-500/30 transition-all">
            <Shield className="w-8 h-8 text-sky-400 mb-3" />
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm text-slate-500">Repayment Rate</div>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              placeholder="Search loans by purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-slate-900/50 border-slate-800 focus:border-blue-500/50 text-white placeholder:text-slate-600"
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-700 hover:bg-slate-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Loan Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLoans.map((loan, index) => {
            const fundingProgress = (loan.fundedAmount / loan.requestedAmount) * 100
            const learnScore = mockStudentScores[loan.studentEduId] || 0
            const risk = getRiskLevel(learnScore)
            
            return (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedLoan(loan)}
              >
                <Card className="bg-slate-900/50 backdrop-blur-lg border-slate-800 p-6 hover:border-blue-500/30 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-slate-500 mb-1">Loan #{loan.tokenId}</div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{loan.purpose}</h3>
                    </div>
                    <Badge className={getStatusColor(loan.status)}>
                      {loan.status}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-500">Requested</span>
                        <span className="font-bold text-xl">${loan.requestedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-500">Funded</span>
                        <span className="font-bold text-blue-400">${loan.fundedAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={fundingProgress} className="h-2 bg-slate-800" />
                      <div className="text-xs text-slate-500 mt-1">{fundingProgress.toFixed(0)}% funded</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-slate-500 mb-1">Interest Rate</div>
                        <div className="font-bold">{loan.interestRate / 100}% APR</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Term</div>
                        <div className="font-bold">{loan.term} months</div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-500">LearnScore</span>
                        <span className="font-bold">{learnScore}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Risk Level</span>
                        <span className={`font-bold ${risk.color}`}>{risk.level}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20">
                    Fund Loan
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Loan Detail Modal */}
      <AnimatePresence>
        {selectedLoan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLoan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-slate-900 backdrop-blur-lg border-slate-800 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold">Loan #{selectedLoan.tokenId}</h2>
                      <Badge className={getStatusColor(selectedLoan.status)}>
                        {selectedLoan.status}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-lg">{selectedLoan.purpose}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLoan(null)}
                    className="hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Loan Details Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                    <div className="text-sm text-gray-400 mb-1">Requested Amount</div>
                    <div className="text-2xl font-bold">${selectedLoan.requestedAmount.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-sm text-gray-400 mb-1">Already Funded</div>
                    <div className="text-2xl font-bold text-green-400">${selectedLoan.fundedAmount.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                    <div className="text-sm text-gray-400 mb-1">Remaining</div>
                    <div className="text-2xl font-bold text-purple-400">
                      ${(selectedLoan.requestedAmount - selectedLoan.fundedAmount).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Funding Progress</span>
                    <span className="text-sm text-gray-400">
                      {((selectedLoan.fundedAmount / selectedLoan.requestedAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(selectedLoan.fundedAmount / selectedLoan.requestedAmount) * 100} 
                    className="h-3 bg-black/30"
                  />
                </div>

                {/* Student Info */}
                <div className="bg-black/30 rounded-xl p-6 mb-8 border border-green-500/20">
                  <h3 className="text-xl font-bold mb-4">Student Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">EduID</div>
                      <div className="font-bold">#{selectedLoan.studentEduId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">LearnScore</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">{mockStudentScores[selectedLoan.studentEduId]}</div>
                        <Badge className="bg-blue-500/20 border-blue-500/50 text-blue-300">
                          Grade B+
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Risk Assessment</div>
                      <div className={`font-bold ${getRiskLevel(mockStudentScores[selectedLoan.studentEduId]).color}`}>
                        {getRiskLevel(mockStudentScores[selectedLoan.studentEduId]).level} Risk
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Loan History</div>
                      <div className="font-bold text-green-400">100% On-Time Payments</div>
                    </div>
                  </div>
                </div>

                {/* Loan Terms */}
                <div className="bg-black/30 rounded-xl p-6 mb-8 border border-green-500/20">
                  <h3 className="text-xl font-bold mb-4">Loan Terms</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Interest Rate</div>
                      <div className="text-xl font-bold">{selectedLoan.interestRate / 100}% APR</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Loan Term</div>
                      <div className="text-xl font-bold">{selectedLoan.term} months</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Expected Return</div>
                      <div className="text-xl font-bold text-green-400">
                        ${(selectedLoan.requestedAmount * (1 + selectedLoan.interestRate / 10000)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funding Interface */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 mb-6 border border-green-500/30">
                  <h3 className="text-xl font-bold mb-4">Fund This Loan</h3>
                  <div className="flex gap-4 mb-4">
                    <Input
                      type="number"
                      placeholder="Amount to fund ($)"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(e.target.value)}
                      className="flex-1 bg-black/30 border-green-500/30 focus:border-green-500/50 text-white"
                    />
                    <Button
                      variant="outline"
                      className="border-green-500/50 hover:bg-green-500/10"
                      onClick={() => setFundingAmount((selectedLoan.requestedAmount - selectedLoan.fundedAmount).toString())}
                    >
                      Max
                    </Button>
                  </div>
                  {fundingAmount && (
                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Your Investment</span>
                        <span className="font-bold">${parseFloat(fundingAmount || '0').toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Expected Return</span>
                        <span className="font-bold text-green-400">
                          ${(parseFloat(fundingAmount || '0') * (1 + selectedLoan.interestRate / 10000)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Est. Profit</span>
                        <span className="font-bold text-green-400">
                          ${(parseFloat(fundingAmount || '0') * (selectedLoan.interestRate / 10000)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-6 text-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Fund Loan
                  </Button>
                </div>

                {/* Risk Warning */}
                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <div className="font-semibold mb-1">Investment Risk Warning</div>
                    <div>Lending involves risk. While LearnScore helps assess creditworthiness, there's no guarantee of repayment. Only invest what you can afford to lose.</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  )
}
