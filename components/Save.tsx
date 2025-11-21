// 'use client';
// import React, { useEffect, useState } from 'react';
// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";
// import { useImageLoader } from '@/hooks/useImageLoader';
// import { useAccount } from 'wagmi';
// import { ethers, formatUnits } from 'ethers';

// import { useErrorPopup } from '@/hooks/useErrorPopup';
// import { ErrorPopup } from '@/components/popups/ErrorPopup';
// import { useToastify } from '@/hooks/useToastify';
// import { ToastPopup } from '@/components/popups/ToastPopup';

// import NFTManager from "@/abi/NFTManager.json";

// interface PageProps {
//     params: {
//         id: string;
//     }
// }


// interface Collection {
//   id: string;
//   collectionAddress: string;
//   name: string;
//   symbol: string;
//   description: string;
//   owner: string;
//   timeCreated: string;
//   price: string;
//   maxSupply: string;
//   imageURI: string;
//   blockNumber: string;
//   blockTimestamp: string;
//   transactionHash: string;
// }

// interface GetCollectionResponse {
//   collectionCreated: Collection;
// }


// interface CollectionStats {
//     id: string;
//     totalMinted: string;
//     totalVolume: string;
//     firstMintTime: string;
//     latestMintTime: string;
//     uniqueMinters: string;
// }
// interface GetCollectionStatsResponse {
//   collectionStats: CollectionStats;
// }

// const GET_COLLECTION = gql`
//   query GetCollection ($id: ID!) {
//     collectionCreated (id: $id) {
//         id
//         collectionAddress
//         name
//         symbol
//         description
//         owner
//         timeCreated
//         price
//         maxSupply
//         imageURI
//         blockNumber
//         blockTimestamp
//         transactionHash
//     }
//   }
// `;


// const GET_COLLECTION_STATS = gql`
//   query GetcollectionStats ($id: ID!) {
//     collectionStats (id: $id) {
//         id
//         totalMinted
//         totalVolume
//         firstMintTime
//         latestMintTime
//         uniqueMinters
//     }
//   }
// `;

// const page: React.FC<PageProps> = ({ params }) => {


//     const { id } = params;

//     const [loadingMessage, setLoadingMessage] =useState("");
//     const [errorMessage, setErrorMessage] = useState<string>("");
//     const { isOpen: isToastOpen, openPopup: openToastPopup, closePopup: closeToastPopup } = useToastify();
//     const { isOpen: isErrorOpen, openPopup: openErrorPopup, closePopup: closeErrorPopup } = useErrorPopup();


//     const [contractETHBalance, setContractETHBalance] = useState("0");
//     const { loading, data, error } = useQuery<GetCollectionResponse>(GET_COLLECTION, {
//         variables: { id }
//     });
//     const { loading: collectionStatLoading, data: collectionStat, error: collectionStatError } = useQuery<GetCollectionStatsResponse>(GET_COLLECTION_STATS, {
//         variables: { id }
//     });

//     const { imageSrc, isLoading, } = useImageLoader(data?.collectionCreated?.imageURI || "");
//     const { address } = useAccount();

//     const withdrawETHFromContract = async() => {
//         try {
//             console.log({contractETHBalance});

//             openToastPopup();
//             setLoadingMessage("Withdrawing ETH from contract ...");
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const signer = await provider.getSigner();
//             const contract = new ethers.Contract(
//                 id,
//                 NFTManager.abi,
//                 signer
//             );

//             const tx =await contract.withdraw();
//             const response = await tx.wait();
//             console.log(response);
//             closeToastPopup()
//             setLoadingMessage("");
//         } catch (err) {
//             closeToastPopup();
//             console.log({errorMessage: err})
//             setErrorMessage(String(err));
//             openErrorPopup();
//             console.log(err);
//         }
        

//     }

//     useEffect(() => {

//         const fetchBalance = async() => {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 const ETHBalance = await provider?.getBalance(id);
//                 setContractETHBalance(String(ETHBalance));
//                 console.log(String(ETHBalance));
//             } catch(err) {
//                 console.log(err);
//             }
            
//         }
//         fetchBalance()
//     }, [contractETHBalance, address, id])
    

//     if (loading) return <p>Loading...</p>; // Loading Spinner
//     if (error) return <p>Error : {error.message}</p>

//     return (
//         <div className='text-white'>
//             {
//                 // JSON.stringify(data?.collectionCreated)
//                 JSON.stringify(collectionStat)
//             }
//         </div>
//     );
// };

// export default page;




// <button
//                         onClick={withdrawETHFromContract}
//                         className="w-full bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors flex justify-center"
//                     >
//                         {/* contract balance */}
//                         Withdraw my USDC balance from contract: {formatUnits(contractETHBalance, 6)} USDC
//                     </button> 


//                     <div className="min-h-screen bg-gray-900">
//             <ErrorPopup
//                     isOpen={isErrorOpen}
//                     onClose={closeErrorPopup}
//                     message={errorMessage}
//                  />
//             <ToastPopup
//                       isVisible={isToastOpen}
//                       message={loadingMessage}
                     
//                  />


//             <div className="container mx-auto px-4 py-8 space-y-8">
//                 <CollectionStats
//                     contractAddress={collection?.collection?.id}
//                     ownerAddress={collection?.collection?.ownerAddress}
//                     createdAt={collection?.collection?.createdAt}
//                     price={collection?.collection?.price}
//                     mintedAmount={collection?.collection?.mintedAmount}
//                     totalSupply={collection?.collection?.totalSupply}
//                 />
//                 <CollectionDescription description={collection?.collection?.description} />
//                 {
//                     collection?.collection?.ownerAddress === address && (
//                         <button
//                         onClick={withdrawETHFromContract}
//                         className="w-full bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors flex justify-center"
//                     >
//                         {/* contract balance */}
//                         Withdraw my USDC balance from contract: {formatUnits(contractETHBalance, 6)} USDC
//                     </button>
//                     ) 
//                 }
//                 <MintButton
//                     collection={collection?.collection}
//                     isOpen={isOpen}
//                     onClose={closePopup}
//                     disabled={
//                         collection?.collection?.mintedAmount === collection?.collection?.totalSupply
//                     }
//                     openPopup={openPopup}
//                 />
//             </div>
//         </div>
        