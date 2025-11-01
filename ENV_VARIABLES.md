# Environment Variables Reference

## Required Variables

Copy this template to your `.env.local` file:

```env
# ============================================
# WALLET & DEPLOYMENT
# ============================================

# Your wallet private key for contract deployment (WITHOUT 0x prefix)
# ⚠️ NEVER commit this to git!
PRIVATE_KEY=your_private_key_here_without_0x

# ============================================
# BLOCKCHAIN NETWORK
# ============================================

# Kwala Network RPC URL
NEXT_PUBLIC_KWALA_RPC_URL=https://rpc.kwala.network

# WalletConnect Project ID (for RainbowKit)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=069c48ec5f125da6ee3efeccaeaa16eb

# ============================================
# DEPLOYED CONTRACT ADDRESSES
# ============================================
# These will be provided after running deployment script

NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS=
NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS=
NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS=
NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS=
NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=

# ============================================
# IPFS / PINATA
# ============================================

# Pinata API credentials for IPFS storage
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MzZhNTRmMC03ZmI3LTQzZDctODlkZC0zZDc1YTFmYmVjZTMiLCJlbWFpbCI6Im5hbWFudXBhZGh5YXl0eXJuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ZTlkOGYyZjMzYmNkNjY5MjVjMCIsInNjb3BlZEtleVNlY3JldCI6ImI4MTNhYWZkMTZkOWQzYzZjNzNkMGM3MDM2NjcyNGVkYTFhNzJjZmQ3ZDAwOTExOTI2OWNmNzljZDRiYWU0NzciLCJleHAiOjE3Njg2NTExODJ9.jFHVYcGLn4pWNlhPWYg6-0M7IIzRgn6I8dNMJZ5QWPE

# ============================================
# AI / GEMINI API
# ============================================

# Google Gemini API for LearnScore AI calculations
GEMINI_API_KEY=AIzaSyCd8U3tELKAE_nNK6YNmHgp2Liljz7Do-c

```

## Security Notes

- ✅ `.env.local` is already in `.gitignore` - **DO NOT remove it**
- ❌ **NEVER** commit your private key to version control
- ❌ **NEVER** share your `.env.local` file publicly
- ✅ Use a separate wallet for development/testing
- ✅ Keep production keys in a secure vault

## Getting the Values

### PRIVATE_KEY
1. Open MetaMask
2. Click account menu → Account details
3. Click "Export Private Key"
4. Enter password
5. Copy the key **without** the `0x` prefix

### Contract Addresses
These will be automatically output after running:
```bash
cd contracts
npm run deploy:kwala
```

### WalletConnect Project ID
Already configured: `069c48ec5f125da6ee3efeccaeaa16eb`

You can create your own at: https://cloud.walletconnect.com

### Pinata JWT
Already configured. To get your own:
1. Sign up at https://pinata.cloud
2. Generate API Key
3. Copy the JWT token

### Gemini API Key
Already configured. To get your own:
1. Go to https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy the key

## Verifying Configuration

After filling in all values, verify with:

```bash
# Check all environment variables are loaded
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS)"
```

Should output your EduID contract address (not undefined).

## Network Configuration

Make sure MetaMask is configured for Kwala:

- **Network Name**: Kwala
- **RPC URL**: https://rpc.kwala.network
- **Chain ID**: 686868
- **Currency Symbol**: KWL
- **Block Explorer**: https://explorer.kwala.network

## Deployment Order

After contracts are deployed, you'll receive 5 addresses in this order:

1. **EduID** - Must be deployed first (no dependencies)
2. **ImpactNFT** - Needs LoanContract address (set after deployment)
3. **LoanContract** - Depends on EduID
4. **ScholarshipContract** - Depends on EduID
5. **DAOGovernance** - Depends on ImpactNFT

The deployment script handles this order automatically! ✅
