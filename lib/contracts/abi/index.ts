// Contract ABIs will be placed here after compilation
// To extract ABIs after deployment:
// 1. Run: cd contracts && npm run compile
// 2. Find ABIs in: contracts/artifacts/contracts/*.sol/*.json
// 3. Copy the "abi" array from each JSON file to this directory

export const eduIDContractABI = [
  // Copy from artifacts/contracts/EduID.sol/EduID.json
  // Will be populated after contract compilation
] as const;

export const loanContractABI = [
  // Copy from artifacts/contracts/LoanContract.sol/LoanContract.json
] as const;

export const scholarshipContractABI = [
  // Copy from artifacts/contracts/ScholarshipContract.sol/ScholarshipContract.json
] as const;

export const impactNFTContractABI = [
  // Copy from artifacts/contracts/ImpactNFT.sol/ImpactNFT.json
] as const;

export const daoGovernanceContractABI = [
  // Copy from artifacts/contracts/DAOGovernance.sol/DAOGovernance.json
] as const;
