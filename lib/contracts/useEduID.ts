import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { eduIDContractABI } from './abi';

const EDUID_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS as `0x${string}`;

// Hook to read EduID identity data
export function useReadEduID(walletAddress?: `0x${string}`) {
  return useReadContract({
    address: EDUID_CONTRACT_ADDRESS,
    abi: eduIDContractABI,
    functionName: 'walletToTokenId',
    args: walletAddress ? [walletAddress] : undefined,
    query: {
      enabled: !!walletAddress,
    },
  });
}

// Hook to read EduID identity details
export function useGetIdentity(tokenId?: bigint) {
  return useReadContract({
    address: EDUID_CONTRACT_ADDRESS,
    abi: eduIDContractABI,
    functionName: 'getIdentity',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

// Hook to check if wallet has EduID
export function useHasEduID(walletAddress?: `0x${string}`) {
  return useReadContract({
    address: EDUID_CONTRACT_ADDRESS,
    abi: eduIDContractABI,
    functionName: 'hasEduID',
    args: walletAddress ? [walletAddress] : undefined,
    query: {
      enabled: !!walletAddress,
    },
  });
}

// Hook to mint EduID
export function useMintEduID() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mintEduID = async (name: string, studentId: string, institution: string) => {
    writeContract({
      address: EDUID_CONTRACT_ADDRESS,
      abi: eduIDContractABI,
      functionName: 'mintEduID',
      args: [name, studentId, institution],
    });
  };

  return {
    mintEduID,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to update LearnScore (admin only)
export function useUpdateLearnScore() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateLearnScore = async (tokenId: bigint, newScore: bigint) => {
    writeContract({
      address: EDUID_CONTRACT_ADDRESS,
      abi: eduIDContractABI,
      functionName: 'updateLearnScore',
      args: [tokenId, newScore],
    });
  };

  return {
    updateLearnScore,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}
