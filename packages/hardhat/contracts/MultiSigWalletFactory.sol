// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MultiSigWallet.sol";

contract MultiSignatureWalletFactory is Owned {
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
	) public returns (address wallet) {
		MultiSignatureWallet newWallet = new MultiSignatureWallet(
			_owners,
			_quorum,
			__cryptographic
		);
		emit WalletCreated(address(newWallet), _owners, _quorum);
		return address(newWallet);
	}
}
