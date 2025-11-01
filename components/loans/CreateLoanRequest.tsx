'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, CheckCircle2, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface CreateLoanRequestProps {
  onClose?: () => void
  onSuccess?: () => void
  userLearnScore?: number
}

export function CreateLoanRequest({ onClose, onSuccess, userLearnScore = 0 }: CreateLoanRequestProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: '',
    term: '12',
    purpose: '',
    interestRate: '',
  })

  const calculateSuggestedRate = (score: number) => {
    if (score >= 800) return '5.0'
    if (score >= 700) return '7.0'
    if (score >= 600) return '10.0'
    if (score >= 500) return '13.0'
    return '15.0'
  }

  const suggestedRate = userLearnScore > 0 ? calculateSuggestedRate(userLearnScore) : '10.0'

  const calculateReturn = () => {
    const principal = parseFloat(formData.amount || '0')
    const rate = parseFloat(formData.interestRate || suggestedRate) / 100
    const term = parseInt(formData.term || '12')
    return principal * (1 + rate)
  }

  const monthlyPayment = () => {
    const total = calculateReturn()
    const term = parseInt(formData.term || '12')
    return total / term
  }

  const handleSubmit = async () => {
    // TODO: Implement smart contract interaction
    console.log('Creating loan request:', formData)
    if (onSuccess) onSuccess()
  }

  return (
    <Card className="bg-gradient-to-br from-green-950 to-emerald-950 backdrop-blur-lg border-green-500/20 p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Request a Loan</h2>
          <p className="text-gray-400">Get funded by the community</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= s ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-700'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-green-600' : 'bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Loan Details */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="amount">Loan Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder="5000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-black/30 border-green-500/30 pl-10"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Maximum: $50,000</p>
          </div>

          <div>
            <Label htmlFor="term">Loan Term (months)</Label>
            <select
              id="term"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full bg-black/30 border border-green-500/30 rounded-md px-3 py-2 text-white"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>

          <div>
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="e.g., Spring 2026 Tuition - Computer Science Program"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="bg-black/30 border-green-500/30 min-h-32"
            />
            <p className="text-xs text-gray-400 mt-1">
              Be specific and honest. Lenders review your purpose before funding.
            </p>
          </div>

          <Button
            onClick={() => setStep(2)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            disabled={!formData.amount || !formData.purpose}
          >
            Next: Set Interest Rate
          </Button>
        </motion.div>
      )}

      {/* Step 2: Interest Rate */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {userLearnScore > 0 && (
            <Card className="bg-blue-500/10 border-blue-500/30 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-blue-300 mb-1">Based on your LearnScore ({userLearnScore})</div>
                  <div className="text-gray-400">
                    We suggest an interest rate of <strong>{suggestedRate}% APR</strong>. Lower rates = faster funding!
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div>
            <Label htmlFor="rate">Interest Rate (% APR)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              placeholder={suggestedRate}
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className="bg-black/30 border-green-500/30"
            />
            <p className="text-xs text-gray-400 mt-1">
              Range: 5% - 20% APR. Lower rates attract more lenders.
            </p>
          </div>

          {formData.amount && (
            <Card className="bg-black/30 p-6 border-green-500/20">
              <h3 className="font-bold mb-4">Loan Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Principal:</span>
                  <span className="font-bold">${parseFloat(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest Rate:</span>
                  <span className="font-bold">{formData.interestRate || suggestedRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Term:</span>
                  <span className="font-bold">{formData.term} months</span>
                </div>
                <div className="h-px bg-green-500/30 my-3" />
                <div className="flex justify-between text-base">
                  <span className="text-gray-400">Total Repayment:</span>
                  <span className="font-bold text-green-400">${calculateReturn().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Payment:</span>
                  <span className="font-bold">${monthlyPayment().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="flex-1 border-green-500/50"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            >
              Next: Review
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="bg-black/30 p-6 border-green-500/20">
            <h3 className="text-xl font-bold mb-4">Loan Request Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Amount Requested</div>
                <div className="text-3xl font-bold">${parseFloat(formData.amount || '0').toLocaleString()}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Interest Rate</div>
                  <div className="text-xl font-bold">{formData.interestRate || suggestedRate}% APR</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Loan Term</div>
                  <div className="text-xl font-bold">{formData.term} months</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Purpose</div>
                <div className="text-sm bg-black/30 p-3 rounded-lg">{formData.purpose}</div>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Total Repayment</span>
                  <span className="text-2xl font-bold text-green-400">
                    ${calculateReturn().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Monthly Payment</span>
                  <span className="font-bold">
                    ${monthlyPayment().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <div className="font-semibold mb-1">Important Reminders</div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Your loan request will be visible to all potential lenders</li>
                  <li>Late payments will negatively affect your LearnScore</li>
                  <li>Make sure you can afford the monthly payments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(2)}
              variant="outline"
              className="flex-1 border-green-500/50"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-6 text-lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Submit Request
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  )
}
