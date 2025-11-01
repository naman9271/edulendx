import { useReadContract } from 'wagmi';
import { impactNFTContractABI } from './abi';

const IMPACT_NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS as `0x${string}`;

// Hook to read impact data
export function useGetImpact(tokenId?: bigint) {
  return useReadContract({
    address: IMPACT_NFT_CONTRACT_ADDRESS,
    abi: impactNFTContractABI,
    functionName: 'getImpact',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

// Hook to get voting power
export function useGetVotingPower(holder?: `0x${string}`) {
  return useReadContract({
    address: IMPACT_NFT_CONTRACT_ADDRESS,
    abi: impactNFTContractABI,
    functionName: 'getVotingPower',
    args: holder ? [holder] : undefined,
    query: {
      enabled: !!holder,
    },
  });
}

// Hook to get NFTs owned by address
export function useGetNFTsByHolder(holder?: `0x${string}`) {
  return useReadContract({
    address: IMPACT_NFT_CONTRACT_ADDRESS,
    abi: impactNFTContractABI,
    functionName: 'getNFTsByHolder',
    args: holder ? [holder] : undefined,
    query: {
      enabled: !!holder,
    },
  });
}
