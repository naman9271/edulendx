import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { daoGovernanceContractABI } from './abi';

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`;

// Hook to read all proposals
export function useGetAllProposals() {
  return useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: daoGovernanceContractABI,
    functionName: 'getAllProposals',
  });
}

// Hook to read specific proposal
export function useGetProposal(proposalId?: bigint) {
  return useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: daoGovernanceContractABI,
    functionName: 'getProposal',
    args: proposalId !== undefined ? [proposalId] : undefined,
    query: {
      enabled: proposalId !== undefined,
    },
  });
}

// Hook to check if user has voted
export function useHasVoted(proposalId?: bigint, voter?: `0x${string}`) {
  return useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: daoGovernanceContractABI,
    functionName: 'hasVoted',
    args: proposalId !== undefined && voter ? [proposalId, voter] : undefined,
    query: {
      enabled: proposalId !== undefined && !!voter,
    },
  });
}

// Hook to create proposal
export function useCreateProposal() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createProposal = async (
    title: string,
    description: string,
    proposalType: number // 0: ParameterChange, 1: FeatureAddition, 2: FundAllocation, 3: Other
  ) => {
    writeContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: daoGovernanceContractABI,
      functionName: 'createProposal',
      args: [title, description, proposalType],
    });
  };

  return {
    createProposal,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to vote on proposal
export function useVote() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const vote = async (proposalId: bigint, support: boolean) => {
    writeContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: daoGovernanceContractABI,
      functionName: 'vote',
      args: [proposalId, support],
    });
  };

  return {
    vote,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to execute proposal (after voting ends)
export function useExecuteProposal() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const executeProposal = async (proposalId: bigint) => {
    writeContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: daoGovernanceContractABI,
      functionName: 'executeProposal',
      args: [proposalId],
    });
  };

  return {
    executeProposal,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}
