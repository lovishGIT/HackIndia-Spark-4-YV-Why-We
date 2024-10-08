import React, { useState, useEffect } from 'react';
import NFTMarketPlaceABI from "./build/contracts/NFTMarketplace.json";
import { ethers } from 'ethers';

const contractABI = NFTMarketPlaceABI.abi;
const contractAddress = '0xe9F32EE10A55941D4aD9602fe283C1825EF3280E';

export default function NFTMarketplace() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [listedNFTs, setListedNFTs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        const initializeEthers = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                setProvider(provider);
                setSigner(signer);
                setContract(contract);

                await loadNFTs(contract);
            }
        };

        initializeEthers();
    }, []);

    const loadNFTs = async (contract) => {
        try {
            const listedTokenIds = await contract.fetchListedNFTs();
            const nfts = await Promise.all(
                listedTokenIds.map(async (id) => {
                    const token = await contract.listedTokens(id);
                    return {
                        id: id.toString(),
                        name: token.name,
                        description: token.description,
                        price: ethers.utils.formatEther(token.price),
                        owner: token.curr_owner,
                    };
                })
            );
            setListedNFTs(nfts);
            setLoading(false);
        } catch (error) {
            console.error('Error loading NFTs:', error);
            setLoading(false);
        }
    };

    const connectWallet = async () => {
        try {
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const provider = new ethers.providers.Web3Provider(
                window.ethereum
            );
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            setProvider(provider);
            setSigner(signer);
            setContract(contract);
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const createNFT = async () => {
        try {
            const tx = await contract.createNFT();
            await tx.wait();
            const tokenId = (await contract.tokenCounter()) - 1;
            return tokenId;
        } catch (error) {
            console.error('Error creating NFT:', error);
        }
    };

    const listNFT = async (e) => {
        e.preventDefault();
        try {
            const tokenId = await createNFT();
            const price = ethers.utils.parseEther(formData.price);
            const tx = await contract.listNFT(
                tokenId,
                formData.name,
                formData.description,
                price
            );
            await tx.wait();
            await loadNFTs(contract);
            setFormData({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    };

    const buyNFT = async (tokenId, price) => {
        try {
            const tx = await contract.buyNFT(tokenId, {
                value: ethers.utils.parseEther(price),
            });
            await tx.wait();
            await loadNFTs(contract);
        } catch (error) {
            console.error('Error buying NFT:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        NFT Marketplace
                    </h1>
                    <button
                        onClick={connectWallet}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {signer ? 'Connected' : 'Connect Wallet'}
                    </button>
                </header>


                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Create New NFT
                    </h2>
                    <form onSubmit={listNFT} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Price (ETH)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Create and List NFT
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p>Loading NFTs...</p>
                    ) : listedNFTs.length === 0 ? (
                        <p>No NFTs listed yet</p>
                    ) : (
                        listedNFTs.map((nft) => (
                            <div
                                key={nft.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {nft.name}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {nft.description}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Owner: {nft.owner.slice(0, 6)}
                                        ...{nft.owner.slice(-4)}
                                    </p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-lg font-medium text-gray-900">
                                            {nft.price} ETH
                                        </span>
                                        <button
                                            onClick={() =>
                                                buyNFT(
                                                    nft.id,
                                                    nft.price
                                                )
                                            }
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Buy NFT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
