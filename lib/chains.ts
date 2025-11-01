import { defineChain } from 'viem'

// Define Kwala Chain
export const kwala = defineChain({
  id: parseInt(process.env.NEXT_PUBLIC_KWALA_CHAIN_ID || '686868'),
  name: 'Kwala Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Kwala',
    symbol: 'KWL',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_KWALA_RPC_URL || 'https://rpc.kwala.network'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'Kwala Explorer', 
      url: 'https://explorer.kwala.network' 
    },
  },
  testnet: true,
})

// Polygon Mumbai Testnet for testing
export const polygonMumbai = defineChain({
  id: 80001,
  name: 'Polygon Mumbai',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://rpc-mumbai.maticvigil.com'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'PolygonScan', 
      url: 'https://mumbai.polygonscan.com' 
    },
  },
  testnet: true,
})
