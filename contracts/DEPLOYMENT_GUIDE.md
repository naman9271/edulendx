# Smart Contract Deployment Guide

## Prerequisites

1. **Node.js** installed (v16 or higher)
2. **Private Key** with funds on Kwala network
3. **Hardhat** installed

## Setup

### 1. Install Dependencies

```bash
cd contracts
npm install
```

### 2. Configure Environment

Add to your root `.env.local`:

```env
# Your deployer wallet private key (WITHOUT 0x prefix)
PRIVATE_KEY=your_private_key_here
```

⚠️ **NEVER commit your private key!** Add `.env.local` to `.gitignore`

## Deployment Steps

### Option 1: Deploy to Kwala Network

```bash
cd contracts
npm run deploy:kwala
```

### Option 2: Deploy to Local Hardhat Network (for testing)

Terminal 1:
```bash
cd contracts
npx hardhat node
```

Terminal 2:
```bash
cd contracts
npm run deploy:local
```

## After Deployment

### 1. Copy Contract Addresses

The deployment script will output addresses like this:

```
✅ EduID deployed to: 0x123...
✅ ImpactNFT deployed to: 0x456...
✅ LoanContract deployed to: 0x789...
✅ ScholarshipContract deployed to: 0xabc...
✅ DAOGovernance deployed to: 0xdef...
```

### 2. Update .env.local

Add the contract addresses to your root `.env.local`:

```env
NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS=0x123...
NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS=0x456...
NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS=0x789...
NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS=0xabc...
NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=0xdef...
```

### 3. Extract ABIs

```bash
cd contracts
npm run compile
```

ABIs will be in `contracts/artifacts/contracts/*.sol/*.json`

Copy the `abi` field from each JSON file to your frontend.

## Verification (Optional)

To verify contracts on block explorer:

```bash
npx hardhat verify --network kwala CONTRACT_ADDRESS
```

## Contract Addresses

After deployment, addresses are saved in `contracts/deployments.json`

## Troubleshooting

### "Insufficient funds"
- Make sure your wallet has enough KWL tokens
- Check balance: `npx hardhat run scripts/check-balance.js --network kwala`

### "Nonce too high"
- Reset your account in MetaMask: Settings > Advanced > Reset Account

### "Network error"
- Check Kwala RPC URL in `.env.local`
- Try: `https://rpc.kwala.network`

## Network Configuration

### Kwala Network
- Chain ID: 686868
- RPC URL: https://rpc.kwala.network
- Block Explorer: https://explorer.kwala.network
- Symbol: KWL

## Next Steps

After deployment:

1. ✅ Update `.env.local` with contract addresses
2. ✅ Extract ABIs and add to `/lib/contracts/abi/`
3. ✅ Test contract interactions on frontend
4. ✅ Verify contracts on explorer (optional)
5. ✅ Run full end-to-end tests

## Security Notes

- 🔒 Never share your private key
- 🔒 Never commit `.env.local` to git
- 🔒 Use a separate wallet for deployment
- 🔒 Audit contracts before mainnet deployment
