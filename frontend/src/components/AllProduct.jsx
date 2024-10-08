import React, { useCallback, useEffect, useState } from 'react';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';
import Particles from 'react-tsparticles';
import { ChevronDown, Search, Filter, X, Info } from 'react-feather';

const AllProducts = () => {
    const { fetchListedNFTs, loading, error, account } =
        useNFTMarketplace();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
    });
    const [isWalletOpen, setIsWalletOpen] = useState(false);

    useEffect(() => {
        const loadNFTs = async () => {
            try {
                const nfts = await fetchListedNFTs();
                setProducts(nfts);
            } catch (error) {
                console.error('Error fetching NFTs:', error);
            }
        };

        loadNFTs();
    }, [fetchListedNFTs]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);


    return (
        <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: '#000000' } },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: { enable: true, mode: 'push' },
                            onHover: {
                                enable: true,
                                mode: 'repulse',
                            },
                            resize: true,
                        },
                        modes: {
                            push: { quantity: 4 },
                            repulse: { distance: 200, duration: 0.4 },
                        },
                    },
                    particles: {
                        color: { value: '#ffffff' },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: { enable: true },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: { default: 'bounce' },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: { enable: true, area: 800 },
                            value: 80,
                        },
                        opacity: { value: 0.5 },
                        shape: { type: 'circle' },
                        size: { value: { min: 1, max: 5 } },
                    },
                    detectRetina: true,
                }}
            />

            <div className="relative z-10">
                <header className="flex justify-between items-center p-4 border-b border-gray-800">
                    <nav className="flex space-x-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            CryptoPixel
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            BPW
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            Stake BPXS
                        </button>
                    </nav>
                    <button
                        className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
                        onClick={() => setIsWalletOpen(!isWalletOpen)}
                    >
                        <span>
                            {account ? account : 'Connect Wallet'}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </header>

                <main className="p-4">
                    <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 md:mb-0">
                            NFT Marketplace
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search NFTs..."
                                    className="bg-gray-800 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <Search
                                    className="absolute right-3 top-2.5 text-gray-400"
                                    size={20}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="bg-gray-800 text-white px-4 py-2 rounded-full appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'category',
                                            e.target.value
                                        )
                                    }
                                    value={filters.category}
                                >
                                    <option value="">
                                        All Categories
                                    </option>
                                    <option value="Pixel Art">
                                        Pixel Art
                                    </option>
                                    <option value="3D">3D</option>
                                    <option value="Abstract">
                                        Abstract
                                    </option>
                                </select>
                                <Filter
                                    className="absolute right-3 top-2.5 text-gray-400"
                                    size={20}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="bg-gray-800 text-white px-4 py-2 rounded-full appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'priceRange',
                                            e.target.value
                                        )
                                    }
                                    value={filters.priceRange}
                                >
                                    <option value="">
                                        All Prices
                                    </option>
                                    <option value="0-0.01">
                                        0 - 0.01 ETH
                                    </option>
                                    <option value="0.01-0.05">
                                        0.01 - 0.05 ETH
                                    </option>
                                    <option value="0.05-0.1">
                                        0.05 - 0.1 ETH
                                    </option>
                                    <option value="0.1-1">
                                        0.1 - 1 ETH
                                    </option>
                                </select>
                                <Filter
                                    className="absolute right-3 top-2.5 text-gray-400"
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-white">Loading NFTs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.tokenId}
                                    className="bg-gray-900 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                >
                                    <img
                                        src={product.image} // Ensure the product object has an image property
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-2">
                                            By {product.owner}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">
                                                {product.price} ETH
                                            </span>
                                            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-sm transition-colors">
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {isWalletOpen && (
                    <div className="fixed inset-y-0 right-0 w-80 bg-gray-900 p-4 overflow-y-auto shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">
                                My Wallet
                            </h2>
                            <button
                                onClick={() => setIsWalletOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="bg-black rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>ICP Balance</span>
                                <span className="text-white">
                                    0.1k
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Account ID: ***...3fea</span>
                                <span>Principal ID: ***...3fea</span>
                            </div>
                        </div>

                        <div className="bg-black rounded-lg p-4 mb-4">
                            <h3 className="font-semibold mb-2 text-white">
                                Owned NFTs
                            </h3>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-lg mb-2 transition-colors">
                                View NFTs
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;