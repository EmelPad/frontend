

'use client';
import React, { useEffect, useState } from 'react';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useImageLoader } from '@/hooks/useImageLoader';
import { useAccount } from 'wagmi';
import { ethers, formatUnits, getAddress } from 'ethers';

import { useErrorPopup } from '@/hooks/useErrorPopup';
import { ErrorPopup } from '@/components/popups/ErrorPopup';
import { useToastify } from '@/hooks/useToastify';
import { ToastPopup } from '@/components/popups/ToastPopup';

import NFTManager from "@/abi/NFTManager.json";
import { ShoppingCart, TrendingUp, Users, Clock, ExternalLink, User } from 'lucide-react';
import { formatRelativeTime, truncateAddress } from '@/utils';
import USDCAbi from "@/abi/USDC.json";
interface PageProps {
    params: {
        id: string;
    }
}

interface Collection {
  id: string;
  collectionAddress: string;
  name: string;
  symbol: string;
  description: string;
  owner: string;
  timeCreated: string;
  price: string;
  maxSupply: string;
  imageURI: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

interface GetCollectionResponse {
  collectionCreated: Collection;
}

interface CollectionStats {
    id: string;
    totalMinted: string;
    totalVolume: string;
    firstMintTime: string;
    latestMintTime: string;
    uniqueMinters: string;
}

interface GetCollectionStatsResponse {
  collectionStats: CollectionStats | null;
}

const GET_COLLECTION = gql`
  query GetCollection ($id: ID!) {
    collectionCreated (id: $id) {
        id
        collectionAddress
        name
        symbol
        description
        owner
        timeCreated
        price
        maxSupply
        imageURI
        blockNumber
        blockTimestamp
        transactionHash
    }
  }
`;

const GET_COLLECTION_STATS = gql`
  query GetcollectionStats ($id: ID!) {
    collectionStats (id: $id) {
        id
        totalMinted
        totalVolume
        firstMintTime
        latestMintTime
        uniqueMinters
    }
  }
`;

const page: React.FC<PageProps> = ({ params }) => {
    const { id } = params;

    const [loadingMessage, setLoadingMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [contractETHBalance, setContractETHBalance] = useState("0");
    const [isMinting, setIsMinting] = useState(false);

    const { isOpen: isToastOpen, openPopup: openToastPopup, closePopup: closeToastPopup } = useToastify();
    const { isOpen: isErrorOpen, openPopup: openErrorPopup, closePopup: closeErrorPopup } = useErrorPopup();

    const { loading, data, error } = useQuery<GetCollectionResponse>(GET_COLLECTION, {
        variables: { id }
    });

    const { loading: collectionStatLoading, data: collectionStat, error: collectionStatError } = useQuery<GetCollectionStatsResponse>(GET_COLLECTION_STATS, {
        variables: { id }
    });

    const { imageSrc, isLoading } = useImageLoader(data?.collectionCreated?.imageURI || "");
    const { address } = useAccount();

    const stats = collectionStat?.collectionStats || {
        id: id,
        totalMinted: "0",
        totalVolume: "0",
        firstMintTime: "0",
        latestMintTime: "0",
        uniqueMinters: "0"
    };

    const withdrawETHFromContract = async () => {
        try {
            openToastPopup();
            setLoadingMessage("Withdrawing USDC from contract...");
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            const erc20contract = new ethers.Contract(
                USDCAbi.address,
                USDCAbi.abi,
                provider
            );
            const balance = await erc20contract.balanceOf(id);
            console.log({balance})
            // const contract = new ethers.Contract(
            //     id,
            //     NFTManager.abi,
            //     signer
            // );

            // const tx = await contract.withdraw();
            // await tx.wait();
            
            closeToastPopup();
            setLoadingMessage("");
            setContractETHBalance("0");
        } catch (err) {
            closeToastPopup();
            setErrorMessage(String(err));
            openErrorPopup();
        }
    };

    const handleMint = async () => {
        try {
            setIsMinting(true);
            openToastPopup();
            setLoadingMessage("Minting NFT...");
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                id,
                NFTManager.abi,
                signer
            );

            const tx = await contract.mint({ value: data?.collectionCreated?.price });
            await tx.wait();
            
            closeToastPopup();
            setLoadingMessage("");
            setIsMinting(false);
        } catch (err) {
            closeToastPopup();
            setErrorMessage(String(err));
            openErrorPopup();
            setIsMinting(false);
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {

            const provider = new ethers.BrowserProvider(window.ethereum);
            const erc20contract = new ethers.Contract(
                USDCAbi.address,
                USDCAbi.abi,
                provider
            );
            const ETHBalance = await erc20contract.balanceOf(id);

            setContractETHBalance(String(ETHBalance));
            } catch (err) {
                console.log(err);
            }
        };
        fetchBalance();
    }, [id, address]);

    if (loading || isLoading) return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center font-roboto">
            <p className="text-gray-300 text-lg">Loading collection...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center font-roboto">
            <p className="text-red-400 text-lg">Error: {error.message}</p>
        </div>
    );

    const collection = data?.collectionCreated;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-14 px-4 sm:px-6 lg:px-8 font-roboto">
            <div className="max-w-6xl mx-auto">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left: Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full aspect-square max-w-md shrink-0">
                            <img
                                src={imageSrc}
                                alt={collection?.name}
                                className="w-full h-full object-cover rounded-2xl border border-gray-700 shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Collection Header */}
                        <div>
                            <h1 className="md:text-2xl sm:text-xl font-bold mb-2">{collection?.name}<span className='pl-2'>{`(${collection?.symbol})`}</span></h1>
                            {collection?.description && (
                                <p className="text-gray-300 text-base leading-relaxed text-sm">{collection.description}</p>
                            )}
                        </div>

                        {/* Creator & Timeline */}
                        <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                {/* <User className="w-5 h-5 text-blue-400 shrink-0" /> */}
                                <div className="min-w-0">
                                    <p className="text-gray-400 text-sm">Creator</p>
                                    <p className="text-base font-mono">{truncateAddress(collection?.owner || "")}</p>
                                </div>
                            </div>
                            
                            <a
                                href={`https://testnet.arcscan.app/address/${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors py-2"
                            >
                                View on Explorer
                                <ExternalLink className="w-4 h-4 shrink-0" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 border border-gray-700 rounded-lg p-4">
                                {/* <Clock className="w-5 h-5 text-blue-400 shrink-0" /> */}
                                <div>
                                    <p className="text-gray-400 text-sm">Created</p>
                                    <p className="text-base">{formatRelativeTime(collection?.timeCreated || "")}</p>
                                </div>
                            </div>

                        {/* Key Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Price</p>
                                <p className="font-bold text-blue-400">{formatUnits(collection?.price || "0", 6)} USDC</p>
                            </div>
                            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Max Supply</p>
                                <p className="font-bold">{Number(collection?.maxSupply).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Collection Stats */}
                        <div className="bg-linear-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-xl p-6 space-y-4">
                            <h3 className="text-lg font-bold mb-4">Collection Stats</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    {/* <ShoppingCart className="w-5 h-5 text-blue-400 mt-1 shrink-0" /> */}
                                    <div className="min-w-0">
                                        <p className="text-gray-400 text-sm">Total Minted</p>
                                        <p className="font-bold">{Number(stats.totalMinted).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    {/* <Users className="w-5 h-5 text-blue-400 mt-1 shrink-0" /> */}
                                    <div className="min-w-0">
                                        <p className="text-gray-400 text-sm">Unique Minters</p>
                                        <p className="font-bold">{Number(stats.uniqueMinters).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    {/* <TrendingUp className="w-5 h-5 text-blue-400 mt-1 shrink-0" /> */}
                                    <div className="min-w-0">
                                        <p className="text-gray-400 text-sm">Total Volume</p>
                                        <p className="font-bold">{formatUnits(stats.totalVolume || "0", 6)} USDC</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    {/* <Clock className="w-5 h-5 text-blue-400 mt-1 shrink-0" /> */}
                                    <div className="min-w-0">
                                        <p className="text-gray-400 text-sm">Latest Mint</p>
                                        <p className="font-bold">
                                            {/* {new Date(Number(stats.latestMintTime) * 1000).toLocaleDateString()} */}
                                            {Number(stats.latestMintTime) == 0 ? "No mint yet" : formatRelativeTime(Number(stats.latestMintTime)) }
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <button
                                onClick={handleMint}
                                disabled={isMinting || !address}
                                className="w-full bg-linear-to-br from-white to-gray-300 hover:from-gray-100 hover:to-gray-400 text-black font-bold py-4 px-8 rounded-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 shrink-0"
                            >
                                {/* <ShoppingCart className="w-5 h-5 shrink-0" /> */}
                                {isMinting ? "Minting..." : "Mint NFT"}
                            </button>



                            {address && collection?.owner && getAddress(String(address)) === getAddress(collection?.owner) && (
                                <button
                                    onClick={withdrawETHFromContract}
                                    className="w-full bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors flex justify-center shrink-0"
                                >
                                    Withdraw my USDC balance from contract: {formatUnits(contractETHBalance, 6)} USDC
                                </button>
                            )}

                            



                        </div>
                    </div>
                </div>
            </div>

            <ErrorPopup isOpen={isErrorOpen} onClose={closeErrorPopup} message={errorMessage} />
            <ToastPopup 
                isVisible={isToastOpen}
                message={loadingMessage}    
            />
        </div>
    );
};

export default page;


