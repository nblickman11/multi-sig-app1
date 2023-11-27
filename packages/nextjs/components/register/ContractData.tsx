
// import { useAccount } from "wagmi";
// import {
//     useScaffoldContractRead, //useScaffoldEventHistory,
//     //useScaffoldEventSubscriber,
// } from "~~/hooks/scaffold-eth";

// export const ContractData = () => {
//     const { address } = useAccount();
//     const { data: totalCounter } = useScaffoldContractRead({
//         contractName: "YourContract",
//         functionName: "totalCounter",
//     });

//     const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
//         contractName: "YourContract",
//         functionName: "greeting",
//     });

//     return (
//         < div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] " >
//             <div className="bg-primary border border-primary rounded-xl flex">
//                 <div className="p-2 py-1 border-r border-primary flex items-end text-white">WETH Balance:</div>
//                 {testTokenAmount !== undefined && ethPrice !== undefined ? (
//                     <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree text-white">
//                         {((Number(testTokenAmount.toString()) / 10 ** 18)).toFixed(4)}<span className="text-base mt-2">&nbsp;&nbsp;(${(((Number(testTokenAmount.toString()) / 10 ** 18) * (Number(ethPrice.toString())) / 10 ** 18)).toFixed(0)})</span>
//                     </div>
//                 ) : (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree text-white">0</div>
//                 )}
//             </div>
//             <br />
//             <div className="bg-primary border border-primary rounded-xl flex">
//                 <div className="p-2 py-1 border-r border-primary flex items-end text-white">Real Time WETH Price:</div>
//                 {ethPrice !== undefined ? (
//                     <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree text-white">
//                         ${((Number(ethPrice.toString()) / 10 ** 18)).toFixed(2)}<span className="text-sm mt-2.5">&nbsp;</span>
//                     </div>
//                 ) : (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree text-white">0</div>
//                 )}
//             </div>
//             <br />
//             <br />
//             <br />

//             <br />
//             <br />
//             <br /> {/* Add this line break element to create a new line */}
//             <div className="bg-secondary border border-primary rounded-xl flex">
//                 <div className="p-2 py-1 border-r border-primary flex items-end">Minted Nuon Amount</div>
//                 {mintedAmount !== undefined ? (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
//                         {(Number(mintedAmount.toString()) / 10 ** 18).toFixed(2)}
//                     </div>
//                 ) : (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">0</div>
//                 )}
//             </div>
//             <br /> {/* Add this line break element to create a new line */}

//             <div className="bg-secondary border border-primary rounded-xl flex">
//                 <div className="p-2 py-1 border-r border-primary flex items-end">Collateral WETH Amount</div>
//                 {collateralAmount !== undefined && ethPrice !== undefined ? (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
//                         {((Number(collateralAmount.toString()) / 10 ** 18)).toFixed(4)}<span className="text-2xl mt-2.5">&nbsp;&nbsp;(${(((Number(collateralAmount.toString()) / 10 ** 18) * (Number(ethPrice.toString())) / 10 ** 18)).toFixed(0)})</span>
//                     </div>
//                 ) : (
//                     <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">0</div>
//                 )}
//             </div>

//         </div >
//     );
// };