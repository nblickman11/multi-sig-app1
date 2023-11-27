import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSignatureWalletFactory } from "../typechain-types/MultiSigWalletFactory.sol";
import { Cryptographic } from "../typechain-types/CryptographicVerification.sol";

describe("MultiSigFactoryTestSuite", function () {
  // Before runs once before all tests.  (BeforeEach would run before each individual test.)
  // Before sets the initial state, which is shared by the tests.  However, it has it's own scope,
  // .. so we must initialize the variables here.
  let multiSigWalletFactoryInstance: MultiSignatureWalletFactory;
  let cryptographicInstance: Cryptographic;

  before(async () => {
    const multiSigWalletFactory = await ethers.getContractFactory("MultiSignatureWalletFactory");
    // Use "asMultiSignatureWalletFactory" to tell TypeScript the type.  Otherwise it was asking
    // for some generic Contract type.
    multiSigWalletFactoryInstance = (await multiSigWalletFactory.deploy()) as MultiSignatureWalletFactory;
    await multiSigWalletFactoryInstance.deployed();

    const Cryptographic = await ethers.getContractFactory("Cryptographic");
    cryptographicInstance = (await Cryptographic.deploy()) as Cryptographic;
    await cryptographicInstance.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy MultiSigWalletFactory contract", async function () {
      expect(multiSigWalletFactoryInstance.address).to.not.equal(undefined);
    });

    it("Should have the correct owner", async function () {
      // First account in local hardhat node.
      const [owner] = await ethers.getSigners();
      const contractOwner = await multiSigWalletFactoryInstance.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("Wallet Creation", function () {
    it("Should create a new wallet", async function () {
      const [owner1, owner2] = await ethers.getSigners();
      const owners = [owner1.address, owner2.address];
      const quorum = 2;
      const newWalletTx = await multiSigWalletFactoryInstance.createWallet(
        owners,
        quorum,
        cryptographicInstance.address,
      );

      // Check if the WalletCreated event was emitted
      const receipt = await newWalletTx.wait();
      // .find is JS func that returns undefined if no element found in array.
      // .find((event) => ...) first part just represents iterating through each event.
      // ? prevents runtime errors: makes sure "receipt" is defined.
      const walletCreatedEvent = receipt.events?.find(event => event.event === "WalletCreated");
      expect(walletCreatedEvent).to.not.equal(undefined);
    });
  });
});
