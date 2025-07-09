export interface Project {
  id: string;
  name: string;
  description: string;
  fundraiserName: string;
  walletAddress: string;
  totalAmount: number;
  currentAmount: number;
  currentMilestone: number;
  status: 'pending' | 'verified' | 'under_review' | 'completed';
  canWithdraw: boolean;
  milestones: Milestone[];
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  completed: boolean;
  proofUploaded: boolean;
  completedDate?: string;
  proofUrl?: string;
}

export interface NFT {
  tier: string;
  amountDonated: number;
  projectName: string;
  date: string;
  tokenId: string;
}

export interface FundraiserApplication {
  fullName: string;
  projectName: string;
  walletAddress: string;
  phoneNumber: string;
  projectDescription: string;
  file?: File;
}

export interface Donation {
  donorWallet: string;
  amount: number;
  projectId: string;
}

export interface ProofUpload {
  milestoneNumber: number;
  description: string;
  file?: File;
}