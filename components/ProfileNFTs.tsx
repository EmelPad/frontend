import React from 'react'
import ProfileNFTItem from "@/components/ProfileNFTItem";

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

interface ProfileNFTsProps {
    title: string;
    collections: NFTCreated[];

}

const ProfileNFTs = ({title, collections}: ProfileNFTsProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
            <ProfileNFTItem key={collection.id} collection={collection || []} />
        ))}
    </div>
  )
}

export default ProfileNFTs;