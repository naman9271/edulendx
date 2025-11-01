# 🎓 EduLendX - Decentralized Education Lending Platform

<div align="center">

![EduLendX Banner](https://via.placeholder.com/1200x300/7c3aed/ffffff?text=EduLendX+|+Decentralized+Education+Finance)

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A revolutionary platform built on Kwala that enables students to automatically earn scholarships or secure micro-loans using NFT-based academic identity and on-chain reputation.**

[🚀 Live Demo](#) • [📖 Documentation](./ARCHITECTURE.md) • [🎯 User Guide](./USER_GUIDE.md) • [🔧 Build Guide](./BUILD_GUIDE.md)

</div>

---

## 🌟 Vision

> **"Making education accessible to everyone through transparent, automated, blockchain-based financing."**

EduLendX revolutionizes education financing by creating a decentralized ecosystem where students build on-chain academic identities, donors create automated scholarship pools, and lenders provide micro-loans based on reputation—all transparent and trustless.

---

## ✨ Key Features

### 1️⃣ **EduID (Soulbound Student Identity NFT)**
- 🎫 **Non-transferable NFT** representing your academic identity
- 🔐 **WorldID verification** for proof of unique human
- 📚 **Academic record storage** with IPFS metadata
- 🏆 **LearnScore** - Your on-chain reputation (0-1000 points)
- 📜 **Scholarship & loan history** tracking

### 2️⃣ **Automated Scholarship Pools**
- 💰 Donors create **smart contract pools** with custom criteria
- 🎯 **Auto-disbursement** on achievement triggers (GPA, courses, etc.)
- 📊 **DeFi yield generation** on pooled funds
- 🎨 Donors receive **evolving Impact NFTs** tracking real-world impact
- 🗳️ **DAO governance rights** for major contributors

### 3️⃣ **NFT-Backed Loan Marketplace**
- 📋 Students mint **LoanNFTs** with terms and purpose
- 🤝 **Fractional funding** from multiple lenders
- 💳 **Automated repayment** tracking
- 📈 **Credit building** through successful repayments
- ⚡ **Interest rates** based on LearnScore (5-25%)

### 4️⃣ **LearnScore Reputation Engine**

```
LearnScore Calculation (Max 1000):
├── Academic Achievements (400 points)
│   ├── GPA (200 pts)
│   ├── Courses Completed (100 pts)
│   └── Certificates (100 pts)
├── Loan Repayment History (350 points)
│   ├── On-time Payments (+5 each)
│   ├── Completed Loans (+50 each)
│   ├── Late Payments (-10 each)
│   └── Defaults (-100 each)
├── Scholarships Earned (150 points)
│   └── Based on count & amount
└── Community Contribution (100 points)
    ├── DAO Voting
    ├── Helping Others
    └── Platform Activity
```

**Grade System**: A+ (900+), A (800+), B+ (700+), B (600+), C+ (500+), C (400+), D (300+), F (<300)

### 5️⃣ **Dynamic Impact NFTs for Donors**
- 🎁 Minted when you fund a student
- 🔄 **Metadata evolves** as students succeed
- 🌟 **Level progression**: Bronze → Silver → Gold → Platinum
- 🗳️ **Governance power** increases with impact
- 📊 **Track student outcomes** in real-time

### 6️⃣ **DAO Governance**
- 📝 **Propose changes** to platform parameters
- 🗳️ **Vote on**:
  - Scholarship criteria modifications
  - Interest rate adjustments
  - Treasury fund allocation
  - Platform upgrades
- 💪 **Voting power** from Impact NFTs or governance tokens

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

### Blockchain
- **Network**: Kwala (Polygon-compatible)
- **Wallet**: [RainbowKit](https://www.rainbowkit.com/) 2.1
- **Web3 Library**: [Wagmi](https://wagmi.sh/) 2.12 + [Viem](https://viem.sh/) 2.21
- **State Management**: [TanStack Query](https://tanstack.com/query) 5.59

### Smart Contracts
- **Language**: Solidity ^0.8.20
- **Standards**: ERC-721 (NFTs), ERC-20 (Tokens), EIP-5192 (Soulbound)
- **Framework**: Hardhat / Foundry

### Storage & Services
- **NFT Metadata**: [IPFS](https://ipfs.tech/) via [Pinata](https://www.pinata.cloud/)
- **Identity**: [WorldID](https://worldcoin.org/world-id)
- **Oracles**: [Chainlink Functions](https://chain.link/)
- **Database** (Optional): [Supabase](https://supabase.com/)
- **AI** (Optional): [Google Generative AI](https://ai.google.dev/)

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
npm / yarn / pnpm
MetaMask or Web3 wallet
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/edulendx-nextjs.git
cd edulendx-nextjs

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

### Essential Environment Variables

```env
# Required
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Addresses (after deployment)
NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=0x...

# Optional
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_WORLD_ID_APP_ID=app_staging_xxx
```

---

## 📁 Project Structure

```
edulendx-nextjs/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with Web3Provider
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/
│   ├── eduid/                   # EduID NFT components
│   │   └── EduIDMintingComponent.tsx  ✅ Built
│   ├── scholarships/            # Scholarship components (TODO)
│   ├── loans/                   # Loan marketplace (TODO)
│   ├── dashboard/               # Student & Donor dashboards (TODO)
│   └── ui/                      # Reusable UI components
│       ├── header.tsx           ✅ Built (with wallet connect)
│       ├── learn-score-display.tsx  ✅ Built
│       ├── progress.tsx         ✅ Built
│       └── ... (shadcn/ui components)
├── lib/
│   ├── chains.ts                ✅ Kwala & Polygon chain configs
│   ├── wagmi.ts                 ✅ Wagmi configuration
│   ├── providers.tsx            ✅ Web3Provider wrapper
│   ├── contracts.ts             ✅ Contract helpers
│   ├── format.ts                ✅ Formatting utilities
│   ├── learnScore.ts            ✅ LearnScore calculation engine
│   └── utils.ts                 ✅ General utilities
├── types/
│   └── edulendx.ts              ✅ Complete TypeScript definitions
├── hooks/                       # Custom React hooks (TODO)
├── docs/
│   ├── ARCHITECTURE.md          ✅ System architecture
│   ├── API_REFERENCE.md         ✅ API documentation
│   ├── DEPLOYMENT.md            ✅ Deployment guide
│   ├── USER_GUIDE.md            ✅ User manual
│   └── BUILD_GUIDE.md           ✅ Build instructions
├── .env.example                 ✅ Environment template
├── package.json                 ✅ Dependencies configured
└── README.md                    ✅ This file
```

**Legend**: ✅ = Built | TODO = To be implemented

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [**ARCHITECTURE.md**](./ARCHITECTURE.md) | System architecture, components, data flow, diagrams |
| [**API_REFERENCE.md**](./API_REFERENCE.md) | Smart contract ABIs, React hooks, utilities |
| [**DEPLOYMENT.md**](./DEPLOYMENT.md) | Step-by-step deployment guide (contracts + frontend) |
| [**USER_GUIDE.md**](./USER_GUIDE.md) | End-user manual for students, donors, lenders |
| [**BUILD_GUIDE.md**](./BUILD_GUIDE.md) | Technical build documentation for developers |

---

## 🎯 Core Workflows

### Student Journey
```
1. Connect Wallet (RainbowKit)
   ↓
2. Verify Identity (WorldID) [Optional]
   ↓
3. Mint EduID NFT (Soulbound)
   ↓
4. Upload Academic Records
   ↓
5. Apply for Scholarship OR Request Loan
   ↓
6. Receive Funds Automatically
   ↓
7. Make Repayments (for loans)
   ↓
8. Build LearnScore → Better Terms
```

### Donor Journey
```
1. Connect Wallet
   ↓
2. Create Scholarship Pool
   ↓
3. Set Eligibility Criteria
   ↓
4. Deposit Funds
   ↓
5. Students Auto-matched
   ↓
6. Receive Impact NFT
   ↓
7. Track Student Success
   ↓
8. Impact NFT Evolves
```

### Lender Journey
```
1. Browse Loan Marketplace
   ↓
2. Review Student EduID & LearnScore
   ↓
3. Fund Loan (Full/Partial)
   ↓
4. Receive Loan NFT Share
   ↓
5. Track Repayments
   ↓
6. Earn Returns + Interest
```

---

## 🔥 Current Status & Roadmap

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Complete TypeScript type definitions
- [x] Documentation suite (Architecture, API, Deployment, User Guide)
- [x] Blockchain infrastructure (RainbowKit + Wagmi + Viem)
- [x] LearnScore calculation engine
- [x] UI component library setup
- [x] EduID minting component (UI)
- [x] LearnScore visualization component
- [x] Header with wallet connection

### 🚧 Phase 2: Core Features (IN PROGRESS)
- [ ] Smart contract development & deployment
- [ ] Scholarship pool creation interface
- [ ] Loan marketplace (request + funding)
- [ ] Student dashboard
- [ ] Donor dashboard
- [ ] Custom React hooks for contract interaction
- [ ] IPFS integration (Pinata)

### 🔮 Phase 3: Advanced Features (PLANNED)
- [ ] DAO governance interface
- [ ] Impact NFT visualization
- [ ] Analytics dashboard
- [ ] Notification system
- [ ] Mobile responsiveness optimization
- [ ] Onboarding tutorial

### 🚀 Phase 4: Launch (FUTURE)
- [ ] Security audit
- [ ] Testnet deployment
- [ ] Beta testing
- [ ] Mainnet launch
- [ ] Marketing & community building

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📊 Platform Statistics (Live)

| Metric | Value |
|--------|-------|
| 🎓 Total Students | Coming Soon |
| 💰 Scholarships Disbursed | Coming Soon |
| 🏦 Loans Funded | Coming Soon |
| ✅ Repayment Rate | Coming Soon |
| 📈 Average LearnScore | Coming Soon |

---

## 🔐 Security

- Smart contracts will be audited before mainnet launch
- Soulbound NFTs prevent identity theft
- Multi-sig for admin functions
- Rate limiting on sensitive operations
- IPFS for tamper-proof metadata

**Found a security issue?** Please email security@edulendx.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Kwala Network** for blockchain infrastructure
- **Polygon** for EVM compatibility
- **RainbowKit** for wallet connection UX
- **shadcn/ui** for beautiful components
- **Vercel** for hosting
- **OpenZeppelin** for secure smart contract patterns

---

## 📞 Support & Community

- 📧 **Email**: support@edulendx.com
- 💬 **Discord**: [discord.gg/edulendx](https://discord.gg/edulendx)
- 🐦 **Twitter**: [@EduLendX](https://twitter.com/edulendx)
- 📘 **Documentation**: [docs.edulendx.com](https://docs.edulendx.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/edulendx/issues)

---

<div align="center">

### 🌟 Star this repository if you believe in accessible education for all! 🌟

**Built with ❤️ by developers who care about education**

[⬆ Back to top](#-edulendx---decentralized-education-lending-platform)

</div>
