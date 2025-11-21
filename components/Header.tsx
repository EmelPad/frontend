"use client"
import { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Logo } from './Logo';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50 font-roboto">
        <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">

                <div className='flex items-center space-x-2'>

                    {/* Menu Icon */}
                    <button
                    onClick={() => {setIsMenuOpen(!isMenuOpen);console.log("active")}}
                    className="text-white"
                    >
                    {isMenuOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                    </button>
                    
                    {/* Logo */}
                    <Logo />
                
                </div>

                {/* Connect Button */}
                <ConnectButton />
            </div>

            {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-black/95 backdrop-blur-sm">
          <nav className="max-w-6xl mx-auto px-4 py-6 space-y-2">
            {/* Create Collection */}
            <Link
             href="/create"
             onClick={() => setIsMenuOpen(false)}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-white to-gray-300 hover:from-gray-100 hover:to-gray-400 text-black font-semibold transition-all duration-200">
              <Plus className="w-5 h-5" />
              Create Collection
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="w-full block px-4 py-3 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-gray-200 font-medium transition-all duration-200"
            >
              Profile
            </Link>

            {/* Activity */}
            <Link
              href="/activity"
              onClick={() => setIsMenuOpen(false)}
              className="w-full block px-4 py-3 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-gray-200 font-medium transition-all duration-200"
            >
              Activity
            </Link>

            {/* Premium Mint - Disabled */}
            <div
              className="w-full px-4 py-3 rounded-lg bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 text-gray-500 font-medium cursor-not-allowed opacity-60"
            >
              Premium Mint (Coming Soon)
            </div>

            {/* Marketplace - Disabled */}
            <div
              className="w-full px-4 py-3 rounded-lg bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 text-gray-500 font-medium cursor-not-allowed opacity-60"
            >
              Marketplace (Coming Soon)
            </div>
          </nav>
        </div>
      )}

        </div>         
        
        
        
    </div>




  )
}

export default Header;












