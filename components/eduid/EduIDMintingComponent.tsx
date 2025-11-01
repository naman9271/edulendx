'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  GraduationCap,
  User,
  Mail,
  Upload,
  Plus,
  X,
  CheckCircle,
  Loader2,
  Shield,
} from 'lucide-react'
import { AcademicRecord } from '@/types/edulendx'

interface EduIDMintFormData {
  worldId?: string
  verifiedName: string
  verifiedEmail: string
  profileImage?: File
  academicRecords: Partial<AcademicRecord>[]
}

export function EduIDMintingComponent() {
  const [step, setStep] = useState(1)
  const [isVerified, setIsVerified] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [formData, setFormData] = useState<EduIDMintFormData>({
    verifiedName: '',
    verifiedEmail: '',
    academicRecords: [],
  })

  const [currentRecord, setCurrentRecord] = useState<Partial<AcademicRecord>>({
    institution: '',
    degree: '',
    gpa: 0,
    coursesCompleted: [],
    verificationStatus: 'pending',
    certificates: [],
  })

  const [courseInput, setCourseInput] = useState('')

  // Step 1: WorldID Verification (Simulated)
  const handleWorldIDVerify = async () => {
    // In production, integrate with WorldID SDK
    setIsVerified(true)
    setFormData({
      ...formData,
      worldId: '0x' + Math.random().toString(16).substring(2, 42),
    })
  }

  // Step 2: Personal Information
  const handlePersonalInfo = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  // Step 3: Academic Records
  const handleRecordChange = (field: string, value: any) => {
    setCurrentRecord({ ...currentRecord, [field]: value })
  }

  const addCourse = () => {
    if (courseInput.trim()) {
      setCurrentRecord({
        ...currentRecord,
        coursesCompleted: [
          ...(currentRecord.coursesCompleted || []),
          courseInput.trim(),
        ],
      })
      setCourseInput('')
    }
  }

  const removeCourse = (index: number) => {
    const updated = [...(currentRecord.coursesCompleted || [])]
    updated.splice(index, 1)
    setCurrentRecord({ ...currentRecord, coursesCompleted: updated })
  }

  const addAcademicRecord = () => {
    if (currentRecord.institution && currentRecord.degree) {
      setFormData({
        ...formData,
        academicRecords: [...formData.academicRecords, currentRecord],
      })
      setCurrentRecord({
        institution: '',
        degree: '',
        gpa: 0,
        coursesCompleted: [],
        verificationStatus: 'pending',
        certificates: [],
      })
    }
  }

  const removeAcademicRecord = (index: number) => {
    const updated = [...formData.academicRecords]
    updated.splice(index, 1)
    setFormData({ ...formData, academicRecords: updated })
  }

  // Handle Minting
  const handleMint = async () => {
    setIsMinting(true)
    try {
      // In production: Upload to IPFS, call smart contract
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate transaction
      alert('EduID NFT Minted Successfully! 🎉')
      // Reset form or redirect to dashboard
    } catch (error) {
      console.error('Minting error:', error)
      alert('Failed to mint EduID NFT')
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Create Your EduID
        </h1>
        <p className="text-gray-400">
          Your soulbound academic identity on the blockchain
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {['Verify Identity', 'Personal Info', 'Academic Records', 'Review & Mint'].map(
          (label, index) => (
            <div
              key={label}
              className={`flex flex-col items-center ${
                step > index + 1
                  ? 'text-green-500'
                  : step === index + 1
                  ? 'text-purple-500'
                  : 'text-gray-500'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1
                    ? 'bg-green-500'
                    : step === index + 1
                    ? 'bg-purple-500'
                    : 'bg-gray-700'
                }`}
              >
                {step > index + 1 ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-white font-bold">{index + 1}</span>
                )}
              </div>
              <span className="text-xs text-center hidden sm:block">{label}</span>
            </div>
          )
        )}
      </div>

      {/* Step 1: WorldID Verification */}
      {step === 1 && (
        <Card className="bg-gray-900 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple-500" />
              <span>Verify Your Identity</span>
            </CardTitle>
            <CardDescription>
              Use WorldID to prove you're a unique human (optional but recommended)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isVerified ? (
              <>
                <p className="text-sm text-gray-400">
                  Verifying your identity with WorldID increases your credibility and
                  improves your LearnScore.
                </p>
                <Button
                  onClick={handleWorldIDVerify}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Verify with WorldID
                </Button>
                <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                  Skip for Now
                </Button>
              </>
            ) : (
              <>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-500">Verified!</p>
                    <p className="text-sm text-gray-400">WorldID: {formData.worldId}</p>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full">
                  Continue
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Personal Information */}
      {step === 2 && (
        <Card className="bg-gray-900 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6 text-purple-500" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.verifiedName}
                onChange={(e) => handlePersonalInfo('verifiedName', e.target.value)}
                placeholder="John Doe"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.verifiedEmail}
                onChange={(e) => handlePersonalInfo('verifiedEmail', e.target.value)}
                placeholder="john@university.edu"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="profile">Profile Image (Optional)</Label>
              <Input
                id="profile"
                type="file"
                accept="image/*"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.verifiedName || !formData.verifiedEmail}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Academic Records */}
      {step === 3 && (
        <Card className="bg-gray-900 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-purple-500" />
              <span>Academic Records</span>
            </CardTitle>
            <CardDescription>
              Add your educational background and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Added Records */}
            {formData.academicRecords.length > 0 && (
              <div className="space-y-3">
                <Label>Added Records:</Label>
                {formData.academicRecords.map((record, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold">{record.institution}</p>
                      <p className="text-sm text-gray-400">
                        {record.degree} • GPA: {record.gpa}
                      </p>
                      <p className="text-xs text-gray-500">
                        {record.coursesCompleted?.length} courses
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAcademicRecord(index)}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Record Form */}
            <div className="border border-gray-700 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Add Academic Record</h4>
              
              <div>
                <Label>Institution *</Label>
                <Input
                  value={currentRecord.institution}
                  onChange={(e) => handleRecordChange('institution', e.target.value)}
                  placeholder="e.g., MIT, Stanford University"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label>Degree/Program *</Label>
                <Input
                  value={currentRecord.degree}
                  onChange={(e) => handleRecordChange('degree', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label>GPA (0-4.0)</Label>
                <Input
                  type="number"
                  min="0"
                  max="4"
                  step="0.01"
                  value={currentRecord.gpa}
                  onChange={(e) => handleRecordChange('gpa', parseFloat(e.target.value))}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label>Courses Completed</Label>
                <div className="flex space-x-2">
                  <Input
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCourse()}
                    placeholder="e.g., CS101, MATH201"
                    className="bg-gray-800 border-gray-700"
                  />
                  <Button onClick={addCourse} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentRecord.coursesCompleted?.map((course, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300"
                    >
                      {course}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeCourse(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={addAcademicRecord}
                disabled={!currentRecord.institution || !currentRecord.degree}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={formData.academicRecords.length === 0}
                className="flex-1"
              >
                Continue to Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Mint */}
      {step === 4 && (
        <Card className="bg-gray-900 border-purple-500/20">
          <CardHeader>
            <CardTitle>Review Your EduID</CardTitle>
            <CardDescription>Please verify all information before minting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info Review */}
            <div>
              <h4 className="font-semibold mb-2 text-purple-400">Personal Information</h4>
              <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                {isVerified && (
                  <div className="flex items-center space-x-2 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">WorldID Verified</span>
                  </div>
                )}
                <p>
                  <span className="text-gray-400">Name:</span> {formData.verifiedName}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span> {formData.verifiedEmail}
                </p>
              </div>
            </div>

            {/* Academic Records Review */}
            <div>
              <h4 className="font-semibold mb-2 text-purple-400">Academic Records</h4>
              <div className="space-y-3">
                {formData.academicRecords.map((record, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <p className="font-semibold">{record.institution}</p>
                    <p className="text-sm text-gray-400 mt-1">{record.degree}</p>
                    <p className="text-sm text-gray-400">GPA: {record.gpa}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {record.coursesCompleted?.map((course, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Estimation */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-400">Estimated Gas Fee:</p>
              <p className="text-xl font-bold">~0.05 KWALA</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                onClick={handleMint}
                disabled={isMinting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isMinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  'Mint EduID NFT'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
