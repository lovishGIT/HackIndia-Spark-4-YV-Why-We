import React, { useState } from 'react';

const inputs = [
    {
        name: "name",
        type: "text",
    }, {
        name: "description",
        type: "text",
    }, {
        name: "price",
        type: "number",
    }
]

const CreateNFTForm = ({ handleCreateNFT }) => {

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Create NFT</h2>
            <form onSubmit={handleCreateNFT}>
                {inputs.map((input, index) => (
                    <div className="mb-4" key={index}>
                        <label
                            htmlFor={input.name}
                            className="block text-gray-700 font-bold mb-2"
                        >
                            {input.name.charAt(0).toUpperCase() +
                                input.name.slice(1)}
                        </label>
                        <input
                            type={input.type}
                            id={input.name}
                            placeholder={
                                input.name.charAt(0).toUpperCase() +
                                input.name.slice(1)
                            }
                            className="border border-gray-300 p-2 w-full rounded-lg"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Create NFT
                </button>
            </form>
        </div>
    );
};

export default CreateNFTForm;
