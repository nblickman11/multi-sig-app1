// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// User's will sign a transaction with their private key, resulting in the ECDSA signature,
// consisting of r, s, and v.  The transaction data AND the signature is sent to the contract.
// Reminder: the public key is a point on an elliptic curve, and is derived from the private key.
// So, with the siganture and transaction hash data, in the code below, we can rederive the 
// public key, which then leads to the user address.  If this address is the same as the msg.sender
// of the transaction, we have confirmed that the person who signed the transaction is the same
// as the one who sent it to the chain.

contract Cryptographic{
    // Verify a digital signature
    function verifySignature(
        bytes32 message,
        bytes memory signature,
        address signer
    ) public pure returns (bool) {
        // Recover the signer's public key from the signature
        address recoveredSigner = recoverSigner(message, signature);
        
        // Verify that the recovered signer matches the expected signer
        return recoveredSigner == signer;
    }

    // Internal function to recover the signer's address from a signature
    function recoverSigner(bytes32 message, bytes memory signature)
        internal
        pure
        returns (address)
    {
        // ECDSA recovery magic value
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Split the signature into its components
        assembly {
            // add(signature, 0x20 (which 32 bytes)) adds an 32 byte offset to the memory location of signature.
            // then that is loaded into variable r.
            r := mload(add(signature, 0x20))
            // next, we add 64 bytes into memory location of signature, and only the first 32 bytes are 
            // loaded to s.  In other words, this is just the long way of grabbing the second 32 bytes
            // of the signature and putting them into s. (r already has the first 32 bytes.)
            s := mload(add(signature, 0x40))
            // "v" has the last byte of the signature.
            v := byte(0, mload(add(signature, 0x60)))
        }

        // ECDSA recovery.  Some standardization process required.
        if (v < 27) {
            v += 27;
        }

        // Recover the signer's public key using Solidity's built in ecrecover() function.
        // To go from public key to recoveredSigner (or address) it's the 20 byte value of the
        // keccack256 hash of the uncompressed public key.
        address recoveredSigner = ecrecover(message, v, r, s);

        // Return the signer's address
        return recoveredSigner;
    }
}
