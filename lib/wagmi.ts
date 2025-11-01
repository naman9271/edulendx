import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { kwala, polygonMumbai } from './chains'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn('⚠️ NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Get one at https://cloud.walletconnect.com')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'EduLendX',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [polygonMumbai, kwala],
  ssr: true,
})
