// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ImpactNFT
 * @dev NFT minted for lenders who fund student loans
 * Represents social impact and can unlock governance power
 */
contract ImpactNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ImpactData {
        address lender;
        uint256 loanId;
        uint256 amountFunded;
        uint256 expectedReturn;
        uint256 actualReturn;
        uint256 mintedAt;
        bool loanCompleted;
        string metadataURI; // IPFS hash
    }

    mapping(uint256 => ImpactData) public impactData;
    mapping(address => uint256[]) public lenderNFTs;
    mapping(uint256 => uint256) public loanToNFT; // loanId => tokenId

    address public loanContract;

    event ImpactNFTMinted(address indexed lender, uint256 indexed tokenId, uint256 loanId);
    event ImpactUpdated(uint256 indexed tokenId, uint256 actualReturn);

    constructor() ERC721("EduLendX Impact NFT", "IMPACT") Ownable(msg.sender) {}

    /**
     * @dev Set loan contract address (only owner)
     */
    function setLoanContract(address _loanContract) external onlyOwner {
        loanContract = _loanContract;
    }

    /**
     * @dev Mint Impact NFT for lender
     */
    function mintImpactNFT(
        address _lender,
        uint256 _loanId,
        uint256 _amountFunded,
        uint256 _expectedReturn,
        string memory _metadataURI
    ) external returns (uint256) {
        require(msg.sender == loanContract || msg.sender == owner(), "Not authorized");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(_lender, newTokenId);

        impactData[newTokenId] = ImpactData({
            lender: _lender,
            loanId: _loanId,
            amountFunded: _amountFunded,
            expectedReturn: _expectedReturn,
            actualReturn: 0,
            mintedAt: block.timestamp,
            loanCompleted: false,
            metadataURI: _metadataURI
        });

        lenderNFTs[_lender].push(newTokenId);
        loanToNFT[_loanId] = newTokenId;

        emit ImpactNFTMinted(_lender, newTokenId, _loanId);

        return newTokenId;
    }

    /**
     * @dev Update impact data when loan is repaid
     */
    function updateImpact(uint256 _tokenId, uint256 _actualReturn) external {
        require(msg.sender == loanContract || msg.sender == owner(), "Not authorized");
        require(_exists(_tokenId), "Token does not exist");

        impactData[_tokenId].actualReturn = _actualReturn;
        impactData[_tokenId].loanCompleted = true;

        emit ImpactUpdated(_tokenId, _actualReturn);
    }

    /**
     * @dev Get impact data for NFT
     */
    function getImpactData(uint256 _tokenId) external view returns (ImpactData memory) {
        require(_exists(_tokenId), "Token does not exist");
        return impactData[_tokenId];
    }

    /**
     * @dev Get all NFTs owned by lender
     */
    function getLenderNFTs(address _lender) external view returns (uint256[] memory) {
        return lenderNFTs[_lender];
    }

    /**
     * @dev Get total impact by lender (total amount funded)
     */
    function getTotalImpact(address _lender) external view returns (uint256) {
        uint256[] memory nfts = lenderNFTs[_lender];
        uint256 total = 0;
        
        for (uint256 i = 0; i < nfts.length; i++) {
            total += impactData[nfts[i]].amountFunded;
        }
        
        return total;
    }

    /**
     * @dev Get voting power based on impact
     */
    function getVotingPower(address _lender) external view returns (uint256) {
        // 1 voting power per 100 units funded + 5000 per NFT
        uint256 totalFunded = this.getTotalImpact(_lender);
        uint256 nftBonus = lenderNFTs[_lender].length * 5000;
        return (totalFunded / 100) + nftBonus;
    }

    /**
     * @dev Override tokenURI to return IPFS metadata
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return impactData[tokenId].metadataURI;
    }
}
