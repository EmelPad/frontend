'use client';

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useAccount } from "wagmi";

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
}

interface GetCollectionsResponse {
  collectionCreateds: Collection[];
}

interface GetNftsCreatedResponse {
    nftcreateds: NFTCreated[];
}

const GET_TRANSACTIONS = gql`
  query GetTransactions ($owner: String!, $orderBy: String!, $orderDirection: String!) {
    transactions (owner: $owner, orderBy: $orderBy, orderDirection: $orderDirection) {
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
    collectionCreateds (owner: $owner, orderBy: $orderBy, orderDirection: $orderDirection) {
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
    nftcreateds (owner: $owner, orderBy: $orderBy, orderDirection: $orderDirection) {
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
    }
  }
`;


const page = () => {
    const { address } = useAccount();
    const { loading, data, error, refetch } = useQuery<GetCollectionsResponse>(GET_COLLECTIONS, { 
        variables: { owner: address, orderBy: "timeCreated", orderDirection: "desc" }
    }); 
    const { loading: nftsLoading, data: nfts, error: nftsError, refetch: nftsRefetch } = useQuery<GetNftsCreatedResponse>(GET_NFTSCREATED, { 
        variables: { owner: address, orderBy: "createdAt", orderDirection: "desc" }
    }); 

    const { loading: transactionsLoading, data: transactionsData, error: transactionsError } = useQuery<GetTransactionsResponse>(GET_TRANSACTIONS, {
            variables: { owner: address, orderBy: "timestamp", orderDirection: "desc" }
        });
    
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-4 sm:px-6 lg:px-8 font-roboto">
        <div className="max-w-6xl mx-auto">
            {/* {JSON.stringify(data?.collectionCreateds)} */}
            {/* {JSON.stringify(nfts?.nftcreateds)} */}
            {/* {JSON.stringify(transactionsData?.transactions)} */}
            
        </div>
    </div>
  )
}

export default page;

// what to do
// please make sure the user is connected before showing profile page, else show a div in the center "Please Connect wallet to see your profile"

// Create 3 tabs, my collections (when a user clicks it they see all their collections), my nfts (when a user clicks it they see all their nfts) and my transactions (when a user clicks it they see all their transactions)

// for collections, reuse this component as it is <CollectionsGrid title="My NFT Collections" collections={data?.collectionCreateds ?? []} />
// for nfts, reuse this component as it is <CollectionsGrid title="My NFTs" collections={nfts?.nftcreateds ?? []} />
// for transactions, reuse this component as it is <Transactions transactions={transactionsData?.transactions || []} />