'use client';

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/config/wagmi';
import { ApolloProvider } from '@apollo/client/react';
import { client } from "@/lib/apollo-client";



const queryClient = new QueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={client}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
            </ApolloProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
}
