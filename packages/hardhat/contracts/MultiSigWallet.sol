// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Owned.sol";
import "./CryptographicVerification.sol";

contract MultiSignatureWallet is Owned {
	address[] public owners;
	mapping(address => bool) public isOwner;
	uint256 public quorum;

	Cryptographic cryptographic;

	receive() external payable {}

	event Deposit(address indexed sender, uint256 amount);
	event SubmitTransaction(
		address indexed owner,
		uint256 indexed transactionId,
		address indexed to,
		uint256 value,
		bytes data
	);
	event ConfirmTransaction(
		address indexed owner,
		uint256 indexed transactionId
	);
	event ExecuteTransaction(
		address indexed owner,
		uint256 indexed transactionId
	);

	// Constructor sets the initial owners and quorum
	constructor(
		address[] memory _owners,
		uint256 _quorum,
		address _cryptographic
	) {
		require(_owners.length > 0, "Owners required");
		require(_quorum > 0 && _quorum <= _owners.length, "Invalid quorum");

		for (uint256 i = 0; i < _owners.length; i++) {
			address owner = _owners[i];
			require(owner != address(0) && !isOwner[owner], "Invalid owner");
			isOwner[owner] = true;
			owners.push(owner);
		}

		cryptographic = Cryptographic(_cryptographic);
		quorum = _quorum;
	}

	// Submit a transaction for approval
	function submitTransaction(
		address to,
		uint256 value,
		bytes memory data,
		bytes memory userSignature
	) public onlyOwner returns (uint256 transactionId) {
		transactionId = transactions.length;
		transactions.push(
			Transaction(msg.sender, to, value, data, false, userSignature, 0)
		);
		emit SubmitTransaction(msg.sender, transactionId, to, value, data);
		return transactionId;
	}

	// Confirm a transaction
	function confirmTransaction(uint256 transactionId) public onlyOwner {
		Transaction storage transaction = transactions[transactionId];
		require(transaction.to != address(0), "Transaction does not exist");
		require(!transaction.executed, "Transaction already executed");

		transaction.confirmationCount++;

		emit ConfirmTransaction(msg.sender, transactionId);

		if (transaction.confirmationCount == quorum) {
			executeTransaction(transactionId);
		}
	}

	// Execute a transaction
	function executeTransaction(uint256 transactionId) public onlyOwner {
		Transaction storage transaction = transactions[transactionId];
		require(transaction.to != address(0), "Transaction does not exist");
		require(!transaction.executed, "Transaction already executed");
		require(
			transaction.confirmationCount >= quorum,
			"Not enough confirmations"
		);

		// Verify the signature before execution
		bool signatureVerified = cryptographic.verifySignature(
			keccak256(
				abi.encodePacked(
					transactionId,
					transaction.to,
					transaction.value,
					transaction.data
				)
			),
			transaction.signature,
			transaction.owner
		);

		require(signatureVerified, "Signature verification failed");

		transaction.executed = true;
		(bool success, ) = transaction.to.call{ value: transaction.value }(
			transaction.data
		);
		require(success, "Transaction execution failed");

		emit ExecuteTransaction(msg.sender, transactionId);
	}

	// Get transaction count
	function getTransactionCount() public view returns (uint256) {
		return transactions.length;
	}

	// Get confirmation count for a transaction
	function getConfirmationCount(
		uint256 transactionId
	) public view returns (uint256) {
		return transactions[transactionId].confirmationCount;
	}

	// Get information about a transaction
	function getTransaction(
		uint256 transactionId
	)
		public
		view
		returns (
			address owner,
			address to,
			uint256 value,
			bytes memory data,
			bool executed
		)
	{
		Transaction storage transaction = transactions[transactionId];
		return (
			transaction.owner,
			transaction.to,
			transaction.value,
			transaction.data,
			transaction.executed
		);
	}

	modifier onlyOwner() override {
		require(isOwner[msg.sender], "Not an owner");
		_;
	}

	struct Transaction {
		address owner;
		address to;
		uint256 value;
		bytes data;
		bool executed;
		bytes signature;
		uint256 confirmationCount;
	}

	Transaction[] public transactions;
}
