import React from 'react';
import { CollectionCard } from './CollectionCard';


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

interface CollectionsProps {
    title: string;
    collections: Collection[];
}

export const CollectionsGrid: React.FC<CollectionsProps> = ({
    title,
    collections,
}) => {
    return (
        <div className="container mx-auto px-4 py-8 font-roboto">
            <h1 className="text-2xl font-bold mb-8 text-white">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
        </div>
    );
};
{/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"></div> */}