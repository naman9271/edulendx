# 📜 EduLendX Smart Contracts

Production-ready Solidity contracts for the EduLendX decentralized education financing platform.

---

## 📁 Contracts Overview

### 1. **EduID.sol** (~130 lines)
Soulbound NFT representing academic identity.

**Key Features:**
- 🎫 Non-transferable (soulbound) academic identity
- 📊 LearnScore tracking (starts at 500, max 1000)
- 👤 Student profile (name, student ID, institution)
- 🔒 One EduID per wallet

**Main Functions:**
- `mintEduID(name, studentId, institution)` - Mint identity NFT
- `updateLearnScore(tokenId, newScore)` - Update score (admin only)
- `getIdentity(tokenId)` - Get student details
- `hasEduID(wallet)` - Check if wallet has EduID

---

### 2. **LoanContract.sol** (~180 lines)
P2P lending with fractional funding support.

**Key Features:**
- 💰 Create loan requests with purpose and documentation
- 🤝 Partial funding from multiple lenders
- 📈 Interest calculation (5-25% based on LearnScore)
- 💸 Automatic proportional repayment distribution
- 🎨 Mints Impact NFT for lenders

**Main Functions:**
- `createLoan(amount, interestRate, duration, purpose, ipfsHash)` - Request loan
- `fundLoan(loanId)` - Fund a loan (payable)
- `makePayment(loanId)` - Repay loan (payable)
- `getLoan(loanId)` - Get loan details
- `getLoansByBorrower(address)` - Get borrower's loans

**Loan States:**
- `Requested` - Awaiting funding
- `Funded` - Fully funded
- `Active` - Being repaid
- `Completed` - Fully repaid
- `Defaulted` - Missed payments

---

### 3. **ScholarshipContract.sol** (~200 lines)
Merit-based scholarship pool management.

**Key Features:**
- 🎁 Create scholarship pools with eligibility criteria
- ✅ Automatic eligibility checking (LearnScore-based)
- 📝 Application tracking and approval workflow
- 💵 Automatic fund distribution on approval
- 👥 Support for multiple recipients per pool

**Main Functions:**
- `createPool(name, description, totalAmount, numRecipients, minLearnScore, deadline)` - Create pool (payable)
- `applyForScholarship(poolId, ipfsHash)` - Submit application
- `approveApplication(poolId, applicant)` - Approve and disburse (admin)
- `getPool(poolId)` - Get pool details
- `getAllPools()` - Get all active pools

**Pool States:**
- `Active` - Accepting applications
- `Closed` - No longer accepting
- `Completed` - All funds distributed

---

### 4. **ImpactNFT.sol** (~120 lines)
Social impact tracking NFT for lenders.

**Key Features:**
- 🎨 Minted automatically when funding loans
- 📊 Tracks total funding amount and student count
- 🗳️ Grants DAO voting power
- 💪 Voting power = (totalFunded / 100) + (5000 × NFT count)
- 🔗 Connected to LoanContract

**Main Functions:**
- `mintImpactNFT(lender, loanId, amount)` - Mint NFT (internal)
- `updateImpact(tokenId, loanId, amount)` - Update impact
- `getImpact(tokenId)` - Get impact details
- `getVotingPower(holder)` - Calculate voting power
- `getNFTsByHolder(holder)` - Get all NFTs owned

---

### 5. **DAOGovernance.sol** (~150 lines)
Decentralized governance system.

**Key Features:**
- 🏛️ Community-driven decision making
- 📝 Proposal creation and voting
- ⏰ 7-day voting period
- 📊 30% quorum requirement
- 🗳️ Weighted voting by Impact NFT power

**Proposal Types:**
- `ParameterChange` (0) - Modify platform parameters
- `FeatureAddition` (1) - Add new features
- `FundAllocation` (2) - Allocate treasury funds
- `Other` (3) - General proposals

**Main Functions:**
- `createProposal(title, description, proposalType)` - Create proposal
- `vote(proposalId, support)` - Vote yes/no
- `executeProposal(proposalId)` - Execute if passed
- `getProposal(proposalId)` - Get proposal details
- `hasVoted(proposalId, voter)` - Check if voted

**Proposal States:**
- `Active` - Currently voting
- `Passed` - Quorum met, majority yes
- `Failed` - Rejected or quorum not met
- `Executed` - Successfully executed

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              EduID.sol                      │
│    (Soulbound Academic Identity)            │
└──────────────┬──────────────────────────────┘
               │
               │ Requires EduID
               │
               ├──────────────────────────────┐
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   LoanContract.sol       │    │ ScholarshipContract.sol  │
│   (P2P Lending)          │    │  (Merit Scholarships)    │
└───────┬──────────────────┘    └──────────────────────────┘
        │
        │ Mints NFT
        │
        ▼
┌──────────────────────────┐
│    ImpactNFT.sol         │
│  (Social Impact)         │
└───────┬──────────────────┘
        │
        │ Voting Power
        │
        ▼
┌──────────────────────────┐
│  DAOGovernance.sol       │
│   (Governance)           │
└──────────────────────────┘
```

---

## 🚀 Deployment

### Prerequisites

```bash
Node.js 18+
npm or yarn
Hardhat
Private key with KWL tokens
```

### Installation

```bash
cd contracts
npm install
```

### Configuration

Add to root `.env.local`:

```env
PRIVATE_KEY=your_private_key_without_0x
NEXT_PUBLIC_KWALA_RPC_URL=https://rpc.kwala.network
```

### Deploy to Kwala

```bash
npm run deploy:kwala
```

### Deploy to Local Hardhat

```bash
# Terminal 1
npx hardhat node

# Terminal 2
npm run deploy:local
```

---

## 📋 Deployment Order

The deployment script automatically deploys in this order:

1. **EduID** (no dependencies)
2. **ImpactNFT** (no dependencies)
3. **LoanContract** (requires EduID address)
4. **ScholarshipContract** (requires EduID address)
5. **DAOGovernance** (requires ImpactNFT address)
6. **Link ImpactNFT to LoanContract** (post-deployment setup)

---

## 📊 Contract Sizes

| Contract | Lines | Gas Cost (est.) | Complexity |
|----------|-------|-----------------|------------|
| EduID.sol | ~130 | ~2.5M gas | Medium |
| LoanContract.sol | ~180 | ~3.5M gas | High |
| ScholarshipContract.sol | ~200 | ~3.8M gas | High |
| ImpactNFT.sol | ~120 | ~2.2M gas | Medium |
| DAOGovernance.sol | ~150 | ~2.8M gas | Medium |

**Total**: ~780 lines, ~14.8M gas

---

## 🔐 Security Features

### Access Control
- ✅ `Ownable` for admin functions
- ✅ `ReentrancyGuard` on all payable functions
- ✅ EduID requirement enforced
- ✅ Voting power verification

### Best Practices
- ✅ OpenZeppelin contracts (v5.0.0)
- ✅ Solidity 0.8.20 (built-in overflow protection)
- ✅ Event emissions for transparency
- ✅ Input validation
- ✅ Proper error messages

### Soulbound Implementation
```solidity
// EduID cannot be transferred
function _update(address to, uint256 tokenId, address auth)
    internal
    override
    returns (address)
{
    address from = _ownerOf(tokenId);
    require(from == address(0), "EduID: Soulbound NFT cannot be transferred");
    return super._update(to, tokenId, auth);
}
```

---

## 📝 ABI Extraction

After deployment:

```bash
npm run compile
```

ABIs located in:
```
artifacts/contracts/EduID.sol/EduID.json
artifacts/contracts/LoanContract.sol/LoanContract.json
artifacts/contracts/ScholarshipContract.sol/ScholarshipContract.json
artifacts/contracts/ImpactNFT.sol/ImpactNFT.json
artifacts/contracts/DAOGovernance.sol/DAOGovernance.json
```

Copy the `abi` array from each JSON to `/lib/contracts/abi/index.ts`

---

## 🧪 Testing

```bash
# Run tests (TODO: Add test suite)
npx hardhat test

# Check coverage
npx hardhat coverage
```

---

## 🔍 Verification

Verify on Kwala Explorer:

```bash
npx hardhat verify --network kwala CONTRACT_ADDRESS
```

---

## 📚 Dependencies

```json
{
  "@openzeppelin/contracts": "^5.0.0",
  "hardhat": "^2.19.0",
  "@nomicfoundation/hardhat-toolbox": "^4.0.0",
  "dotenv": "^16.3.1"
}
```

---

## 🐛 Troubleshooting

### "Contract too large"
- Optimize contract size
- Enable optimizer in `hardhat.config.js`

### "Insufficient funds"
- Get more KWL from faucet
- Check gas price settings

### "Nonce too high"
- Reset MetaMask account
- Clear Hardhat cache: `npx hardhat clean`

### "Cannot find module '@openzeppelin'"
- Run `npm install` in contracts directory
- Check `package.json` has correct version

---

## 📖 Further Reading

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [EIP-5192 (Soulbound)](https://eips.ethereum.org/EIPS/eip-5192)

---

## 📞 Support

Issues with contracts? Check:
1. [Deployment Guide](./DEPLOYMENT_GUIDE.md)
2. [GitHub Issues](https://github.com/edulendx/issues)
3. [Discord Community](https://discord.gg/edulendx)

---

**Built with ❤️ using OpenZeppelin secure patterns**
