// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title EduID
 * @dev Soulbound NFT representing academic identity
 * Cannot be transferred after minting (soulbound)
 */
contract EduID is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Identity {
        string name;
        string institution;
        string credentialsHash; // IPFS hash of credentials
        uint256 learnScore;
        uint256 mintedAt;
        bool isActive;
    }

    mapping(uint256 => Identity) public identities;
    mapping(address => uint256) public addressToTokenId;
    mapping(address => bool) public hasEduID;

    event EduIDMinted(address indexed holder, uint256 indexed tokenId, string name);
    event LearnScoreUpdated(uint256 indexed tokenId, uint256 newScore);
    event CredentialsUpdated(uint256 indexed tokenId, string newHash);

    constructor() ERC721("EduID", "EDU") Ownable(msg.sender) {}

    /**
     * @dev Mint a new EduID (soulbound NFT)
     */
    function mintEduID(
        string memory _name,
        string memory _institution,
        string memory _credentialsHash
    ) external returns (uint256) {
        require(!hasEduID[msg.sender], "Already has EduID");
        require(bytes(_name).length > 0, "Name required");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);

        identities[newTokenId] = Identity({
            name: _name,
            institution: _institution,
            credentialsHash: _credentialsHash,
            learnScore: 500, // Starting score
            mintedAt: block.timestamp,
            isActive: true
        });

        addressToTokenId[msg.sender] = newTokenId;
        hasEduID[msg.sender] = true;

        emit EduIDMinted(msg.sender, newTokenId, _name);

        return newTokenId;
    }

    /**
     * @dev Update LearnScore (only owner or authorized contracts)
     */
    function updateLearnScore(uint256 _tokenId, uint256 _newScore) external onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        identities[_tokenId].learnScore = _newScore;
        emit LearnScoreUpdated(_tokenId, _newScore);
    }

    /**
     * @dev Update credentials hash
     */
    function updateCredentials(uint256 _tokenId, string memory _newHash) external {
        require(ownerOf(_tokenId) == msg.sender, "Not token owner");
        identities[_tokenId].credentialsHash = _newHash;
        emit CredentialsUpdated(_tokenId, _newHash);
    }

    /**
     * @dev Get identity details
     */
    function getIdentity(uint256 _tokenId) external view returns (Identity memory) {
        require(_exists(_tokenId), "Token does not exist");
        return identities[_tokenId];
    }

    /**
     * @dev Get token ID by address
     */
    function getTokenIdByAddress(address _holder) external view returns (uint256) {
        require(hasEduID[_holder], "No EduID found");
        return addressToTokenId[_holder];
    }

    /**
     * @dev Override transfer functions to make it soulbound
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "EduID: Soulbound token cannot be transferred");
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Disable approvals (soulbound)
     */
    function approve(address, uint256) public virtual override {
        revert("EduID: Soulbound token cannot be approved");
    }

    function setApprovalForAll(address, bool) public virtual override {
        revert("EduID: Soulbound token cannot be approved");
    }
}
