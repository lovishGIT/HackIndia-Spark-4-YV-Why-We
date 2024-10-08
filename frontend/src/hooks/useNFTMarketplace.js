import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_ADDRESS } from '../utils/contractSettings';

export const useNFTMarketplace = () => {
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const initializeWeb3 = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    NFT_MARKETPLACE_ADDRESS,
                    NFT_MARKETPLACE_ABI,
                    signer
                );

                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                setProvider(provider);
                setSigner(signer);
                setContract(contract);
                setAccount(accounts[0]);
                setError(null);
            } else {
                throw new Error("Please install MetaMask!");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error initializing Web3:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
    };

    const handleChainChanged = () => {
        window.location.reload();
    };

    useEffect(() => {
        initializeWeb3();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

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

    const listNFT = async (tokenId, name, description, price) => {
        try {
            // const price = await ethers.utils.parseEther(pr);
            // console.log(price, name, description, tokenId);

            await contract.listNFT(
                tokenId,
                name,
                description,
                price
            );
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const buyNFT = async (tokenId, price) => {
        try {
            if (!contract) throw new Error("Contract not initialized");
            const priceInWei = ethers.utils.parseEther(price.toString());
            const tx = await contract.buyNFT(tokenId, { value: priceInWei });
            const receipt = await tx.wait();
            return receipt;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const fetchListedNFTs = async () => {
        try {
            if (!contract) throw new Error("Contract not initialized");
            const tokenIds = await contract.fetchListedNFTs();
            const nfts = await Promise.all(
                tokenIds.map(async (tokenId) => {
                    const nft = await contract.listedTokens(tokenId);
                    // console.log(nft.name);

                    // console.log(
                    //     (nft.price).toString()
                    // );


                    return {
                        tokenId: tokenId.toString(),
                        name: nft.name,
                        description: nft.description,
                        price: nft.price.toString(),
                        isListed: nft.isListed,
                        owner: nft.curr_owner,
                        prevOwner: nft.prev_owner,
                    };
                })
            );
            return nfts;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    return {
        contract,
        provider,
        signer,
        account,
        loading,
        error,
        createNFT,
        listNFT,
        buyNFT,
        fetchListedNFTs
    };
};