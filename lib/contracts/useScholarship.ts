import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { scholarshipContractABI } from './abi';

const SCHOLARSHIP_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS as `0x${string}`;

// Hook to read all scholarship pools
export function useGetAllPools() {
  return useReadContract({
    address: SCHOLARSHIP_CONTRACT_ADDRESS,
    abi: scholarshipContractABI,
    functionName: 'getAllPools',
  });
}

// Hook to read specific pool
export function useGetPool(poolId?: bigint) {
  return useReadContract({
    address: SCHOLARSHIP_CONTRACT_ADDRESS,
    abi: scholarshipContractABI,
    functionName: 'getPool',
    args: poolId !== undefined ? [poolId] : undefined,
    query: {
      enabled: poolId !== undefined,
    },
  });
}

// Hook to get applications by student
export function useGetApplicationsByStudent(studentAddress?: `0x${string}`) {
  return useReadContract({
    address: SCHOLARSHIP_CONTRACT_ADDRESS,
    abi: scholarshipContractABI,
    functionName: 'getApplicationsByStudent',
    args: studentAddress ? [studentAddress] : undefined,
    query: {
      enabled: !!studentAddress,
    },
  });
}

// Hook to create scholarship pool
export function useCreatePool() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createPool = async (
    name: string,
    description: string,
    totalAmount: string,
    numRecipients: bigint,
    minLearnScore: bigint,
    deadline: bigint
  ) => {
    writeContract({
      address: SCHOLARSHIP_CONTRACT_ADDRESS,
      abi: scholarshipContractABI,
      functionName: 'createPool',
      args: [name, description, totalAmount, numRecipients, minLearnScore, deadline],
      value: parseEther(totalAmount),
    });
  };

  return {
    createPool,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to apply for scholarship
export function useApplyForScholarship() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const applyForScholarship = async (poolId: bigint, ipfsHash: string) => {
    writeContract({
      address: SCHOLARSHIP_CONTRACT_ADDRESS,
      abi: scholarshipContractABI,
      functionName: 'applyForScholarship',
      args: [poolId, ipfsHash],
    });
  };

  return {
    applyForScholarship,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to approve scholarship application (admin/pool creator)
export function useApproveApplication() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approveApplication = async (poolId: bigint, applicant: `0x${string}`) => {
    writeContract({
      address: SCHOLARSHIP_CONTRACT_ADDRESS,
      abi: scholarshipContractABI,
      functionName: 'approveApplication',
      args: [poolId, applicant],
    });
  };

  return {
    approveApplication,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}
