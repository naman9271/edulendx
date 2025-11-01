const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting EduLendX contract deployment...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
  console.log("");

  // 1. Deploy EduID
  console.log("📝 Deploying EduID contract...");
  const EduID = await hre.ethers.getContractFactory("EduID");
  const eduID = await EduID.deploy();
  await eduID.waitForDeployment();
  const eduIDAddress = await eduID.getAddress();
  console.log("✅ EduID deployed to:", eduIDAddress);
  console.log("");

  // 2. Deploy ImpactNFT
  console.log("🎨 Deploying ImpactNFT contract...");
  const ImpactNFT = await hre.ethers.getContractFactory("ImpactNFT");
  const impactNFT = await ImpactNFT.deploy();
  await impactNFT.waitForDeployment();
  const impactNFTAddress = await impactNFT.getAddress();
  console.log("✅ ImpactNFT deployed to:", impactNFTAddress);
  console.log("");

  // 3. Deploy LoanContract
  console.log("💰 Deploying LoanContract...");
  const LoanContract = await hre.ethers.getContractFactory("LoanContract");
  const loanContract = await LoanContract.deploy(eduIDAddress);
  await loanContract.waitForDeployment();
  const loanContractAddress = await loanContract.getAddress();
  console.log("✅ LoanContract deployed to:", loanContractAddress);
  console.log("");

  // 4. Deploy ScholarshipContract
  console.log("🎓 Deploying ScholarshipContract...");
  const ScholarshipContract = await hre.ethers.getContractFactory("ScholarshipContract");
  const scholarshipContract = await ScholarshipContract.deploy(eduIDAddress);
  await scholarshipContract.waitForDeployment();
  const scholarshipContractAddress = await scholarshipContract.getAddress();
  console.log("✅ ScholarshipContract deployed to:", scholarshipContractAddress);
  console.log("");

  // 5. Deploy DAOGovernance
  console.log("🏛️  Deploying DAOGovernance contract...");
  const DAOGovernance = await hre.ethers.getContractFactory("DAOGovernance");
  const daoGovernance = await DAOGovernance.deploy(impactNFTAddress);
  await daoGovernance.waitForDeployment();
  const daoGovernanceAddress = await daoGovernance.getAddress();
  console.log("✅ DAOGovernance deployed to:", daoGovernanceAddress);
  console.log("");

  // 6. Set LoanContract address in ImpactNFT
  console.log("🔗 Setting up contract connections...");
  const setLoanContractTx = await impactNFT.setLoanContract(loanContractAddress);
  await setLoanContractTx.wait();
  console.log("✅ ImpactNFT connected to LoanContract");
  console.log("");

  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      EduID: eduIDAddress,
      ImpactNFT: impactNFTAddress,
      LoanContract: loanContractAddress,
      ScholarshipContract: scholarshipContractAddress,
      DAOGovernance: daoGovernanceAddress
    }
  };

  const deploymentPath = path.join(__dirname, "../deployments.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentPath);
  console.log("");

  // Create .env format for easy copy-paste
  console.log("📋 Add these to your .env.local file:");
  console.log("================================");
  console.log(`NEXT_PUBLIC_EDUID_CONTRACT_ADDRESS=${eduIDAddress}`);
  console.log(`NEXT_PUBLIC_IMPACT_NFT_CONTRACT_ADDRESS=${impactNFTAddress}`);
  console.log(`NEXT_PUBLIC_LOAN_CONTRACT_ADDRESS=${loanContractAddress}`);
  console.log(`NEXT_PUBLIC_SCHOLARSHIP_CONTRACT_ADDRESS=${scholarshipContractAddress}`);
  console.log(`NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=${daoGovernanceAddress}`);
  console.log("================================");
  console.log("");

  console.log("🎉 All contracts deployed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
