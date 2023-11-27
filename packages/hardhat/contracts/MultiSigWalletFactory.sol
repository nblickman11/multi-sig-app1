// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MultiSigWallet.sol";

import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MultiSignatureWalletFactory is Ownable {
	event WalletCreated(
		address indexed wallet,
		address[] indexed owners,
		uint256 quorum
	);

	// Create a new multi-signature wallet
	function createWallet(
		address[] memory _owners,
		uint256 _quorum,
		address __cryptographic
	) public onlyOwner returns (address wallet) {
		require(_owners.length > 0, "Owners list must not be empty");
		require(
			_quorum > 0 && _quorum <= _owners.length,
			"Invalid quorum value"
		);

		MultiSignatureWallet newWallet = new MultiSignatureWallet(
			_owners,
			_quorum,
			__cryptographic
		);
		emit WalletCreated(address(newWallet), _owners, _quorum);
		return address(newWallet);
	}
}
