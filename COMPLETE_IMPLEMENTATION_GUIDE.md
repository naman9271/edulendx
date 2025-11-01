# 🚀 Complete Implementation Roadmap

## Overview
This guide walks you through deploying contracts, integrating them with the frontend, and making everything fully functional.

---

## 📋 Phase 1: Contract Deployment (30 minutes)

### Step 1: Setup Deployment Environment

```powershell
# Navigate to contracts directory
cd contracts

# Install dependencies
npm install
```

### Step 2: Add Private Key to .env.local

Add this to your root `.env.local` (NOT in contracts folder):

```env
# Your wallet private key (WITHOUT 0x prefix)
PRIVATE_KEY=your_private_key_here
```

⚠️ **Get test KWL tokens** from Kwala faucet before deploying!

### Step 3: Deploy Contracts

```powershell
# Deploy to Kwala network
npm run deploy:kwala
```

### Step 4: Save Contract Addresses

The deployment will output addresses. Copy them to root `.env.local`:

```env
NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=0x...
```

---

## 📦 Phase 2: Extract and Configure ABIs (15 minutes)

### Step 1: Compile Contracts

```powershell
cd contracts
npm run compile
```

### Step 2: Extract ABIs

ABIs are in `contracts/artifacts/contracts/*.sol/*.json`

For each contract:
1. Open the JSON file (e.g., `EduID.json`)
2. Copy the `abi` array
3. Paste into corresponding file in `/lib/contracts/abi/index.ts`

Example:
```typescript
export const eduIDContractABI = [
  // Paste the ABI array here
  {
    "inputs": [],
    "name": "mintEduID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... more ABI entries
] as const;
```

Repeat for all 5 contracts:
- ✅ `eduIDContractABI`
- ✅ `loanContractABI`
- ✅ `scholarshipContractABI`
- ✅ `impactNFTContractABI`
- ✅ `daoGovernanceContractABI`

---

## 🔗 Phase 3: Connect Dashboard (20 minutes)

### Update `app/dashboard/page.tsx`

```typescript
"use client";
import { useAccount } from 'wagmi';
import { useHasEduID, useGetIdentity, useReadEduID } from '@/lib/contracts';

export default function Dashboard() {
  const { address } = useAccount();
  
  // Check if user has EduID
  const { data: hasEduID } = useHasEduID(address);
  
  // Get token ID
  const { data: tokenId } = useReadEduID(address);
  
  // Get identity details
  const { data: identity } = useGetIdentity(tokenId);
  
  // Use real data instead of mock data
  const learnScore = identity ? Number(identity.learnScore) : 500;
  
  // ... rest of component
}
```

---

## 💰 Phase 4: Connect Loan Functionality (30 minutes)

### Update `app/loans/page.tsx`

```typescript
"use client";
import { useAccount } from 'wagmi';
import { useGetAllLoans, useFundLoan } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';
import { formatEther } from 'viem';

export default function Loans() {
  const { address } = useAccount();
  const { toast } = useToast();
  
  // Fetch real loans from contract
  const { data: loansData, refetch } = useGetAllLoans();
  
  // Fund loan hook
  const { fundLoan, isPending, isSuccess } = useFundLoan();
  
  const handleFund = async (loanId: bigint, amount: string) => {
    try {
      await fundLoan(loanId, amount);
      toast({
        title: "Success!",
        description: "Loan funded successfully",
      });
      refetch(); // Refresh loan data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fund loan",
        variant: "destructive",
      });
    }
  };
  
  // Format loans for display
  const loans = loansData?.map((loan: any) => ({
    id: loan.id,
    borrower: loan.borrower,
    amount: formatEther(loan.amount),
    funded: formatEther(loan.fundedAmount),
    interestRate: Number(loan.interestRate),
    purpose: loan.purpose,
  })) || [];
  
  // ... rest of component
}
```

---

## 🎓 Phase 5: Connect Scholarship Functionality (30 minutes)

### Update `app/scholarships/page.tsx`

```typescript
"use client";
import { useAccount } from 'wagmi';
import { useGetAllPools, useApplyForScholarship } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';

export default function Scholarships() {
  const { address } = useAccount();
  const { toast } = useToast();
  
  // Fetch pools from contract
  const { data: poolsData, refetch } = useGetAllPools();
  
  // Apply hook
  const { applyForScholarship, isPending } = useApplyForScholarship();
  
  const handleApply = async (poolId: bigint, ipfsHash: string) => {
    try {
      await applyForScholarship(poolId, ipfsHash);
      toast({
        title: "Success!",
        description: "Application submitted",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply",
        variant: "destructive",
      });
    }
  };
  
  // ... rest of component
}
```

---

## 🏛️ Phase 6: Connect Governance (20 minutes)

### Update `app/governance/page.tsx`

```typescript
"use client";
import { useAccount } from 'wagmi';
import { useGetAllProposals, useVote } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';

export default function Governance() {
  const { address } = useAccount();
  const { toast } = useToast();
  
  // Fetch proposals
  const { data: proposalsData, refetch } = useGetAllProposals();
  
  // Vote hook
  const { vote, isPending } = useVote();
  
  const handleVote = async (proposalId: bigint, support: boolean) => {
    try {
      await vote(proposalId, support);
      toast({
        title: "Success!",
        description: "Vote recorded",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to vote",
        variant: "destructive",
      });
    }
  };
  
  // ... rest of component
}
```

---

## 📝 Phase 7: Add Forms (45 minutes)

### Create Loan Request Form

Create `components/loans/CreateLoanForm.tsx`:

```typescript
"use client";
import { useState } from 'react';
import { useCreateLoan } from '@/lib/contracts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function CreateLoanForm() {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('5');
  const [duration, setDuration] = useState('30');
  const [purpose, setPurpose] = useState('');
  
  const { createLoan, isPending } = useCreateLoan();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload documents to IPFS (TODO: implement)
      const ipfsHash = 'QmExample...';
      
      await createLoan(
        amount,
        BigInt(interestRate),
        BigInt(duration),
        purpose,
        ipfsHash
      );
      
      toast({
        title: "Success!",
        description: "Loan request created",
      });
      
      // Reset form
      setAmount('');
      setPurpose('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create loan",
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        placeholder="Amount (KWL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <Textarea
        placeholder="Loan purpose..."
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Request Loan'}
      </Button>
    </form>
  );
}
```

---

## 🧪 Phase 8: Testing (30 minutes)

### Test Checklist:

1. **Wallet Connection**
   - ✅ Connect MetaMask to Kwala network
   - ✅ Verify wallet address displays correctly

2. **EduID Minting**
   - ✅ Click "Mint EduID" button
   - ✅ Fill form and submit
   - ✅ Check transaction on explorer
   - ✅ Verify NFT appears in dashboard

3. **Loan Creation**
   - ✅ Create loan request
   - ✅ Verify appears in loan list
   - ✅ Fund loan from different wallet
   - ✅ Check Impact NFT minted

4. **Scholarship Application**
   - ✅ Apply for scholarship
   - ✅ Check LearnScore requirement
   - ✅ Admin approves application
   - ✅ Verify funds received

5. **Governance Voting**
   - ✅ Create proposal
   - ✅ Vote on proposal
   - ✅ Check voting power from Impact NFTs
   - ✅ Execute passed proposal

---

## 🐛 Common Issues & Solutions

### Issue: "Contract not deployed"
**Solution**: Verify contract addresses in `.env.local` are correct

### Issue: "Insufficient funds"
**Solution**: Get more KWL tokens from faucet

### Issue: "Transaction reverted"
**Solution**: Check MetaMask console for error message. Common causes:
- Don't have EduID minted
- LearnScore too low
- Already voted on proposal

### Issue: "ABI error"
**Solution**: Make sure you copied the entire ABI array, including brackets

---

## 📊 Final Checklist

Before launching:

- ✅ All 5 contracts deployed
- ✅ Contract addresses in `.env.local`
- ✅ All ABIs extracted and added
- ✅ Dashboard shows real EduID data
- ✅ Loans page shows contract data
- ✅ Scholarships page shows pools
- ✅ Governance shows proposals
- ✅ All forms submit transactions
- ✅ Toast notifications working
- ✅ Loading states display correctly
- ✅ Errors handled gracefully
- ✅ Responsive on mobile

---

## 🎉 Launch!

Once everything is tested and working:

```powershell
npm run build
npm start
```

Your fully functional EduLendX DApp is ready! 🚀

---

## 📚 Additional Resources

- **Kwala Explorer**: https://explorer.kwala.network
- **Kwala Faucet**: [Get test KWL tokens]
- **OpenZeppelin Docs**: https://docs.openzeppelin.com
- **Wagmi Docs**: https://wagmi.sh
- **Hardhat Docs**: https://hardhat.org

---

## 🤝 Support

If you encounter issues:
1. Check browser console for errors
2. Verify MetaMask is on Kwala network (Chain ID: 686868)
3. Check transaction on Kwala explorer
4. Ensure you have enough KWL for gas fees
