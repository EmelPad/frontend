import { formatTimestamp } from '@/utils';
import { ArrowDownLeft, ArrowUpRight, Zap, ExternalLink } from 'lucide-react';
import { truncateAddress } from '../utils';

interface Transaction {
    id: string;
    type: string;
    user: string;
    collection: string;
    tokenId: string;
    timestamp: string;
    txHash: string;
}

interface TransactionsProps {
    transactions: Transaction[]
}
const Transactions = ({transactions}: TransactionsProps) => {

        const getTransactionIcon = (type: string) => {
            if (type.toLowerCase().includes('mint')) return <ArrowDownLeft className="w-5 h-5 text-blue-400" />;
            if (type.toLowerCase().includes('burn')) return <ArrowUpRight className="w-5 h-5 text-red-400" />;
            if (type.toLowerCase().includes('transfer')) return <ArrowUpRight className="w-5 h-5 text-purple-400" />;
            return <Zap className="w-5 h-5 text-yellow-400" />;
        };
    
        const getTransactionBadgeColor = (type: string) => {
            if (type.toLowerCase().includes('mint')) return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
            if (type.toLowerCase().includes('burn')) return 'bg-red-500/10 border-red-500/30 text-red-400';
            if (type.toLowerCase().includes('transfer')) return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
            return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
        };

  return (
    <div className="bg-linear-to-br from-slate-800/20 to-slate-900/20 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-slate-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase">CA</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase">Token ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase">Timestamp</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-800/50 rounded-lg">
                                                    {getTransactionIcon(tx.type)}
                                                </div>
                                                <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getTransactionBadgeColor(tx.type)}`}>
                                                    {tx.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm font-mono text-slate-300 bg-slate-900/30 px-3 py-1.5 rounded">
                                                {truncateAddress(tx.user)}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm font-mono text-slate-300 bg-slate-900/30 px-3 py-1.5 rounded">
                                                {truncateAddress(tx.collection)}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-300 font-semibold">
                                                {tx.type === "COLLECTION_CREATED" ? "" : `#${tx.tokenId}`}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-400 text-sm">{formatTimestamp(tx.timestamp)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a
                                                href={`https://testnet.arcscan.app/tx/${tx.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                                                title="View on Explorer"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden space-y-4 p-4">
                        {transactions.map((tx: Transaction) => (
                            <div key={tx.id} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 space-y-3 hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-700/50 rounded-lg">
                                            {getTransactionIcon(tx.type)}
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTransactionBadgeColor(tx.type)}`}>
                                            {tx.type}
                                        </span>
                                    </div>
                                    <a
                                        href={`https://testnet.arcscan.app/tx/${tx.txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div>
                                        <p className="text-slate-400 text-xs mb-1">User</p>
                                        <code className="text-slate-300 bg-slate-900/30 px-2 py-1 rounded text-xs block truncate">
                                            {truncateAddress(tx.user)}
                                        </code>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs mb-1">Collection</p>
                                        <code className="text-slate-300 bg-slate-900/30 px-2 py-1 rounded text-xs block truncate">
                                            {truncateAddress(tx.collection)}
                                        </code>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Token ID</p>
                                            <p className="text-slate-300 font-semibold">#{tx.tokenId}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs mb-1">Time</p>
                                            <p className="text-slate-300 text-xs">{formatTimestamp(tx.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
  )
}

export default Transactions;