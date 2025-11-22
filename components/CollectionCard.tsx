

import React from 'react';
import { formatRelativeTime } from '@/utils';
import Link from 'next/link';
import { useImageLoader } from '@/hooks/useImageLoader';
import { formatUnits } from 'ethers';
import { ArrowUpRight } from 'lucide-react';

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


interface CollectionCardProps {
    collection: Collection | NFTCreated;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    collection,
}) => {
    const imageURI = "imageURI" in collection ? collection.imageURI : "";
    const { imageSrc } = useImageLoader(imageURI);

    const price = "price" in collection ? collection.price : "0";
    const formattedPrice = formatUnits(String(price), 6);

    const timeCreated = "timeCreated" in collection ? collection.timeCreated : "0";
    const maxSupply = "maxSupply" in collection ? collection.maxSupply : "0";

    const tokenId = "tokenId" in collection ? collection.tokenId : "";


    return (
        <Link href={`/collection/${collection.id}`}>
            <div className="group bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer border border-gray-700/50 hover:border-gray-600">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-950">
                    <img
                        src={imageSrc}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {collection.symbol}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {tokenId ? `#${tokenId}` : collection.name} 
                    </h3>


                    {/* Stats Grid & Footer */}

                    {
                        !tokenId && (
                            <div>

                      
                    
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-700/50">
                        <div className="flex items-center gap-2">
                            
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Supply</p>
                                <p className="text-sm font-semibold text-white">{Number(maxSupply).toLocaleString()}</p>
                            </div>
                            
                        </div>
                        
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                            <p className="text-sm font-semibold text-blue-400">{formattedPrice} USDC</p>
                        
                        </div>
                          
                        
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-500">Created</p>
                            
                            <p className="text-xs font-medium text-gray-300">
                                {formatRelativeTime(timeCreated)}
                            </p>
                        
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 group-hover:text-blue-400 transition-colors">
                            <span className="text-xs">View</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>

                    </div>
                      )
                    }

                    
                </div>
            </div>
        </Link>
    );
};



// interface Collection {
//     id: string;
//     collectionAddress: string;
//     name: string;
//     symbol: string;
//     description: string;
//     owner: string;
//     timeCreated: string;
//     price: string;
//     maxSupply: string;
//     imageURI: string;
//     blockNumber: string;
//     blockTimestamp: string;
//     transactionHash: string;
// }

// interface NFTCreated {
//     id: string;
//     collectionAddress: string;
//     owner: string;
//     name: string;
//     symbol: string;
//     description: string;
//     tokenId: string;
//     createdAt: string;
//     blockNumber: string;
//     blockTimestamp: string;
//     transactionHash: string;
// }

