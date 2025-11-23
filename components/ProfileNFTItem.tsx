import { useImageLoader } from '@/hooks/useImageLoader';
import { useEffect } from 'react';


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

interface ProfileNFTItemsProps {
    collection: NFTCreated;

}

const ProfileNFTItem = ({collection}: ProfileNFTItemsProps) => {
    const { imageSrc } = useImageLoader(collection.imageURI);

    useEffect(() => {
        console.log({imageSrc, imageURI: collection.imageURI});
    }, [])

  return (
    
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
                                {`${collection.name} #${collection.tokenId}`}
                            </h3>
                       
                                    <div>
        
        
                            </div>
                            
                        </div>
                    </div>
    
  )
}

export default ProfileNFTItem;