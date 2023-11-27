import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSignatureWallet } from "../typechain-types/MultiSigWallet.sol";

describe("MultiSigFactoryTestSuite", function () {
  // Before runs once before all tests.  (BeforeEach would run before each individual test.)
  // Before sets the initial state, which is shared by the tests.  However, it has it's own scope,
  // .. so we must initialize the variables here.
  let multiSigWalletInstance: MultiSignatureWallet;

  before(async () => {
    const MultiSigWallet = await ethers.getContractFactory("MultiSignatureWalletFactory");
    // Use "asMultiSignatureWallet" to tell TypeScript the type.  Otherwise it was asking
    // for some generic Contract type.
    multiSigWalletInstance = (await MultiSigWallet.deploy()) as MultiSignatureWallet;
    await multiSigWalletInstance.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy MultiSigWallet contract", async function () {
    });
  });

  describe("Wallet Creation", function () {

  });

});
