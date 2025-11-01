'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Vote, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CreateProposalProps {
  onClose?: () => void
  onSuccess?: () => void
}

export function CreateProposal({ onClose, onSuccess }: CreateProposalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'other' as 'scholarship-criteria' | 'interest-rate' | 'fund-distribution' | 'other',
  })

  const handleSubmit = async () => {
    // TODO: Implement smart contract interaction
    console.log('Creating proposal:', formData)
    if (onSuccess) onSuccess()
  }

  return (
    <Card className="bg-gradient-to-br from-blue-950 to-cyan-950 backdrop-blur-lg border-blue-500/20 p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Create Proposal</h2>
          <p className="text-gray-400">Shape the future of EduLendX</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="type">Proposal Type</Label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="w-full bg-black/30 border border-blue-500/30 rounded-md px-3 py-2 text-white"
          >
            <option value="scholarship-criteria">Scholarship Criteria</option>
            <option value="interest-rate">Interest Rate Adjustment</option>
            <option value="fund-distribution">Fund Distribution</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="title">Proposal Title</Label>
          <Input
            id="title"
            placeholder="Brief, descriptive title for your proposal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-black/30 border-blue-500/30"
          />
        </div>

        <div>
          <Label htmlFor="description">Detailed Description</Label>
          <Textarea
            id="description"
            placeholder="Explain your proposal in detail. Include rationale, expected impact, and implementation steps..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-black/30 border-blue-500/30 min-h-48"
          />
          <p className="text-xs text-gray-400 mt-1">
            Minimum 100 characters. Be clear and comprehensive.
          </p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <div className="font-semibold text-blue-300">Voting Requirements:</div>
            <ul className="list-disc list-inside space-y-1 text-gray-400 text-xs">
              <li>Minimum 50,000 voting power required to pass (quorum)</li>
              <li>Voting period: 7 days</li>
              <li>Simple majority ({'>'}50% for votes) required</li>
              <li>You must hold an Impact NFT or governance tokens to propose</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 py-6 text-lg"
          disabled={!formData.title || formData.description.length < 100}
        >
          <Vote className="w-5 h-5 mr-2" />
          Submit Proposal
        </Button>
      </div>
    </Card>
  )
}
