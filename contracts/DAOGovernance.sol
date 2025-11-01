// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ImpactNFT.sol";

/**
 * @title DAOGovernance
 * @dev Decentralized governance for EduLendX platform
 */
contract DAOGovernance is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _proposalIds;

    ImpactNFT public impactNFT;

    enum ProposalType { ScholarshipCriteria, InterestRate, FundDistribution, Other }
    enum ProposalStatus { Pending, Active, Passed, Rejected, Executed }

    struct Proposal {
        uint256 proposalId;
        address proposer;
        string title;
        string description;
        ProposalType proposalType;
        uint256 votesFor;
        uint256 votesAgainst;
        ProposalStatus status;
        uint256 createdAt;
        uint256 votingEnds;
        uint256 quorumRequired;
        bool executed;
        string ipfsHash;
    }

    struct Vote {
        address voter;
        bool support; // true = for, false = against
        uint256 votingPower;
        uint256 timestamp;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => Vote[]) public proposalVotes;

    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant QUORUM_PERCENTAGE = 30; // 30% of total voting power

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 votingPower);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalStatusChanged(uint256 indexed proposalId, ProposalStatus status);

    constructor(address _impactNFTAddress) Ownable(msg.sender) {
        impactNFT = ImpactNFT(_impactNFTAddress);
    }

    /**
     * @dev Create a new proposal
     */
    function createProposal(
        string memory _title,
        string memory _description,
        ProposalType _type,
        string memory _ipfsHash
    ) external returns (uint256) {
        // Require minimum voting power to create proposal
        uint256 voterPower = impactNFT.getVotingPower(msg.sender);
        require(voterPower >= 100, "Insufficient voting power");

        _proposalIds.increment();
        uint256 newProposalId = _proposalIds.current();

        proposals[newProposalId] = Proposal({
            proposalId: newProposalId,
            proposer: msg.sender,
            title: _title,
            description: _description,
            proposalType: _type,
            votesFor: 0,
            votesAgainst: 0,
            status: ProposalStatus.Active,
            createdAt: block.timestamp,
            votingEnds: block.timestamp + VOTING_PERIOD,
            quorumRequired: getTotalVotingPower() * QUORUM_PERCENTAGE / 100,
            executed: false,
            ipfsHash: _ipfsHash
        });

        emit ProposalCreated(newProposalId, msg.sender, _title);

        return newProposalId;
    }

    /**
     * @dev Vote on a proposal
     */
    function vote(uint256 _proposalId, bool _support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Active, "Proposal not active");
        require(block.timestamp <= proposal.votingEnds, "Voting period ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        uint256 votingPower = impactNFT.getVotingPower(msg.sender);
        require(votingPower > 0, "No voting power");

        hasVoted[_proposalId][msg.sender] = true;

        if (_support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }

        proposalVotes[_proposalId].push(Vote({
            voter: msg.sender,
            support: _support,
            votingPower: votingPower,
            timestamp: block.timestamp
        }));

        emit Voted(_proposalId, msg.sender, _support, votingPower);

        // Check if proposal should be finalized
        _checkProposalStatus(_proposalId);
    }

    /**
     * @dev Check and update proposal status
     */
    function _checkProposalStatus(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        if (block.timestamp > proposal.votingEnds) {
            uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
            
            if (totalVotes >= proposal.quorumRequired && proposal.votesFor > proposal.votesAgainst) {
                proposal.status = ProposalStatus.Passed;
                emit ProposalStatusChanged(_proposalId, ProposalStatus.Passed);
            } else {
                proposal.status = ProposalStatus.Rejected;
                emit ProposalStatusChanged(_proposalId, ProposalStatus.Rejected);
            }
        }
    }

    /**
     * @dev Execute a passed proposal (only owner)
     */
    function executeProposal(uint256 _proposalId) external onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Passed, "Proposal not passed");
        require(!proposal.executed, "Already executed");

        proposal.executed = true;
        proposal.status = ProposalStatus.Executed;

        emit ProposalExecuted(_proposalId);
        emit ProposalStatusChanged(_proposalId, ProposalStatus.Executed);
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 _proposalId) external view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    /**
     * @dev Get votes for a proposal
     */
    function getProposalVotes(uint256 _proposalId) external view returns (Vote[] memory) {
        return proposalVotes[_proposalId];
    }

    /**
     * @dev Get voting power for an address
     */
    function getVotingPower(address _voter) external view returns (uint256) {
        return impactNFT.getVotingPower(_voter);
    }

    /**
     * @dev Get total voting power (simplified - could be cached)
     */
    function getTotalVotingPower() public pure returns (uint256) {
        // This should be calculated from all Impact NFT holders
        // Simplified for now
        return 100000; // Mock total voting power
    }

    /**
     * @dev Finalize proposal after voting period
     */
    function finalizeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Active, "Not active");
        require(block.timestamp > proposal.votingEnds, "Voting still active");

        _checkProposalStatus(_proposalId);
    }

    /**
     * @dev Get total proposals count
     */
    function getTotalProposals() external view returns (uint256) {
        return _proposalIds.current();
    }

    /**
     * @dev Check if address has voted on proposal
     */
    function hasUserVoted(uint256 _proposalId, address _voter) external view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }
}
