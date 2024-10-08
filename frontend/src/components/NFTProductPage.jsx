import React, { useState } from 'react';
import { Search, Copy, ExternalLink } from 'lucide-react';

const NFTProductPage = () => {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="min-h-screen bg-black text-gray-300 p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-white">
                    LoyalNFT
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for NFTs or tokens ID..."
                        className="bg-gray-900 text-white px-4 py-2 rounded-full pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                    <Search
                        className="absolute right-3 top-2.5 text-gray-400"
                        size={20}
                    />
                </div>
                <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="NFT"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-lg aspect-square"
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">
                            LoyalNFT Core NFTs #443642
                        </h2>
                        <button className="text-gray-400 hover:text-white">
                            <ExternalLink size={20} />
                        </button>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">
                                Price
                            </h3>
                            <button className="text-blue-500 hover:text-blue-400 flex items-center">
                                <span className="mr-1">
                                    r2g24-4qg2q-d3s44-3qw32
                                </span>
                                <Copy size={16} />
                            </button>
                        </div>
                        <p className="text-3xl font-bold text-white mb-4">
                            8.24 ICP{' '}
                            <span className="text-sm text-gray-400">
                                ($41.14)
                            </span>
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Buy Now
                        </button>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">dNFT</p>
                                <p>53.21%</p>
                            </div>
                            <div>
                                <p className="text-gray-400">98b</p>
                                <p>Value</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex border-b border-gray-800 mb-4">
                            <button
                                className={`pb-2 px-4 font-semibold ${
                                    activeTab === 'description'
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-gray-400'
                                }`}
                                onClick={() =>
                                    setActiveTab('description')
                                }
                            >
                                Description
                            </button>
                            <button
                                className={`pb-2 px-4 font-semibold ${
                                    activeTab === 'details'
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-gray-400'
                                }`}
                                onClick={() =>
                                    setActiveTab('details')
                                }
                            >
                                Details
                            </button>
                            <button
                                className={`pb-2 px-4 font-semibold ${
                                    activeTab === 'activities'
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-gray-400'
                                }`}
                                onClick={() =>
                                    setActiveTab('activities')
                                }
                            >
                                Activities
                            </button>
                        </div>
                        {activeTab === 'description' && (
                            <p className="text-sm text-gray-400">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                        )}
                        {activeTab === 'details' && (
                            <div className="text-sm text-gray-400">
                                <p>Contract Address: 0x1234...5678</p>
                                <p>Token ID: 443642</p>
                                <p>Token Standard: ERC-721</p>
                            </div>
                        )}
                        {activeTab === 'activities' && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-400">
                                        <th className="pb-2">
                                            Event
                                        </th>
                                        <th className="pb-2">
                                            Price
                                        </th>
                                        <th className="pb-2">From</th>
                                        <th className="pb-2">To</th>
                                        <th className="pb-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2">
                                            Transfer
                                        </td>
                                        <td className="py-2">
                                            8.0 ICP
                                        </td>
                                        <td className="py-2 text-blue-500">
                                            0x1234...5678
                                        </td>
                                        <td className="py-2 text-blue-500">
                                            0x8765...4321
                                        </td>
                                        <td className="py-2">
                                            2023-11-15
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Mint</td>
                                        <td className="py-2">-</td>
                                        <td className="py-2 text-blue-500">
                                            NullAddress
                                        </td>
                                        <td className="py-2 text-blue-500">
                                            0x2345...6789
                                        </td>
                                        <td className="py-2">
                                            2023-11-14
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NFTProductPage;
