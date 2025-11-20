import Link from 'next/link';
import React from 'react';
import emelverseLogo from "../public/emelverse.jpeg";
import Image from 'next/image';
export const Logo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-lg flex items-center justify-center">
                <Image src={emelverseLogo} width={50} height={50} alt='emelverse logo' className='w-14 h-10' />
            </div>
            <span className="text-white text-xl font-bold">EmelPad</span>
        </Link>
    );
};
