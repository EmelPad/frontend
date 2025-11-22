import { useImageLoader } from '@/hooks/useImageLoader';
import { formatRelativeTime } from '@/utils';
import { X, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface MintEventObj {
  contractAddress: string;
  owner: string;
  name: string;
  symbol: string;
  description: string;
  tokenId: number;
  createdAt: number;
}

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventObj: MintEventObj;
  imageURI: string;

}

function MintSuccessModal({ isOpen, onClose, eventObj, imageURI }: MintSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { imageSrc, isLoading } = useImageLoader(imageURI);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 font-roboto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 sm:px-8 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">NFT Minted Successfully!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 sm:px-8 space-y-6">
          {/* Collection Image */}
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt={eventObj.name}
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl border border-gray-200 shadow-lg"
            />
          </div>

          {/* Collection Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Name</p>
              <p className="text-2xl font-bold text-gray-900">{eventObj.name} #{eventObj.tokenId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Symbol</p>
                <p className="text-lg font-semibold text-gray-900">{eventObj.symbol}</p>
              </div>

            </div>


            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Contract Address</p>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <code className="text-sm font-mono text-gray-900 flex-1">
                  {shortenAddress(eventObj.contractAddress)}
                </code>
                <button
                  onClick={() => copyToClipboard(eventObj.contractAddress)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy full address"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintSuccessModal;
