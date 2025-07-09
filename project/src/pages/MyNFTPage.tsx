import React, { useState } from 'react';
import { Shield, Wallet, Search, Calendar, Award } from 'lucide-react';
import { NFT } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const MyNFTPage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress.trim()) return;
    
    setLoading(true);
    try {
      // Simulate API call to GET /api/my-nft/:wallet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockNFTs: NFT[] = [
        {
          tier: 'Gold Supporter',
          amountDonated: 15000,
          projectName: 'Community Garden Initiative',
          date: '2024-01-15',
          tokenId: 'NFT001'
        },
        {
          tier: 'Silver Supporter',
          amountDonated: 5000,
          projectName: 'School Library Renovation',
          date: '2024-02-01',
          tokenId: 'NFT002'
        },
        {
          tier: 'Bronze Supporter',
          amountDonated: 2000,
          projectName: 'Clean Water Project',
          date: '2024-02-15',
          tokenId: 'NFT003'
        }
      ];
      
      setNfts(mockNFTs);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setNfts([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold Supporter': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'Silver Supporter': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 'Bronze Supporter': return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Gold Supporter': return '🥇';
      case 'Silver Supporter': return '🥈';
      case 'Bronze Supporter': return '🥉';
      default: return '🏆';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My NFT Collection</h1>
        <p className="text-gray-600">View your supporter NFT certificates and donation history</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-2">
              <Wallet className="h-4 w-4 inline mr-1" />
              Your Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="0x..."
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors flex items-center space-x-2 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* NFT Collection */}
      {searched && !loading && (
        <div className="space-y-6">
          {nfts.length > 0 ? (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your NFT Collection</h2>
                <p className="text-gray-600">You have {nfts.length} supporter NFT{nfts.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    {/* NFT Header */}
                    <div className={`${getTierColor(nft.tier)} p-6 text-white text-center`}>
                      <div className="text-4xl mb-2">{getTierIcon(nft.tier)}</div>
                      <h3 className="text-xl font-bold">{nft.tier}</h3>
                      <p className="text-sm opacity-90">Token ID: {nft.tokenId}</p>
                    </div>

                    {/* NFT Details */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Amount Donated</p>
                          <p className="text-lg font-bold text-gray-900">₹{nft.amountDonated.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Project</p>
                          <p className="text-gray-900">{nft.projectName}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-gray-900">{nft.date}</p>
                        </div>
                      </div>
                    </div>

                    {/* NFT Footer */}
                    <div className="bg-gray-50 px-6 py-4 text-center">
                      <p className="text-xs text-gray-500">
                        This NFT serves as proof of your contribution to community development
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Impact Summary</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{nfts.reduce((sum, nft) => sum + nft.amountDonated, 0).toLocaleString()}
                    </div>
                    <div className="text-gray-600">Total Donated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{nfts.length}</div>
                    <div className="text-gray-600">Projects Supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{nfts.length}</div>
                    <div className="text-gray-600">NFTs Earned</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No NFTs Found</h2>
              <p className="text-gray-600 mb-6">You haven't made any donations yet or the wallet address is incorrect.</p>
              <button
                onClick={() => window.location.href = '#donate'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Make Your First Donation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyNFTPage;