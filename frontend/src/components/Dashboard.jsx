import React, { useState, useEffect } from 'react';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';
import nftSample from '../assets/image.png';

const NFTDashboard = () => {
    const {
        account,
        loading,
        error,
        createNFT,
        listNFT,
        buyNFT,
        fetchListedNFTs,
    } = useNFTMarketplace();

    const [nfts, setNfts] = useState([]);
    const [view, setView] = useState('grid');
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [nftData, setNftData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
    });

    useEffect(() => {
        if (!loading) {
            loadNFTs();
        }
    }, [loading, account]);

    const loadNFTs = async () => {
        try {
            const listedNFTs = await fetchListedNFTs();
            setNfts(listedNFTs);
        } catch (error) {
            console.error('Error loading NFTs:', error);
        }
    };

    const handleBuyNFT = async (tokenId, price) => {
        try {
            await buyNFT(tokenId, price);
            await loadNFTs();
        } catch (error) {
            console.error('Error buying NFT:', error);
        }
    };

    const handlePublish = async () => {
        if (!nftData.name || !nftData.price) {
            console.error('NFT name and price are required.');
            return;
        }

        try {
            const tokenId = await createNFT();
            await listNFT(
                tokenId,
                nftData.name,
                nftData.description,
                nftData.price
            );
            await loadNFTs();
            closeModal();
        } catch (error) {
            console.error('Error creating or listing NFT:', error);
        }
    };

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNftData({
            name: '',
            description: '',
            price: '',
            image: null,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNftData({ ...nftData, [name]: value });
        // console.log(nftData);
    };

    const toggleAccordion = (value) => {
        setActiveAccordion(activeAccordion === value ? null : value);
    };

    const marketStats = [
        { label: 'Total Volume', value: '966.8K' },
        { label: 'Listings', value: '586' },
        { label: 'Royalties', value: '8.5%' },
        { label: 'Total Supply', value: '342' },
    ];

    if (loading) return <div>Loading...</div>;
    if (error)
        return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white font-sans">
            <header className="p-4 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                        <div>
                            <h1 className="text-xl font-bold">
                                LoyalNFT Micro NFTs
                            </h1>
                            <p className="text-xs text-gray-400">
                                Loyal NFT rewards customers with
                                exclusive perks via blockchain,
                                enhancing brand loyalty through
                                digital assets earned from purchases.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                        {marketStats.map(({ label, value }) => (
                            <div key={label}>
                                <div className="text-xl font-bold text-[#3ABFF8]">
                                    {value}
                                </div>
                                <div className="text-gray-400">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="text-[#3ABFF8] hover:text-white hover:bg-[#3ABFF8] px-4 py-2 rounded">
                        NFTs
                    </button>
                    <button className="text-gray-400 hover:text-white hover:bg-[#3ABFF8] px-4 py-2 rounded">
                        Transactions
                    </button>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-[#3ABFF8] text-white px-4 py-2 rounded hover:bg-[#3ABFF8]/80"
                    >
                        Create NFT
                    </button>
                    <button
                        onClick={() => openModal('draft')}
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Draft NFT
                    </button>
                </div>
            </header>

            <main className="p-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        NFT Market Trends
                    </h2>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            Graph Placeholder: NFT Price Trends Over
                            Time
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <input
                            placeholder="Search NFTs..."
                            className="bg-[#1A1A1A] border-none text-sm p-2 rounded"
                        />
                        <select className="bg-[#1A1A1A] border-none text-sm p-2 rounded">
                            <option>Sort by: Price</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded ${
                                view === 'grid' ? 'bg-[#3ABFF8]' : ''
                            }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded ${
                                view === 'list' ? 'bg-[#3ABFF8]' : ''
                            }`}
                        >
                            List
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {/* Sidebar Filters */}
                    <aside className="col-span-1">
                        <div className="w-full">
                            {['status', 'price', 'rarity'].map(
                                (filter) => (
                                    <div
                                        key={filter}
                                        className="border-b border-gray-800"
                                    >
                                        <button
                                            onClick={() =>
                                                toggleAccordion(
                                                    filter
                                                )
                                            }
                                            className="flex justify-between items-center w-full py-2 text-sm text-left capitalize"
                                        >
                                            <span>{filter}</span>
                                            <span
                                                className={`transform transition-transform ${
                                                    activeAccordion ===
                                                    filter
                                                        ? 'rotate-180'
                                                        : ''
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </button>
                                        {activeAccordion ===
                                            filter && (
                                            <div className="py-2">
                                                {filter ===
                                                'price' ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            placeholder="Min"
                                                            type="number"
                                                            className="bg-[#1A1A1A] border-none text-sm p-1 rounded w-full"
                                                        />
                                                        <input
                                                            placeholder="Max"
                                                            type="number"
                                                            className="bg-[#1A1A1A] border-none text-sm p-1 rounded w-full"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-2 text-sm">
                                                        <button className="text-left hover:bg-[#3ABFF8] px-2 py-1 rounded">
                                                            All
                                                        </button>
                                                        <button className="text-left hover:bg-[#3ABFF8] px-2 py-1 rounded">
                                                            Option 1
                                                        </button>
                                                        <button className="text-left hover:bg-[#3ABFF8] px-2 py-1 rounded">
                                                            Option 2
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </aside>

                    {/* NFT Grid */}
                    <div className="col-span-4">
                        <div
                            className={`grid gap-4 ${
                                view === 'grid'
                                    ? 'grid-cols-4'
                                    : 'grid-cols-1'
                            }`}
                        >
                            {nfts.map((nft, index) => (
                                <div
                                    key={index}
                                    className={`bg-[#1A1A1A] rounded-lg overflow-hidden ${
                                        view === 'list' ? 'flex' : ''
                                    }`}
                                >
                                    <img
                                        src={nft.image || nftSample}
                                        alt={`NFT ${nft.tokenId}`}
                                        className={`w-full ${
                                            view === 'list'
                                                ? 'w-24 h-24 object-cover'
                                                : 'h-48 object-cover'
                                        }`}
                                    />
                                    <div className="p-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">
                                                {nft.name}
                                            </span>
                                            <span className="font-bold text-[#3ABFF8]">
                                                {nft.price} ETH
                                            </span>
                                        </div>
                                        <div className="mt-2 flex justify-center">
                                            {(account.toLowerCase() == nft.curr_owner) && <button
                                                onClick={() =>
                                                    handleBuyNFT(
                                                        nft.tokenId,
                                                        nft.price
                                                    )
                                                }
                                                className="bg-[#3ABFF8] text-white px-2 py-1 rounded text-xs"
                                            >
                                                Buy
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Create/Draft NFT Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1A1A1A] p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">
                            {modalType === 'create'
                                ? 'Create New NFT'
                                : 'Draft NFT'}
                        </h2>
                        <input
                            type="text"
                            name="name"
                            value={nftData.name}
                            onChange={handleInputChange}
                            placeholder="NFT Name"
                            className="w-full bg-[#0D0D0D] text-white p-2 mb-4 rounded"
                        />
                        <textarea
                            name="description"
                            value={nftData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full bg-[#0D0D0D] text-white p-2 mb-4 rounded"
                        />
                        <input
                            type="number"
                            name="price"
                            value={nftData.price}
                            onChange={handleInputChange}
                            placeholder="Price (ETH)"
                            className="w-full bg-[#0D0D0D] text-white p-2 mb-4 rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePublish}
                                className="bg-[#3ABFF8] text-white px-4 py-2 rounded hover:bg-[#3ABFF8]/80"
                            >
                                {modalType === 'create'
                                    ? 'Create NFT'
                                    : 'Save Draft'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NFTDashboard;
