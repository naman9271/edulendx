/**
 * Get contract address by name
 */
export function getContractAddress(
  name: 'EDUID' | 'SCHOLARSHIP' | 'LOAN' | 'IMPACT_NFT' | 'DAO'
): `0x${string}` {
  const addresses = {
    EDUID: process.env.NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS,
    SCHOLARSHIP: process.env.NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS,
    LOAN: process.env.NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS,
    IMPACT_NFT: process.env.NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS,
    DAO: process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS,
  }

  const address = addresses[name]
  if (!address || address === '0x0') {
    console.warn(`⚠️ ${name} contract address not configured`)
    return '0x0000000000000000000000000000000000000000'
  }

  return address as `0x${string}`
}

/**
 * Check if contracts are configured
 */
export function areContractsConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS &&
    process.env.NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS !== '0x0' &&
    !!process.env.NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS &&
    !!process.env.NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS &&
    !!process.env.NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS
  )
}

/**
 * Get all contract addresses
 */
export function getAllContractAddresses() {
  return {
    eduId: getContractAddress('EDUID'),
    scholarshipPool: getContractAddress('SCHOLARSHIP'),
    loanNft: getContractAddress('LOAN'),
    impactNft: getContractAddress('IMPACT_NFT'),
    dao: getContractAddress('DAO'),
  }
}
