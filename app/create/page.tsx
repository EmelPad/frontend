
'use client';

import { FormInput } from "@/components/FormInput";
import { FormTextArea } from "@/components/FormTextArea";
import { ImagePreview } from "@/components/ImagePreview";
import { ethers, parseUnits } from "ethers";
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from "react";
import NFTManager from "@/abi/NFTManager.json";
import { getImageURI } from '@/utils';
import CreateSuccessModal from "@/components/CreateSuccessModal";

import { useErrorPopup } from '@/hooks/useErrorPopup';
import { ErrorPopup } from '@/components/popups/ErrorPopup';
import { useToastify } from '@/hooks/useToastify';
import { ToastPopup } from '@/components/popups/ToastPopup';


interface CollectionEventObj {
  contractAddress: string;
  name: string;
  symbol: string;
  description: string;
  creator: string;
  createdAt: number;
  price: bigint;
  maxSupply: number;
  imageURI: string;
}


const page: React.FC = () => {


    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        description: '',
        price: '',
        totalSupply: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { isOpen: isErrorOpen, openPopup: openErrorPopup, closePopup: closeErrorPopup } = useErrorPopup();
    const { isOpen: isToastOpen, openPopup: openToastPopup, closePopup: closeToastPopup } = useToastify();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [eventObj, setEventObj] = useState<CollectionEventObj>({
        contractAddress: "",
        name: "",
        symbol: "",
        description: "",
        creator: "",
        createdAt: 0,
        price: BigInt(0),
        maxSupply: 0,
        imageURI: ""

    });




    const handleCreateCollection = async(name: string, symbol: string, description: string, price: string, totalSupply: string, imageFile: File) => {
        console.log("HandleCreateCollection...");
        
        const priceInWei = parseUnits(price, 6);
        console.log({name, symbol, description, priceInWei, totalSupply});

        setIsLoading(true);

        // Pinning Image to IPFS
        setLoadingMessage("Pinning Image to IPFS")
        openToastPopup()

        const imageURI = await getImageURI(imageFile);
        console.log(imageURI);

        // Deploying Collection...
        setLoadingMessage("Deploying Collection...")

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(NFTManager.address, NFTManager.abi, signer);
        // make txn
        const tx = await contract.createCollection(name, symbol, description, priceInWei, totalSupply, imageURI);
        const response = await tx.wait();
        console.log(response);
        console.log({logs: response.logs});////
        // read event log
        const filter = contract.filters.CollectionCreated();
        const events = await contract.queryFilter(filter, response.blockNumber);
        console.log(events);

        const eventObj = {

            contractAddress: events[0].args[0],
            name: events[0].args[1],
            symbol: events[0].args[2],
            description: events[0].args[3],
            creator: events[0].args[4],
            createdAt: Number(String(events[0].args[5])),
            price: BigInt(String(events[0].args[6])),
            maxSupply: Number(String(events[0].args[7])),
            imageURI: events[0].args[8],

        };
        return eventObj;
        
    }

    const createCollectionFunc = async(e: FormEvent) => {
        e.preventDefault();


        if (
            !(
                formData.name &&
                formData.symbol &&
                formData.description &&
                formData.price &&
                formData.totalSupply &&
                imageFile
            )
        )
        return;

        try {

            const eventObj = await handleCreateCollection(formData.name, formData.symbol, formData.description, formData.price, formData.totalSupply, imageFile );
            console.log({eventObj});
            setEventObj(eventObj);
            setIsModalOpen(true);
  
            // use eventObj to display what we need in the popup and have a x button to cancel.
            closeToastPopup();

        } catch(err: any) {
            closeToastPopup();
            console.log({errorMessage: err})
            setErrorMessage(String(err));
            openErrorPopup();
        } finally {
            // after form submission
            setIsLoading(false);
            setFormData({
                name: '',
                symbol: '',
                description: '',
                price: '',
                totalSupply: '',
            })
            setImageFile(null)
            
        }
  

        
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12 font-roboto">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-2xl font-bold text-white mb-8">
                    Create New Collection
                </h1> 

                <ErrorPopup
                    isOpen={isErrorOpen}
                    onClose={closeErrorPopup}
                    message={errorMessage}
                 />
                 <ToastPopup 
                      isVisible={isToastOpen}
                      message={loadingMessage}
                     
                 />

                <form
                    onSubmit={createCollectionFunc}
                    className="bg-black p-6 rounded-lg"
                >
                    <FormInput
                        label="Collection Name"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />

                    <FormInput
                        label="Symbol"
                        type="text"
                        id="symbol"
                        value={formData.symbol}
                        onChange={(e) =>
                            setFormData({ ...formData, symbol: e.target.value })
                        }
                        required
                    />

                    <FormTextArea
                        label="Description"
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        required
                    />

                    <div className="mb-4">
                        <label htmlFor="image-upload" 
                        // className="block text-sm font-medium text-white mb-2"
                        className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition cursor-pointer"
                        >
                            Upload Collection Image
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                        />
                        <ImagePreview file={imageFile} />
                    </div>

                    <FormInput
                        label="Price (USDC)"
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                        }
                        required
                        min={0}
                        step="0.000001"
                    />

                    <FormInput
                        label="Total Supply"
                        type="number"
                        id="totalSupply"
                        value={formData.totalSupply}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                totalSupply: e.target.value,
                            })
                        }
                        required
                        min={1}
                    />

                    <button
                        type="submit"
                        // onClick={createCollectionFunc}
                        className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors mt-6 flex items-center justify-center"
                    >
                        {isLoading && (
                            <LoaderCircle className="w-5 h-5 animate-spin" />
                        )}
                        {!isLoading && "Create Collection"}
                        
                    </button>
                </form>
                
{/*  */}
            </div>
            
            <CreateSuccessModal
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                }} 
                eventObj={eventObj}
             /> 

        </div>
    );
};

export default page;
