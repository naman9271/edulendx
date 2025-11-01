'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, CheckCircle2, XCircle, Clock, Plus, Vote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { DAOProposal } from '@/types/edulendx'

// Mock proposals
const mockProposals: DAOProposal[] = [
  {
    id: '1',
    title: 'Reduce Minimum GPA Requirement for Need-Based Scholarships',
    description: 'Proposal to lower the minimum GPA from 3.0 to 2.5 for need-based scholarship pools to increase accessibility for students facing financial hardship.',
    type: 'scholarship-criteria',
    proposer: '0x1234...',
    votesFor: 45000,
    votesAgainst: 12000,
    status: 'active',
    voters: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    votingEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    executedAt: undefined,
  },
  {
    id: '2',
    title: 'Introduce Dynamic Interest Rate Adjustments',
    description: 'Implement a system where interest rates automatically adjust based on real-time LearnScore changes, rewarding students who improve their academic performance.',
    type: 'interest-rate',
    proposer: '0x5678...',
    votesFor: 38000,
    votesAgainst: 28000,
    status: 'active',
    voters: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    votingEnds: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    executedAt: undefined,
  },
  {
    id: '3',
    title: 'Allocate 10% of Treasury to Emergency Student Fund',
    description: 'Create an emergency fund pool that provides instant micro-grants to students facing unexpected financial emergencies (medical, housing, etc.).',
    type: 'fund-distribution',
    proposer: '0x9abc...',
    votesFor: 62000,
    votesAgainst: 8000,
    status: 'passed',
    voters: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    votingEnds: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    executedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<DAOProposal | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 border-blue-500/50 text-blue-300'
      case 'passed': return 'bg-green-500/20 border-green-500/50 text-green-300'
      case 'rejected': return 'bg-red-500/20 border-red-500/50 text-red-300'
      case 'executed': return 'bg-purple-500/20 border-purple-500/50 text-purple-300'
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-300'
    }
  }

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime()
    const end = new Date(endDate).getTime()
    const diff = end - now
    
    if (diff <= 0) return 'Voting ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h remaining`
    return `${hours}h remaining`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black p-4 pt-24">
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
              DAO Governance
            </h1>
            <p className="text-gray-400 text-lg">Shape the future of education financing through democratic voting</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-blue-500/20 p-6">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold">1,247</div>
            <div className="text-sm text-gray-400">Active Voters</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-500/20 p-6">
            <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-bold">{mockProposals.filter(p => p.status === 'passed').length}</div>
            <div className="text-sm text-gray-400">Passed Proposals</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg border-orange-500/20 p-6">
            <Clock className="w-8 h-8 text-orange-400 mb-3" />
            <div className="text-3xl font-bold">{mockProposals.filter(p => p.status === 'active').length}</div>
            <div className="text-sm text-gray-400">Active Proposals</div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-purple-500/20 p-6">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-bold">156K</div>
            <div className="text-sm text-gray-400">Total Voting Power</div>
          </Card>
        </motion.div>

        {/* Proposals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Proposals</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/10 text-sm">
                Active
              </Button>
              <Button variant="ghost" className="text-sm text-gray-400">
                Passed
              </Button>
              <Button variant="ghost" className="text-sm text-gray-400">
                Rejected
              </Button>
            </div>
          </div>

          {mockProposals.map((proposal, index) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst
            const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0
            const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0
            const quorumRequired = 50000 // Mock quorum
            const quorumProgress = (totalVotes / quorumRequired) * 100

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="bg-gradient-to-br from-blue-950/50 to-cyan-950/50 backdrop-blur-lg border-blue-500/20 p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{proposal.title}</h3>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{proposal.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Proposed by {proposal.proposer}</span>
                        <span>•</span>
                        <span>{getTimeRemaining(proposal.votingEnds)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Voting Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium">For</span>
                        </div>
                        <span className="text-sm font-bold">
                          {proposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={forPercentage} className="h-2 bg-black/30" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-sm font-medium">Against</span>
                        </div>
                        <span className="text-sm font-bold">
                          {proposal.votesAgainst.toLocaleString()} ({againstPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={againstPercentage} className="h-2 bg-black/30" />
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Quorum Progress</span>
                        <span className="text-sm font-bold">
                          {totalVotes.toLocaleString()} / {quorumRequired.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={quorumProgress} className="h-2 bg-black/50" />
                      <div className="text-xs text-gray-400 mt-1">
                        {quorumProgress >= 100 ? 'Quorum reached ✓' : `${(100 - quorumProgress).toFixed(1)}% more needed`}
                      </div>
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  {proposal.status === 'active' && (
                    <div className="flex gap-4 mt-6">
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500">
                        <XCircle className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {proposal.status === 'passed' && (
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                      <Vote className="w-4 h-4 mr-2" />
                      Execute Proposal
                    </Button>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Your Voting Power */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 backdrop-blur-lg border-purple-500/20 p-8">
            <h2 className="text-2xl font-bold mb-6">Your Voting Power</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Impact NFTs</div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-xs text-gray-400 mt-1">15,000 voting power</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Governance Tokens</div>
                <div className="text-3xl font-bold">2,500</div>
                <div className="text-xs text-gray-400 mt-1">2,500 voting power</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Total Voting Power</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  17,500
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
