import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { arcTestnet } from 'wagmi/chains';



export const wagmiConfig = getDefaultConfig({
    appName: 'emelpad',
    // YOUR_PROJECT_ID cdddc2c45ee7a243f73916dfe293c0ca
    projectId: 'YOUR_PROJECT_ID',
    chains: [arcTestnet],
    transports: {
        [arcTestnet.id]: http(),
    },
});
