'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, DollarSign, Users, CheckCircle2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface CreatePoolComponentProps {
  onClose?: () => void
  onSuccess?: () => void
}

export function CreatePoolComponent({ onClose, onSuccess }: CreatePoolComponentProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    initialFunding: '',
    minGPA: '',
    requiredCourses: [] as string[],
    needBased: false,
    incomeThreshold: '',
    customRules: '',
  })
  const [courseInput, setCourseInput] = useState('')

  const addCourse = () => {
    if (courseInput.trim() && !formData.requiredCourses.includes(courseInput.trim())) {
      setFormData({
        ...formData,
        requiredCourses: [...formData.requiredCourses, courseInput.trim()]
      })
      setCourseInput('')
    }
  }

  const removeCourse = (course: string) => {
    setFormData({
      ...formData,
      requiredCourses: formData.requiredCourses.filter(c => c !== course)
    })
  }

  const handleSubmit = async () => {
    // TODO: Implement smart contract interaction
    console.log('Creating pool with data:', formData)
    if (onSuccess) onSuccess()
  }

  return (
    <Card className="bg-gradient-to-br from-purple-950 to-pink-950 backdrop-blur-lg border-purple-500/20 p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Create Scholarship Pool</h2>
          <p className="text-gray-400">Fund students and earn Impact NFTs</p>
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
              step >= s ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-purple-600' : 'bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="name">Pool Name</Label>
            <Input
              id="name"
              placeholder="e.g., STEM Excellence Scholarship"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/30 border-purple-500/30"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and goals of this scholarship pool..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-black/30 border-purple-500/30 min-h-32"
            />
          </div>

          <div>
            <Label htmlFor="funding">Initial Funding Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="funding"
                type="number"
                placeholder="10000"
                value={formData.initialFunding}
                onChange={(e) => setFormData({ ...formData, initialFunding: e.target.value })}
                className="bg-black/30 border-purple-500/30 pl-10"
              />
            </div>
          </div>

          <Button
            onClick={() => setStep(2)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            disabled={!formData.name || !formData.description || !formData.initialFunding}
          >
            Next: Set Criteria
          </Button>
        </motion.div>
      )}

      {/* Step 2: Eligibility Criteria */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="gpa">Minimum GPA (Optional)</Label>
            <Input
              id="gpa"
              type="number"
              step="0.1"
              placeholder="3.5"
              value={formData.minGPA}
              onChange={(e) => setFormData({ ...formData, minGPA: e.target.value })}
              className="bg-black/30 border-purple-500/30"
            />
          </div>

          <div>
            <Label>Required Courses (Optional)</Label>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="e.g., CS101"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCourse())}
                className="bg-black/30 border-purple-500/30"
              />
              <Button onClick={addCourse} variant="outline" className="border-purple-500/50">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requiredCourses.map((course) => (
                <Badge key={course} variant="outline" className="border-purple-500/50 pr-1">
                  {course}
                  <button
                    onClick={() => removeCourse(course)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-3">
              <Label>Need-Based Criteria</Label>
              <button
                onClick={() => setFormData({ ...formData, needBased: !formData.needBased })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  formData.needBased ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  formData.needBased ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            {formData.needBased && (
              <Input
                type="number"
                placeholder="Income threshold (e.g., 50000)"
                value={formData.incomeThreshold}
                onChange={(e) => setFormData({ ...formData, incomeThreshold: e.target.value })}
                className="bg-black/50 border-purple-500/30"
              />
            )}
          </div>

          <div>
            <Label htmlFor="custom">Custom Rules (Optional)</Label>
            <Textarea
              id="custom"
              placeholder="Any additional requirements..."
              value={formData.customRules}
              onChange={(e) => setFormData({ ...formData, customRules: e.target.value })}
              className="bg-black/30 border-purple-500/30"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="flex-1 border-purple-500/50"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            >
              Next: Review
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review & Create */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="bg-black/30 p-6 border-purple-500/20">
            <h3 className="text-xl font-bold mb-4">Pool Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Initial Funding:</span>
                <span className="font-semibold text-green-400">${parseFloat(formData.initialFunding || '0').toLocaleString()}</span>
              </div>
              {formData.minGPA && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Min GPA:</span>
                  <span className="font-semibold">{formData.minGPA}</span>
                </div>
              )}
              {formData.requiredCourses.length > 0 && (
                <div>
                  <div className="text-gray-400 mb-2">Required Courses:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredCourses.map(course => (
                      <Badge key={course} variant="outline" className="border-purple-500/50">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {formData.needBased && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Income Threshold:</span>
                  <span className="font-semibold">${parseFloat(formData.incomeThreshold || '0').toLocaleString()}</span>
                </div>
              )}
            </div>
          </Card>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-blue-300 mb-1">You'll Receive an Impact NFT</div>
                <div className="text-gray-400">
                  Track your impact, earn governance rights, and watch your NFT evolve as students succeed.
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(2)}
              variant="outline"
              className="flex-1 border-purple-500/50"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-6 text-lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Create Pool
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  )
}
