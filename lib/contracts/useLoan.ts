import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { loanContractABI } from './abi';

const LOAN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS as `0x${string}`;

// Hook to read all loans
export function useGetAllLoans() {
  return useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: loanContractABI,
    functionName: 'getAllLoans',
  });
}

// Hook to read specific loan
export function useGetLoan(loanId?: bigint) {
  return useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: loanContractABI,
    functionName: 'getLoan',
    args: loanId !== undefined ? [loanId] : undefined,
    query: {
      enabled: loanId !== undefined,
    },
  });
}

// Hook to get loans by borrower
export function useGetLoansByBorrower(borrowerAddress?: `0x${string}`) {
  return useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: loanContractABI,
    functionName: 'getLoansByBorrower',
    args: borrowerAddress ? [borrowerAddress] : undefined,
    query: {
      enabled: !!borrowerAddress,
    },
  });
}

// Hook to create loan request
export function useCreateLoan() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createLoan = async (
    amount: string,
    interestRate: bigint,
    duration: bigint,
    purpose: string,
    ipfsHash: string
  ) => {
    writeContract({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'createLoan',
      args: [parseEther(amount), interestRate, duration, purpose, ipfsHash],
    });
  };

  return {
    createLoan,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to fund a loan
export function useFundLoan() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const fundLoan = async (loanId: bigint, amount: string) => {
    writeContract({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'fundLoan',
      args: [loanId],
      value: parseEther(amount),
    });
  };

  return {
    fundLoan,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Hook to make loan payment
export function useMakePayment() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const makePayment = async (loanId: bigint, amount: string) => {
    writeContract({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'makePayment',
      args: [loanId],
      value: parseEther(amount),
    });
  };

  return {
    makePayment,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}
