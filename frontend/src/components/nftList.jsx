import React from 'react';

const NFTList = ({ nfts, handleBuyNFT }) => {
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Listed NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                    <div
                        key={nft.id}
                        className="border border-gray-300 p-4 rounded-lg"
                    >
                        <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-bold mt-2">
                            {nft.name}
                        </h3>
                        <p className="text-gray-600">
                            {nft.description}
                        </p>
                        <p className="text-green-500 font-bold">
                            Price: {nft.price} ETH
                        </p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                            onClick={handleBuyNFT}
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTList;
