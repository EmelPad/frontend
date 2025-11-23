'use client';

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState, useEffect } from 'react';
import CollectionSort from './CollectionSort';
import { CollectionsGrid } from './CollectionsGrid';


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

interface GetCollectionsResponse {
  collectionCreateds: Collection[];
}

const GET_COLLECTIONS = gql`
  query GetCollections ($orderBy: String!, $orderDirection: String!) {
    collectionCreateds (orderBy: $orderBy, orderDirection: $orderDirection) {
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

const Collections = () => {

    const [activeSort, setActiveSort] = useState('timeCreated');
    const [orderDirection, setOrderDirection] = useState('desc');
    const { loading, data, error, refetch } = useQuery<GetCollectionsResponse>(GET_COLLECTIONS, { 
        variables: { orderBy: activeSort, orderDirection }
    });

    const handleSort = (sortType: string) => {
        if (sortType === activeSort) {
            // Toggle order direction if the same sort type is clicked
            setOrderDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // Update sorting criterion
            setActiveSort(sortType);
            setOrderDirection('asc'); // Reset to ascending order if sortType changes
        }

    };

    useEffect(() => {
        // Whenever activeSort or orderDirection changes, refetch with new variables
        refetch({
            orderBy: activeSort,
            orderDirection
        });

        // Logging after state has changed
        console.log("Updated activeSort:", activeSort);
        console.log("Updated orderDirection:", orderDirection);
    }, [activeSort, orderDirection, refetch]); // Dependency on both activeSort and orderDirection

    if (loading) return <p>Loading...</p>; // Loading Spinner
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-roboto">
            <div className="mb-8">
                <CollectionSort onSort={handleSort} activeSort={activeSort} />
            </div>

            {/* Your collections grid/list will go here */}
            {
                !loading && !error && (
                    <CollectionsGrid
                        title="NFT Collections"
                        collections={data?.collectionCreateds ?? []}
                    />
                )
            }
        </div>
    );
};

export default Collections;