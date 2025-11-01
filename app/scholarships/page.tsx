'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Search, Filter, TrendingUp, Users, DollarSign, CheckCircle2, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { ScholarshipPool } from '@/types/edulendx'

// Mock scholarship pools
const mockPools: ScholarshipPool[] = [
  {
    id: '1',
    name: 'STEM Excellence Scholarship',
    description: 'Supporting top-performing students in Science, Technology, Engineering, and Mathematics',
    totalFunds: 50000,
    availableFunds: 35000,
    donors: ['0x1234...', '0x5678...'],
    criteria: {
      minGPA: 3.5,
      requiredCourses: ['CS101', 'MATH201'],
      needBased: false,
      geographicRestrictions: [],
    },
    recipients: [],
    yieldGenerated: 1500,
    contractAddress: '0xabcd...',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Women in Tech Fund',
    description: 'Empowering female students pursuing technology careers',
    totalFunds: 75000,
    availableFunds: 60000,
    donors: ['0x9876...', '0x5432...', '0x1111...'],
    criteria: {
      minGPA: 3.0,
      needBased: true,
      incomeThreshold: 50000,
    },
    recipients: [],
    yieldGenerated: 2250,
    contractAddress: '0xefgh...',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'First-Generation College Fund',
    description: 'Supporting first-generation college students breaking barriers',
    totalFunds: 40000,
    availableFunds: 28000,
    donors: ['0x2222...'],
    criteria: {
      minGPA: 2.8,
      needBased: true,
      incomeThreshold: 40000,
      customRules: 'First-generation college student',
    },
    recipients: [],
    yieldGenerated: 1200,
    contractAddress: '0xijkl...',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Community Leadership Scholarship',
    description: 'Rewarding students with exceptional community service records',
    totalFunds: 30000,
    availableFunds: 20000,
    donors: ['0x3333...', '0x4444...'],
    criteria: {
      minGPA: 3.2,
      customRules: 'Minimum 100 hours of community service',
    },
    recipients: [],
    yieldGenerated: 900,
    contractAddress: '0xmnop...',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
]

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPool, setSelectedPool] = useState<ScholarshipPool | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredPools = mockPools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Scholarship Pools
            </h1>
            <p className="text-gray-400 text-lg">Discover funding opportunities for your education</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
            <Plus className="w-4 h-4 mr-2" />
            Create Pool
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-purple-500/20 p-6">
            <Award className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-bold">{mockPools.length}</div>
            <div className="text-sm text-gray-400">Active Pools</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-500/20 p-6">
            <DollarSign className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-bold">
              ${mockPools.reduce((sum, p) => sum + p.availableFunds, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Available Funds</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-blue-500/20 p-6">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold">
              {mockPools.reduce((sum, p) => sum + p.donors.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Donors</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg border-orange-500/20 p-6">
            <TrendingUp className="w-8 h-8 text-orange-400 mb-3" />
            <div className="text-3xl font-bold">
              ${mockPools.reduce((sum, p) => sum + p.yieldGenerated, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Yield Generated</div>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-black/30 border-purple-500/30 focus:border-purple-500/50 text-white"
            />
          </div>
          <Button
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Scholarship Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredPools.map((pool, index) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => setSelectedPool(pool)}
            >
              <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-500/50 transition-all h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{pool.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{pool.description}</p>
                  </div>
                  <Badge className="bg-green-500/20 border-green-500/50 text-green-300 ml-4">
                    {pool.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Available Funds</span>
                    <span className="font-bold text-green-400">${pool.availableFunds.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Min GPA Required</span>
                    <span className="font-bold">{pool.criteria.minGPA || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Donors</span>
                    <span className="font-bold">{pool.donors.length}</span>
                  </div>
                </div>

                {/* Criteria Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pool.criteria.minGPA && (
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                      GPA ≥ {pool.criteria.minGPA}
                    </Badge>
                  )}
                  {pool.criteria.needBased && (
                    <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                      Need-Based
                    </Badge>
                  )}
                  {pool.criteria.requiredCourses && pool.criteria.requiredCourses.length > 0 && (
                    <Badge variant="outline" className="border-pink-500/30 text-pink-300 text-xs">
                      {pool.criteria.requiredCourses.length} Required Courses
                    </Badge>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pool Detail Modal */}
      <AnimatePresence>
        {selectedPool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPool(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-gradient-to-br from-purple-950 to-pink-950 backdrop-blur-lg border-purple-500/20 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPool.name}</h2>
                    <p className="text-gray-400">{selectedPool.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPool(null)}
                    className="hover:bg-purple-500/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Pool Stats */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                    <div className="text-sm text-gray-400 mb-1">Total Funds</div>
                    <div className="text-2xl font-bold">${selectedPool.totalFunds.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                    <div className="text-sm text-gray-400 mb-1">Available</div>
                    <div className="text-2xl font-bold text-green-400">${selectedPool.availableFunds.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-sm text-gray-400 mb-1">Yield Generated</div>
                    <div className="text-2xl font-bold text-blue-400">${selectedPool.yieldGenerated.toLocaleString()}</div>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Eligibility Criteria</h3>
                  <div className="space-y-3">
                    {selectedPool.criteria.minGPA && (
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Minimum GPA: {selectedPool.criteria.minGPA}</span>
                      </div>
                    )}
                    {selectedPool.criteria.requiredCourses && selectedPool.criteria.requiredCourses.length > 0 && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="font-medium mb-1">Required Courses:</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedPool.criteria.requiredCourses.map((course, idx) => (
                              <Badge key={idx} variant="outline" className="border-purple-500/30 text-purple-300">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedPool.criteria.needBased && (
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Need-Based (Income ≤ ${selectedPool.criteria.incomeThreshold?.toLocaleString() || 'N/A'})</span>
                      </div>
                    )}
                    {selectedPool.criteria.customRules && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>{selectedPool.criteria.customRules}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-6 text-lg">
                    Apply for Scholarship
                  </Button>
                  <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10 py-6">
                    Share
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
