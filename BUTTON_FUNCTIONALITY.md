# 🔘 Button Functionality Map

## Current Status: UI Complete ✅ | Contracts Needed ❌

---

## 📍 Landing Page (app/page.tsx)

### Buttons:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Launch App" | ✅ Working - Links to /dashboard | None |
| "Watch Demo" | ⚠️ No action | Video modal or external link |
| "Learn More" | ⚠️ No action | Scroll to features or docs link |

---

## 📍 Dashboard Page (app/dashboard/page.tsx)

### EduID Section:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Create Your EduID" | ⚠️ Shows minting UI | EduID contract + ABI |
| "Mint EduID" (in form) | ❌ Not implemented | EduID contract interaction |

### Active Loans Section:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Request Loan" | ⚠️ Links to /loans | None (navigation works) |
| "Make Payment" | ❌ No action | Loan contract payment function |
| "Browse Loan Options" | ✅ Links to /loans | None |

### Scholarships Section:
| Button | Current State | Needs |
|--------|--------------|-------|
| "View All" | ✅ Links to /scholarships | None |
| "Explore Scholarships" | ✅ Links to /scholarships | None |

### Quick Actions:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Apply for Scholarships" | ✅ Links to /scholarships | None |
| "Request a Loan" | ✅ Links to /loans | None |
| "DAO Governance" | ✅ Links to /governance | None |

---

## 📍 Loans Page (app/loans/page.tsx)

### Main Actions:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Request Loan" (header) | ❌ No action | Loan contract + creation form |
| "Filters" | ⚠️ No action | Filter state management |

### Loan Cards:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Fund Loan" (on card) | ⚠️ Opens modal | None (modal opens) |

### Loan Detail Modal:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Fund Loan" (main button) | ❌ No transaction | Loan contract funding function |
| "Max" (funding amount) | ⚠️ Sets max amount | None (works with state) |
| Close (X) | ✅ Closes modal | None |

**Contract Functions Needed:**
```solidity
// Loan Contract
function fundLoan(uint256 loanId) external payable
function getLoanDetails(uint256 loanId) external view returns (LoanDetails)
function getActiveLoansByStatus(string status) external view returns (Loan[])
```

---

## 📍 Scholarships Page (app/scholarships/page.tsx)

### Main Actions:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Create Pool" (header) | ❌ No action | Scholarship contract + creation form |
| "Filters" | ⚠️ Toggles state | Filter implementation |

### Pool Cards:
| Button | Current State | Needs |
|--------|--------------|-------|
| "View Details" | ⚠️ Opens modal | None (modal opens) |

### Pool Detail Modal:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Apply for Scholarship" | ❌ No transaction | Scholarship contract application |
| "Share" | ⚠️ No action | Share functionality (optional) |
| Close (X) | ✅ Closes modal | None |

**Contract Functions Needed:**
```solidity
// Scholarship Contract
function applyForScholarship(uint256 poolId, bytes memory credentials) external
function getPoolDetails(uint256 poolId) external view returns (PoolDetails)
function getActivePools() external view returns (Pool[])
function createPool(PoolParams memory params) external payable
```

---

## 📍 Governance Page (app/governance/page.tsx)

### Main Actions:
| Button | Current State | Needs |
|--------|--------------|-------|
| "New Proposal" (header) | ❌ No action | DAO contract + proposal form |
| "Active/Passed/Rejected" tabs | ⚠️ Filter state | Filter logic |

### Proposal Cards:
| Button | Current State | Needs |
|--------|--------------|-------|
| "Vote For" | ❌ No transaction | DAO contract vote function |
| "Vote Against" | ❌ No transaction | DAO contract vote function |
| "Execute Proposal" | ❌ No transaction | DAO contract execution |

**Contract Functions Needed:**
```solidity
// DAO Contract
function voteFor(uint256 proposalId) external
function voteAgainst(uint256 proposalId) external
function executeProposal(uint256 proposalId) external
function createProposal(ProposalParams memory params) external
function getActiveProposals() external view returns (Proposal[])
function getVotingPower(address voter) external view returns (uint256)
```

---

## 📍 Header (components/ui/header.tsx)

### Navigation:
| Button | Current State | Needs |
|--------|--------------|-------|
| Logo | ✅ Links to / | None |
| "Dashboard" | ✅ Links to /dashboard | None |
| "Scholarships" | ✅ Links to /scholarships | None |
| "Loans" | ✅ Links to /loans | None |
| "Governance" | ✅ Links to /governance | None |
| Connect Wallet | ✅ RainbowKit modal | WalletConnect Project ID |
| Mobile Menu | ✅ Toggle works | None |

---

## 🎯 SUMMARY: What Needs to be Built

### Forms to Create (After Contracts):
1. **Loan Request Form**
   - Amount input
   - Purpose textarea
   - Term select
   - Document upload (IPFS)
   - Submit button → calls `createLoan()`

2. **Scholarship Application Form**
   - Personal info
   - Credentials upload
   - Essay textarea
   - Submit button → calls `applyForScholarship()`

3. **Scholarship Pool Creation**
   - Pool name
   - Description
   - Amount input
   - Criteria setup
   - Submit button → calls `createPool()`

4. **DAO Proposal Form**
   - Title input
   - Description textarea
   - Proposal type select
   - Parameters input
   - Submit button → calls `createProposal()`

5. **EduID Minting Form** (Partially complete)
   - Name input
   - Institution
   - Credentials upload
   - Submit button → calls `mintEduID()`

### Transaction Handlers to Create:
```typescript
// Example structure for each contract interaction
export function useLoanContract() {
  return {
    fundLoan: async (loanId, amount) => { /* ... */ },
    createLoan: async (params) => { /* ... */ },
    makePayment: async (loanId, amount) => { /* ... */ },
    getLoanDetails: async (loanId) => { /* ... */ },
  }
}
```

---

## 🔄 Data Flow (After Implementation)

### Current: Mock Data
```typescript
const mockLoans = [/* hardcoded data */]
```

### After Implementation: Real Data
```typescript
const { data: loans, isLoading } = useLoans() // Reads from blockchain
```

---

## ⏱️ Implementation Priority

### Phase 1: Critical (First Week)
1. EduID minting ← Users need this first
2. Loan creation ← Core feature
3. Loan funding ← Core feature
4. Scholarship application ← Core feature

### Phase 2: Important (Second Week)
5. DAO voting ← Engagement feature
6. Loan payments ← Follow-up action
7. Scholarship pool creation ← Admin feature
8. LearnScore calculation ← AI integration

### Phase 3: Nice-to-Have (Third Week)
9. Share functionality
10. Advanced filters
11. Analytics dashboard
12. Transaction history
13. Notifications

---

## 🎨 UI States to Add

For each button transaction:
1. **Idle State** ← Current state (ready to click)
2. **Loading State** ← Shows spinner, disabled
3. **Success State** ← Shows toast, updates UI
4. **Error State** ← Shows error toast, retry option

Example:
```typescript
const [isLoading, setIsLoading] = useState(false)

async function handleFundLoan() {
  try {
    setIsLoading(true)
    await fundLoan(loanId, amount)
    toast({ title: "Success!", description: "Loan funded" })
  } catch (error) {
    toast({ title: "Error", description: error.message, variant: "destructive" })
  } finally {
    setIsLoading(false)
  }
}
```

---

## 📝 What You Need to Provide

### For Each Contract:
1. Contract address (e.g., `0x123...`)
2. Contract ABI (JSON file)
3. Network ID (already configured: 686868 for Kwala)
4. List of key functions and their parameters
5. Event names for listening to state changes

### Example:
```json
{
  "contract": "Loan",
  "address": "0x1234567890abcdef...",
  "abi": "Loan.json",
  "key_functions": [
    "createLoan(uint256 amount, string purpose, uint256 term)",
    "fundLoan(uint256 loanId) payable",
    "makePayment(uint256 loanId) payable"
  ],
  "events": [
    "LoanCreated(uint256 indexed loanId, address indexed borrower)",
    "LoanFunded(uint256 indexed loanId, address indexed lender, uint256 amount)"
  ]
}
```

---

## ✅ Ready to Connect

All UI components are styled and ready. Just need:
1. WalletConnect Project ID (5 min)
2. Contract addresses (when deployed)
3. Contract ABIs (JSON files)

Then I'll implement all button functionality! 🚀
