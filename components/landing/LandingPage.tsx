'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Shield, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Target,
  Award,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] pointer-events-none" />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300 font-medium">Powered by <span className="font-bold text-cyan-400">Kwala</span></span>
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-gradient">
                EduLendX
              </span>
            </h1>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionize Education Finance
            </h2>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              The first decentralized platform combining <span className="text-blue-400 font-semibold">peer-to-peer lending</span>, 
              <span className="text-cyan-400 font-semibold"> merit-based scholarships</span>, and 
              <span className="text-indigo-400 font-semibold"> AI-powered credit scoring</span> to democratize access to education.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/dashboard">
                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-blue-500/30 transition-all hover:scale-105">
                  Launch App
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
  size="lg"
  className="bg-transparent border-2 border-slate-700 text-white px-8 py-6 text-lg rounded-xl backdrop-blur-sm font-semibold transition-none"
>
  Watch Demo
</Button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'Total Funded', value: '$2.5M+', icon: TrendingUp, color: 'blue' },
                { label: 'Active Loans', value: '1,234', icon: Users, color: 'cyan' },
                { label: 'Scholarships', value: '456', icon: Award, color: 'indigo' },
                { label: 'Students Helped', value: '3,890', icon: GraduationCap, color: 'blue' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-blue-500/30 transition-all"
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Features</Badge>
            <h2 className="text-5xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology with AI-powered insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Decentralized Lending',
                description: 'Peer-to-peer loans without intermediaries. Smart contracts ensure transparent, automated repayments.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Award,
                title: 'Merit-Based Scholarships',
                description: 'Community-funded scholarship pools with transparent eligibility criteria and blockchain-verified distribution.',
                gradient: 'from-cyan-500 to-indigo-500'
              },
              {
                icon: Zap,
                title: 'AI LearnScore',
                description: 'Dynamic credit scoring based on academic performance, course completion, and on-chain reputation.',
                gradient: 'from-indigo-500 to-blue-500'
              },
              {
                icon: Users,
                title: 'DAO Governance',
                description: 'Token holders vote on platform policies, scholarship criteria, and community proposals.',
                gradient: 'from-blue-500 to-sky-500'
              },
              {
                icon: Lock,
                title: 'Secure & Transparent',
                description: 'All transactions on-chain, immutable records, and cryptographic verification of credentials.',
                gradient: 'from-sky-500 to-cyan-500'
              },
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Borderless education finance for students worldwide, with multi-currency support.',
                gradient: 'from-cyan-500 to-blue-500'
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-slate-900/50 backdrop-blur-md border-slate-800 hover:border-blue-500/30 transition-all duration-300 group hover:scale-105">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-500 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-purple-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Process</Badge>
            <h2 className="text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, secure, and transparent in just three steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Connect & Verify',
                description: 'Link your wallet and verify your educational credentials through our EduID system.',
                icon: Target
              },
              {
                step: '02',
                title: 'Build Your LearnScore',
                description: 'Complete courses, earn certifications, and build your on-chain reputation.',
                icon: BarChart3
              },
              {
                step: '03',
                title: 'Access Funding',
                description: 'Apply for loans with AI-determined rates or compete for merit-based scholarships.',
                icon: CheckCircle
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-purple-500/10 mb-4">{item.step}</div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/30">Testimonials</Badge>
            <h2 className="text-5xl font-bold text-white mb-4">Trusted by Students Worldwide</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Computer Science Student',
                content: 'EduLendX helped me secure funding for my Masters without the traditional loan bureaucracy. The LearnScore system rewarded my academic excellence with better rates!',
                rating: 5
              },
              {
                name: 'Marcus Johnson',
                role: 'Scholarship Recipient',
                content: 'I received a merit-based scholarship through the platform. The transparent selection process and instant blockchain verification made it incredibly trustworthy.',
                rating: 5
              },
              {
                name: 'Priya Patel',
                role: 'AI/ML Researcher',
                content: 'As a lender, I love supporting students directly while earning competitive returns. The smart contracts automate everything and eliminate counterparty risk.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-slate-300 text-base leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                EduLendX
              </h3>
              <p className="text-slate-500 mb-4">
                Democratizing access to education through blockchain innovation.
              </p>
              <p className="text-sm text-slate-600">
                Powered by <span className="font-semibold text-cyan-400">Kwala</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-600">
                <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/loans" className="hover:text-cyan-400 transition-colors">Loans</Link></li>
                <li><Link href="/scholarships" className="hover:text-cyan-400 transition-colors">Scholarships</Link></li>
                <li><Link href="/governance" className="hover:text-cyan-400 transition-colors">Governance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-slate-600">
            <p>&copy; 2024 EduLendX. All rights reserved. Built with ❤️ for students worldwide.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
