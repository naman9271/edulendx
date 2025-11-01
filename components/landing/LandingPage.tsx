"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Heart,
  TrendingUp,
  Award,
  Users,
  Target,
  BookOpen,
  Coins,
} from "lucide-react";

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "EduID NFT",
      description:
        "Soulbound academic identity with verified records and reputation score",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Scholarship Pools",
      description:
        "Auto-disbursing funds based on academic achievement and need",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "NFT-Backed Loans",
      description:
        "Micro-loans secured by your academic reputation and on-chain credit",
    },
  ];

  const handleGetStarted = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-blob animation-delay-2000" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduLendX</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#marketplace"
              className="text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              Marketplace
            </a>
          </nav>

          <Button
            onClick={handleGetStarted}
            className="bg-indigo-600 hover:bg-indigo-700 text-white border-0"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-zinc-800/50 text-zinc-300 border-zinc-700"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Decentralized Education Lending on Kwala
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Fund <span className="text-indigo-500">Education</span>
              <br />
              Build <span className="text-purple-500">Your Future</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Decentralized platform where students earn scholarships or secure
              micro-loans using NFT-based academic identity and reputation.
              Transparent, on-chain education funding powered by Kwala.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 h-auto"
            >
              Start Your Journey
              <GraduationCap className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 text-lg px-8 py-6 h-auto"
            >
              Explore Marketplace
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`text-center p-6 rounded-xl transition-all duration-300 ${
                      currentFeature === index
                        ? "bg-indigo-500/10 border border-indigo-500/30"
                        : "bg-zinc-800/30 border border-zinc-700/50"
                    }`}
                    animate={{
                      scale: currentFeature === index ? 1.05 : 1,
                      y: currentFeature === index ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        currentFeature === index
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-zinc-700 text-zinc-400"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Complete education financing ecosystem powered by blockchain
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "EduID NFT System",
                description:
                  "Soulbound NFTs serve as your academic passport with verified identity, records, and reputation",
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Smart Scholarship Pools",
                description:
                  "Donors create auto-disbursing funds with achievement-based triggers and transparent tracking",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "NFT-Backed Loans",
                description:
                  "P2P micro-loans secured by academic reputation with automatic repayment tracking",
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "LearnScore Engine",
                description:
                  "On-chain credit score based on academic achievements and financial responsibility",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Impact NFTs",
                description:
                  "Donors receive evolving NFTs showcasing real-world impact and DAO governance rights",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "DAO Governance",
                description:
                  "Community-driven decision making for scholarship criteria and fund distribution",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="bg-indigo-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <div className="text-indigo-400">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-zinc-400 text-lg">
              Simple, secure, and transparent education financing
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create EduID",
                description: "Mint your Soulbound academic identity NFT",
                icon: <GraduationCap className="h-8 w-8" />,
              },
              {
                step: "02",
                title: "Build Reputation",
                description: "Earn LearnScore through verified achievements",
                icon: <TrendingUp className="h-8 w-8" />,
              },
              {
                step: "03",
                title: "Apply for Funding",
                description: "Access scholarships or apply for micro-loans",
                icon: <Coins className="h-8 w-8" />,
              },
              {
                step: "04",
                title: "Track & Repay",
                description: "Build credit and unlock more opportunities",
                icon: <Target className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent" />
                )}
                <div className="bg-indigo-500/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
                  <div className="text-indigo-400">{step.icon}</div>
                </div>
                <div className="text-2xl font-bold text-indigo-400 mb-2">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "$2.5M+", label: "Total Funded" },
                { value: "1,250+", label: "Students Helped" },
                { value: "350+", label: "Active Scholarships" },
                { value: "95%", label: "Repayment Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold text-indigo-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Education Financing?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Join the future of education funding with blockchain, AI, and
              decentralized finance
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-12 py-6 h-auto"
            >
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">EduLendX</span>
          </div>
          <p className="text-zinc-400">
            Powered by Kwala • Secured by blockchain • Funded by community
          </p>
        </div>
      </footer>
    </div>
  );
}
