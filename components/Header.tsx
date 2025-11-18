import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  return (
    <nav className="bg-black">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 ">
                 <ConnectWalletButton />
            </div>         
        </div>
        
    </nav>
  )
}

export default Header;