// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Owned {
	address public owner;

	event OwnershipTransferred(
		address indexed previousOwner,
		address indexed newOwner
	);

	constructor() {
		owner = msg.sender;
	}

	modifier onlyOwner() virtual {
		require(msg.sender == owner, "Not an owner");
		_;
	}

	function transferOwnership(address newOwner) public onlyOwner {
		require(newOwner != address(0), "Invalid new owner");
		emit OwnershipTransferred(owner, newOwner);
		owner = newOwner;
	}
}
