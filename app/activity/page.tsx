/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import React, { useState } from 'react'
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Transactions from "@/components/Transactions";

const GET_TRANSACTIONS = gql`
  query GetTransactions ($orderBy: String!, $orderDirection: String!) {
    transactions (orderBy: $orderBy, orderDirection: $orderDirection) {
        id
        type
        user
        collection
        tokenId
        timestamp
        txHash
    }
  }
`;

interface Transaction {
    id: string;
    type: string;
    user: string;
    collection: string;
    tokenId: string;
    timestamp: string;
    txHash: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

const Page = () => {
    const [sortBy, setSortBy] = useState("timestamp");
    const [orderDirection, setOrderDirection] = useState('desc');

    const { loading, data, error } = useQuery<GetTransactionsResponse>(GET_TRANSACTIONS, {
        variables: { orderBy: sortBy, orderDirection }
    });




    if (loading) return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center font-roboto">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-lg">Loading transactions...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center font-roboto">
            <div className="text-center">
                <p className="text-red-400 text-lg font-semibold mb-2">Error loading transactions</p>
                <p className="text-slate-400">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-4 sm:px-6 lg:px-8 font-roboto">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-blue-500 rounded-full" />
                        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                            Transactions
                        </h1>
                    </div>
                    <p className="text-slate-400 ml-4">Latest activity on the network</p>
                </div>

                <div className="mb-6 flex gap-2 flex-wrap">
                    <button
                        onClick={() => {
                            setSortBy("timestamp")
                            setOrderDirection(prev => prev === "asc" ? "desc" : "asc");
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            sortBy === "timestamp"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50"
                        }`}
                    >
                        Latest First
                    </button>
                    <button
                        onClick={() => {
                            setSortBy("type")
                            setOrderDirection(prev => prev === "asc" ? "desc" : "asc")

                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            sortBy === "type"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50"
                        }`}
                    >
                        By Type
                    </button>
                </div>

                
                <Transactions transactions={data?.transactions || []} />
                {data?.transactions.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-slate-400 text-lg">No transactions found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
