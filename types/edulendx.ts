// EduLendX Core Type Definitions

export interface EduID {
  id: string;
  owner: string; // Wallet address
  isSoulbound: boolean;
  identity: {
    worldId?: string;
    verifiedName?: string;
    verifiedEmail?: string;
    profileImage?: string;
  };
  academicRecords: AcademicRecord[];
  learnScore: number;
  scholarshipHistory: ScholarshipRecord[];
  loanHistory: LoanRecord[];
  createdAt: string;
  lastUpdated: string;
  nftMetadata: {
    ipfsHash: string;
    tokenId: string;
  };
}

export interface AcademicRecord {
  id: string;
  institution: string;
  degree: string;
  gpa: number;
  coursesCompleted: string[];
  verificationStatus: "pending" | "verified" | "rejected";
  verifiedBy?: string;
  verifiedAt?: string;
  certificates: {
    name: string;
    ipfsHash: string;
  }[];
}

export interface ScholarshipPool {
  id: string;
  name: string;
  description: string;
  totalFunds: number;
  availableFunds: number;
  donors: string[];
  criteria: ScholarshipCriteria;
  recipients: ScholarshipRecipient[];
  yieldGenerated: number;
  contractAddress: string;
  status: "active" | "paused" | "depleted";
  createdAt: string;
}

export interface ScholarshipCriteria {
  minGPA?: number;
  requiredCourses?: string[];
  needBased?: boolean;
  incomeThreshold?: number;
  geographicRestrictions?: string[];
  customRules?: string;
}

export interface ScholarshipRecipient {
  studentId: string;
  eduId: string;
  amountReceived: number;
  disbursementDate: string;
  triggerCondition: string;
  transactionHash: string;
}

export interface ScholarshipRecord {
  poolId: string;
  poolName: string;
  amount: number;
  receivedAt: string;
  reason: string;
  transactionHash: string;
}

export interface LoanNFT {
  id: string;
  tokenId: string;
  studentEduId: string;
  requestedAmount: number;
  fundedAmount: number;
  repaidAmount: number;
  interestRate: number;
  term: number;
  purpose: string;
  status: "pending" | "approved" | "funded" | "repaying" | "completed" | "defaulted";
  lenders: Lender[];
  repaymentSchedule: RepaymentSchedule[];
  contractAddress: string;
  createdAt: string;
  fundingDeadline: string;
  ipfsHash: string;
}

export interface Lender {
  address: string;
  amountFunded: number;
  expectedReturn: number;
  fundedAt: string;
}

export interface RepaymentSchedule {
  dueDate: string;
  amount: number;
  paid: boolean;
  paidAt?: string;
  transactionHash?: string;
}

export interface LoanRecord {
  loanNftId: string;
  amount: number;
  status: string;
  startedAt: string;
  completedAt?: string;
  onTimePayments: number;
  latePayments: number;
  defaulted: boolean;
}

export interface ImpactNFT {
  id: string;
  tokenId: string;
  donor: string;
  studentsHelped: StudentImpact[];
  totalContributed: number;
  impactScore: number;
  level: number;
  metadata: {
    color: string;
    rarity: string;
    specialAttributes: string[];
  };
  governanceRights: boolean;
  createdAt: string;
  lastEvolved: string;
  ipfsHash: string;
}

export interface StudentImpact {
  studentEduId: string;
  studentName: string;
  amountProvided: number;
  type: "scholarship" | "loan";
  successMetrics: {
    graduated: boolean;
    loanRepaid: boolean;
    currentLearnScore: number;
  };
}

export interface LearnScoreComponents {
  academicAchievements: number; // 0-400
  loanRepayment: number; // 0-350
  scholarshipsEarned: number; // 0-150
  communityContribution: number; // 0-100
}

export interface LearnScore {
  total: number; // 0-1000
  components: LearnScoreComponents;
  grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";
  lastUpdated: string;
  history: {
    date: string;
    score: number;
    reason: string;
  }[];
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  type: "scholarship-criteria" | "interest-rate" | "fund-distribution" | "other";
  status: "active" | "passed" | "rejected" | "executed";
  votesFor: number;
  votesAgainst: number;
  voters: {
    address: string;
    vote: "for" | "against";
    weight: number;
  }[];
  createdAt: string;
  votingEnds: string;
  executedAt?: string;
}

export interface UserRole {
  isStudent: boolean;
  isDonor: boolean;
  isLender: boolean;
  isAdmin: boolean;
}
