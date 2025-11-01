// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./EduID.sol";

/**
 * @title ScholarshipContract
 * @dev Manages merit-based scholarship pools with transparent criteria
 */
contract ScholarshipContract is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _poolIds;
    Counters.Counter private _applicationIds;

    EduID public eduIDContract;

    enum PoolStatus { Active, Paused, Closed }
    enum ApplicationStatus { Pending, Approved, Rejected, Distributed }

    struct ScholarshipCriteria {
        uint256 minGPA; // e.g., 350 = 3.5 GPA (stored as basis points)
        uint256 minLearnScore;
        bool needBased;
        uint256 incomeThreshold;
        string customRequirements; // IPFS hash
    }

    struct ScholarshipPool {
        uint256 poolId;
        string name;
        string description;
        uint256 totalFunds;
        uint256 availableFunds;
        uint256 scholarshipAmount; // Amount per recipient
        address[] donors;
        ScholarshipCriteria criteria;
        PoolStatus status;
        uint256 createdAt;
        string ipfsHash;
    }

    struct Application {
        uint256 applicationId;
        uint256 poolId;
        address applicant;
        uint256 eduIDToken;
        string credentialsHash; // IPFS hash
        ApplicationStatus status;
        uint256 appliedAt;
        uint256 processedAt;
        string rejectionReason;
    }

    mapping(uint256 => ScholarshipPool) public pools;
    mapping(uint256 => Application) public applications;
    mapping(uint256 => uint256[]) public poolApplications; // poolId => applicationIds
    mapping(address => uint256[]) public userApplications;
    mapping(uint256 => address[]) public poolRecipients;

    event PoolCreated(uint256 indexed poolId, string name, uint256 amount);
    event PoolFunded(uint256 indexed poolId, address indexed donor, uint256 amount);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed poolId, address indexed applicant);
    event ApplicationApproved(uint256 indexed applicationId, uint256 indexed poolId);
    event ApplicationRejected(uint256 indexed applicationId, string reason);
    event ScholarshipDistributed(uint256 indexed poolId, address indexed recipient, uint256 amount);

    constructor(address _eduIDAddress) Ownable(msg.sender) {
        eduIDContract = EduID(_eduIDAddress);
    }

    /**
     * @dev Create a new scholarship pool
     */
    function createPool(
        string memory _name,
        string memory _description,
        uint256 _scholarshipAmount,
        ScholarshipCriteria memory _criteria,
        string memory _ipfsHash
    ) external payable returns (uint256) {
        require(msg.value > 0, "Must fund pool");
        require(_scholarshipAmount > 0, "Invalid scholarship amount");
        require(bytes(_name).length > 0, "Name required");

        _poolIds.increment();
        uint256 newPoolId = _poolIds.current();

        address[] memory donors = new address[](1);
        donors[0] = msg.sender;

        pools[newPoolId] = ScholarshipPool({
            poolId: newPoolId,
            name: _name,
            description: _description,
            totalFunds: msg.value,
            availableFunds: msg.value,
            scholarshipAmount: _scholarshipAmount,
            donors: donors,
            criteria: _criteria,
            status: PoolStatus.Active,
            createdAt: block.timestamp,
            ipfsHash: _ipfsHash
        });

        emit PoolCreated(newPoolId, _name, msg.value);

        return newPoolId;
    }

    /**
     * @dev Add funds to existing pool
     */
    function fundPool(uint256 _poolId) external payable {
        ScholarshipPool storage pool = pools[_poolId];
        require(pool.status == PoolStatus.Active, "Pool not active");
        require(msg.value > 0, "Must send funds");

        pool.totalFunds += msg.value;
        pool.availableFunds += msg.value;
        pool.donors.push(msg.sender);

        emit PoolFunded(_poolId, msg.sender, msg.value);
    }

    /**
     * @dev Apply for scholarship
     */
    function applyForScholarship(
        uint256 _poolId,
        string memory _credentialsHash
    ) external returns (uint256) {
        require(eduIDContract.hasEduID(msg.sender), "Must have EduID");
        ScholarshipPool storage pool = pools[_poolId];
        require(pool.status == PoolStatus.Active, "Pool not active");
        require(pool.availableFunds >= pool.scholarshipAmount, "Insufficient funds");

        _applicationIds.increment();
        uint256 newApplicationId = _applicationIds.current();

        uint256 eduIDToken = eduIDContract.getTokenIdByAddress(msg.sender);

        applications[newApplicationId] = Application({
            applicationId: newApplicationId,
            poolId: _poolId,
            applicant: msg.sender,
            eduIDToken: eduIDToken,
            credentialsHash: _credentialsHash,
            status: ApplicationStatus.Pending,
            appliedAt: block.timestamp,
            processedAt: 0,
            rejectionReason: ""
        });

        poolApplications[_poolId].push(newApplicationId);
        userApplications[msg.sender].push(newApplicationId);

        emit ApplicationSubmitted(newApplicationId, _poolId, msg.sender);

        return newApplicationId;
    }

    /**
     * @dev Approve application and distribute scholarship
     */
    function approveApplication(uint256 _applicationId) external onlyOwner nonReentrant {
        Application storage application = applications[_applicationId];
        require(application.status == ApplicationStatus.Pending, "Invalid status");

        ScholarshipPool storage pool = pools[application.poolId];
        require(pool.availableFunds >= pool.scholarshipAmount, "Insufficient funds");

        // Check if applicant meets criteria
        EduID.Identity memory identity = eduIDContract.getIdentity(application.eduIDToken);
        require(identity.learnScore >= pool.criteria.minLearnScore, "LearnScore too low");

        application.status = ApplicationStatus.Approved;
        application.processedAt = block.timestamp;

        pool.availableFunds -= pool.scholarshipAmount;
        poolRecipients[application.poolId].push(application.applicant);

        // Transfer scholarship
        payable(application.applicant).transfer(pool.scholarshipAmount);

        emit ApplicationApproved(_applicationId, application.poolId);
        emit ScholarshipDistributed(application.poolId, application.applicant, pool.scholarshipAmount);
    }

    /**
     * @dev Reject application
     */
    function rejectApplication(uint256 _applicationId, string memory _reason) external onlyOwner {
        Application storage application = applications[_applicationId];
        require(application.status == ApplicationStatus.Pending, "Invalid status");

        application.status = ApplicationStatus.Rejected;
        application.processedAt = block.timestamp;
        application.rejectionReason = _reason;

        emit ApplicationRejected(_applicationId, _reason);
    }

    /**
     * @dev Get pool details
     */
    function getPool(uint256 _poolId) external view returns (ScholarshipPool memory) {
        return pools[_poolId];
    }

    /**
     * @dev Get application details
     */
    function getApplication(uint256 _applicationId) external view returns (Application memory) {
        return applications[_applicationId];
    }

    /**
     * @dev Get applications for a pool
     */
    function getPoolApplications(uint256 _poolId) external view returns (uint256[] memory) {
        return poolApplications[_poolId];
    }

    /**
     * @dev Get user applications
     */
    function getUserApplications(address _user) external view returns (uint256[] memory) {
        return userApplications[_user];
    }

    /**
     * @dev Get pool recipients
     */
    function getPoolRecipients(uint256 _poolId) external view returns (address[] memory) {
        return poolRecipients[_poolId];
    }

    /**
     * @dev Update pool status
     */
    function updatePoolStatus(uint256 _poolId, PoolStatus _status) external onlyOwner {
        pools[_poolId].status = _status;
    }

    /**
     * @dev Get total pools count
     */
    function getTotalPools() external view returns (uint256) {
        return _poolIds.current();
    }
}
