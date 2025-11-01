// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./EduID.sol";

/**
 * @title LoanContract
 * @dev Manages peer-to-peer student loans with NFT-based identity
 */
contract LoanContract is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _loanIds;

    EduID public eduIDContract;

    enum LoanStatus { Pending, Approved, Funded, Repaying, Completed, Defaulted }

    struct Loan {
        uint256 loanId;
        address borrower;
        uint256 eduIDToken;
        uint256 requestedAmount;
        uint256 fundedAmount;
        uint256 repaidAmount;
        uint256 interestRate; // basis points (e.g., 700 = 7%)
        uint256 term; // months
        string purpose;
        LoanStatus status;
        uint256 createdAt;
        uint256 fundingDeadline;
        uint256 repaymentStart;
        string ipfsHash;
    }

    struct Lender {
        address lenderAddress;
        uint256 amountFunded;
        uint256 amountRepaid;
        bool active;
    }

    mapping(uint256 => Loan) public loans;
    mapping(uint256 => Lender[]) public loanLenders;
    mapping(address => uint256[]) public borrowerLoans;
    mapping(address => uint256[]) public lenderLoans;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanFunded(uint256 indexed loanId, address indexed lender, uint256 amount);
    event LoanRepayment(uint256 indexed loanId, uint256 amount);
    event LoanCompleted(uint256 indexed loanId);
    event LoanDefaulted(uint256 indexed loanId);

    constructor(address _eduIDAddress) Ownable(msg.sender) {
        eduIDContract = EduID(_eduIDAddress);
    }

    /**
     * @dev Create a new loan request
     */
    function createLoan(
        uint256 _amount,
        uint256 _interestRate,
        uint256 _term,
        string memory _purpose,
        string memory _ipfsHash
    ) external returns (uint256) {
        require(eduIDContract.hasEduID(msg.sender), "Must have EduID");
        require(_amount > 0, "Invalid amount");
        require(_term > 0 && _term <= 48, "Term must be 1-48 months");

        _loanIds.increment();
        uint256 newLoanId = _loanIds.current();

        uint256 eduIDToken = eduIDContract.getTokenIdByAddress(msg.sender);

        loans[newLoanId] = Loan({
            loanId: newLoanId,
            borrower: msg.sender,
            eduIDToken: eduIDToken,
            requestedAmount: _amount,
            fundedAmount: 0,
            repaidAmount: 0,
            interestRate: _interestRate,
            term: _term,
            purpose: _purpose,
            status: LoanStatus.Approved,
            createdAt: block.timestamp,
            fundingDeadline: block.timestamp + 30 days,
            repaymentStart: 0,
            ipfsHash: _ipfsHash
        });

        borrowerLoans[msg.sender].push(newLoanId);

        emit LoanCreated(newLoanId, msg.sender, _amount);

        return newLoanId;
    }

    /**
     * @dev Fund a loan (partial or full)
     */
    function fundLoan(uint256 _loanId) external payable nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Approved, "Loan not available");
        require(block.timestamp <= loan.fundingDeadline, "Funding deadline passed");
        require(msg.value > 0, "Must send funds");
        
        uint256 remainingAmount = loan.requestedAmount - loan.fundedAmount;
        require(msg.value <= remainingAmount, "Exceeds required amount");

        loan.fundedAmount += msg.value;

        loanLenders[_loanId].push(Lender({
            lenderAddress: msg.sender,
            amountFunded: msg.value,
            amountRepaid: 0,
            active: true
        }));

        lenderLoans[msg.sender].push(_loanId);

        if (loan.fundedAmount >= loan.requestedAmount) {
            loan.status = LoanStatus.Funded;
            loan.repaymentStart = block.timestamp;
            // Transfer funds to borrower
            payable(loan.borrower).transfer(loan.requestedAmount);
        }

        emit LoanFunded(_loanId, msg.sender, msg.value);
    }

    /**
     * @dev Make a loan repayment
     */
    function makePayment(uint256 _loanId) external payable nonReentrant {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Not borrower");
        require(loan.status == LoanStatus.Funded || loan.status == LoanStatus.Repaying, "Invalid status");
        require(msg.value > 0, "Must send payment");

        loan.status = LoanStatus.Repaying;
        loan.repaidAmount += msg.value;

        // Calculate total amount due (principal + interest)
        uint256 totalDue = loan.requestedAmount + (loan.requestedAmount * loan.interestRate / 10000);

        // Distribute payment to lenders proportionally
        Lender[] storage lenders = loanLenders[_loanId];
        for (uint256 i = 0; i < lenders.length; i++) {
            if (lenders[i].active) {
                uint256 lenderShare = (msg.value * lenders[i].amountFunded) / loan.fundedAmount;
                lenders[i].amountRepaid += lenderShare;
                payable(lenders[i].lenderAddress).transfer(lenderShare);
            }
        }

        if (loan.repaidAmount >= totalDue) {
            loan.status = LoanStatus.Completed;
            emit LoanCompleted(_loanId);
        }

        emit LoanRepayment(_loanId, msg.value);
    }

    /**
     * @dev Mark loan as defaulted (only owner)
     */
    function markDefaulted(uint256 _loanId) external onlyOwner {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Funded || loan.status == LoanStatus.Repaying, "Invalid status");
        loan.status = LoanStatus.Defaulted;
        emit LoanDefaulted(_loanId);
    }

    /**
     * @dev Get loan details
     */
    function getLoan(uint256 _loanId) external view returns (Loan memory) {
        return loans[_loanId];
    }

    /**
     * @dev Get all loans by borrower
     */
    function getLoansByBorrower(address _borrower) external view returns (uint256[] memory) {
        return borrowerLoans[_borrower];
    }

    /**
     * @dev Get all loans by lender
     */
    function getLoansByLender(address _lender) external view returns (uint256[] memory) {
        return lenderLoans[_lender];
    }

    /**
     * @dev Get lenders for a loan
     */
    function getLoanLenders(uint256 _loanId) external view returns (Lender[] memory) {
        return loanLenders[_loanId];
    }

    /**
     * @dev Get total active loans count
     */
    function getTotalLoans() external view returns (uint256) {
        return _loanIds.current();
    }
}
