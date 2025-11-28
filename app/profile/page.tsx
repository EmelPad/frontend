/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useAccount } from "wagmi";
import { useState } from "react";
import { CollectionsGrid } from "@/components/CollectionsGrid";
import Transactions from "@/components/Transactions";
import ProfileNFTs from "@/components/ProfileNFTs";
import { getAddress } from "ethers";

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

interface NFTCreated {
    id: string;
    collectionAddress: string;
    owner: string;
    name: string;
    symbol: string;
    description: string;
    tokenId: string;
    createdAt: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
    imageURI: string;
}

interface GetCollectionsResponse {
  collectionCreateds: Collection[];
}

interface GetNftsCreatedResponse {
    nftcreateds: NFTCreated[];
}

interface Transaction {
    id: string;
    type: string;
    user: string;
    collection: string;
    tokenId: string;
    timestamp: string;
    txHash: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

const GET_COLLECTIONS = gql`
  query GetCollections ($owner: String!, $orderBy: String!, $orderDirection: String!) {
    collectionCreateds (where: {owner: $owner}, orderBy: $orderBy, orderDirection: $orderDirection) {
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

const GET_NFTSCREATED = gql`
  query GetNFTScreated ($owner: String!, $orderBy: String!, $orderDirection: String!) {
    nftcreateds (where: {owner: $owner}, orderBy: $orderBy, orderDirection: $orderDirection) {
        id
        collectionAddress
        owner
        name
        symbol
        description
        tokenId
        createdAt
        blockNumber
        blockTimestamp
        transactionHash
        imageURI
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions ($user: String!, $orderBy: String!, $orderDirection: String!) {
    transactions (where: {user: $user}, orderBy: $orderBy, orderDirection: $orderDirection) {
        id
        type
        user
        collection
        tokenId
        timestamp
        txHash
    }
  }
`;

const Page = () => {
    const { address, isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState<'collections' | 'nfts' | 'transactions'>('collections');

    const { loading, data, error } = useQuery<GetCollectionsResponse>(GET_COLLECTIONS, { 
        variables: address ? { owner: getAddress(String(address)) || '', orderBy: "timeCreated", orderDirection: "desc" } : undefined,
        skip: !address
    }); 

    const { loading: nftsLoading, data: nfts, error: nftsError } = useQuery<GetNftsCreatedResponse>(GET_NFTSCREATED, { 
        variables: address ? { owner: getAddress(String(address)) || '', orderBy: "createdAt", orderDirection: "desc" } : undefined,
        skip: !address
    }); 

    const { loading: transactionsLoading, data: transactionsData, error: transactionsError } = useQuery<GetTransactionsResponse>(GET_TRANSACTIONS, {
        variables: address ? { user: getAddress(String(address)) || '', orderBy: "timestamp", orderDirection: "desc" } : undefined,
        skip: !address
    });

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center font-roboto">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
                    <p className="text-slate-400 text-lg">Please connect your wallet to view your profile</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-4 sm:px-6 lg:px-8 font-roboto">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-blue-500 rounded-full" />
                        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                    </div>
                    <p className="text-slate-400 ml-4">Manage your collections, NFTs, and transactions</p>
                </div>

                <div className="flex gap-2 mb-8 border-b border-slate-700/50">
                    <button
                        onClick={() => setActiveTab('collections')}
                        className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
                            activeTab === 'collections'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                        }`}
                    >
                        My Collections
                    </button>
                    <button
                        onClick={() => setActiveTab('nfts')}
                        className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
                            activeTab === 'nfts'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                        }`}
                    >
                        My NFTs
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
                            activeTab === 'transactions'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                        }`}
                    >
                        My Transactions
                    </button>
                </div>

                {activeTab === 'collections' && (
                    <div>
                        {loading && (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-16">
                                <p className="text-red-400 text-lg">Error loading collections</p>
                            </div>
                        )}
                        {!loading && !error && (
                            <CollectionsGrid title="My NFT Collections" collections={data?.collectionCreateds ?? []} />
                        )}
                    </div>
                )}

                {activeTab === 'nfts' && (
                    <div>
                        {nftsLoading && (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        )}
                        {nftsError && (
                            <div className="text-center py-16">
                                <p className="text-red-400 text-lg">Error loading NFTs</p>
                            </div>
                        )}
                        {!nftsLoading && !nftsError && (
                            <ProfileNFTs collections={nfts?.nftcreateds ?? []} />
                            
                        )}
                    </div>
                )}

                {activeTab === 'transactions' && (
                    <div>
                        {transactionsLoading && (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        )}
                        {transactionsError && (
                            <div className="text-center py-16">
                                <p className="text-red-400 text-lg">Error loading transactions</p>
                            </div>
                        )}
                        {!transactionsLoading && !transactionsError && (
                            <Transactions transactions={transactionsData?.transactions || []} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
