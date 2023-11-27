import { useState } from "react";

import { useAccount } from "wagmi";
//import { parseEther } from "viem";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
//const ethers = require('ethers'); // Import ethers.js


export const ContractInteraction = () => {
    const [visible, setVisible] = useState(true);

    // intitialze values: the second variables such as "setAddresses" is function provided by useState
    // .. to update variables.
    const [addresses, setAddresses] = useState(["0xAddress1", "0xAddress2"]); // Initialize with default values
    // useState() React hook for managing state.
    const [integerValue, setIntegerValue] = useState(0);
    const [additionalAddress, setAdditionalAddress] = useState("0xAdditionalAddress");

    const args = [addresses, BigInt(integerValue), additionalAddress];

    // useScaffoldContractWrite probably a custom hook.
    const { writeAsync, isLoading } = useScaffoldContractWrite({
        contractName: "MultiSignatureWalletFactory",
        functionName: "createWallet",
        args: args as [string[], bigint, string], // Adjust the type based on your contract function signature
        onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
        },
    });

    // const { address } = useAccount(); // Get the user's address using the useAccount hook
    // const fixedAmount = 1000000000000000000; // 1 ETH worth of WETH
    // const args3 = [address, fixedAmount]; // Provide the user's address and the fixed uint value
    // const { writeAsync: writeAsync3, isLoading: isLoading3 } = useScaffoldContractWrite({
    //     contractName: "TestToken",
    //     functionName: "mint",
    //     args: args3 as [string | undefined, bigint | undefined], // Ensure two elements in the array
    //     onBlockConfirmation: txnReceipt => {
    //         console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    //     },
    // });


    return (
        <div className="flex bg-base-300 relative pb-10">
            <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
                <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
                    <button
                        className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
                        onClick={() => setVisible(false)}
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex flex-col mt-1 px-2 py-1 mx-2 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-4xl sm:text-2xl text-black">Done, Create Multi Wallet!</span>
                        <div className="flex items-center">
                            <div className="flex rounded-full border-2 border-primary p-1">
                                <button
                                    className="btn btn-primary rounded-full capitalize font-normal font-white w-70 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                                    onClick={() => writeAsync()}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <>
                                            Get <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>




                {/* <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
                    <span className="text-4xl sm:text-6xl text-black">Mint Nuon Now!</span>

                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                        <input
                            type="text"
                            placeholder="Ratio"
                            className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                            onChange={e => {
                                const newValue = ethers.utils.parseUnits(e.target.value.toString(), 0);
                                setUintValues([newValue, uintValues[1]]); // Set the first value to its current value, and the second value to the parsed input
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Deposit"
                            className="input font-bai-jamjuree w-full px-2 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                            onChange={e => {
                                const newValue = BigInt(parseFloat(e.target.value) * 10 ** 18);
                                const newValue2 = ethers.utils.parseUnits(newValue.toString(), 0);
                                setUintValues([uintValues[0], newValue2]); // Set the first value to its current value, and the second value to the parsed input
                            }}
                        />

                    </div>
                </div> */}

            </div>
        </div>
    );
};