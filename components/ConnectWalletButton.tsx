"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';


const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

            const btnStyle = {
          background: "white",
          color: "black",
          padding: "5px 10px",
          border: "1px solid #ddd",
          borderRadius: "9999px",
          cursor: "pointer",

        };

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',

              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" style={btnStyle}>
                    Connect Wallet 
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" style={{
                    background: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "1px solid #ddd",
                    borderRadius: "9999px",
                    cursor: "pointer",
                  }}>
                    Wrong network
                  </button>
                );
              }
           
return (
  <>
    {/* Mobile View — only address */}
    <button
      onClick={openAccountModal}
      type="button"
      style={btnStyle}
      className="block md:hidden"
    >
      {account.displayName}
    </button>

    {/* Desktop View */}
    <div className="hidden md:flex gap-3">
      <button
        onClick={openChainModal}
        type="button"
        style={btnStyle}
      >
        {chain.hasIcon && (
          <div
            style={{
              background: chain.iconBackground,
              width: 12,
              height: 12,
              borderRadius: 999,
              overflow: 'hidden',
              marginRight: 4,
            }}
          >
            {chain.iconUrl && (
              <img
                alt={chain.name ?? 'Chain icon'}
                src={chain.iconUrl}
                style={{ width: 12, height: 12 }}
              />
            )}
          </div>
        )}
        {chain.name}
      </button>

      <button onClick={openAccountModal} type="button" style={btnStyle}>
        {account.displayName}
        {account.displayBalance ? ` (${account.displayBalance})` : ''}
      </button>
    </div>
  </>
);


            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;




 //   return (
            //     <div style={{ display: 'flex', gap: 12 }}>
            //       <button
            //         onClick={openChainModal}
            //         style={btnStyle}
            //         type="button"

            //       >
            //         {chain.hasIcon && (
            //           <div
            //             style={{
            //               background: chain.iconBackground,
            //               width: 12,
            //               height: 12,
            //               borderRadius: 999,
            //               overflow: 'hidden',
            //               marginRight: 4,
            //             }}
            //           >
            //             {chain.iconUrl && (
            //               <img
            //                 alt={chain.name ?? 'Chain icon'}
            //                 src={chain.iconUrl}
            //                 style={{ width: 12, height: 12 }}
            //               />
            //             )}
            //           </div>
            //         )}
            //         {chain.name}
            //       </button>
            //       <button onClick={openAccountModal} type="button" style={btnStyle}>
            //         {account.displayName}
            //         {account.displayBalance
            //           ? ` (${account.displayBalance})`
            //           : ''}
            //       </button>
            //     </div>
            //   );