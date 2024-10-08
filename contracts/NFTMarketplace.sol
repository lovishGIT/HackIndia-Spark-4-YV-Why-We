// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    uint256 public tokenCounter;

    struct ListedToken {
        string name;
        string description;
        uint256 price;
        bool isListed;
        address payable curr_owner;
        address prev_owner;
    }

    mapping(uint256 => ListedToken) public listedTokens; // TODO: Doubt

    event NFTCreated(uint256 indexed tokenId, string name, string description, uint256 price, address curr_owner, address prev_owner);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, uint256 price);

    constructor() {
        tokenCounter = 0;
    }

    function createNFT() public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        tokenCounter++;

        // Emit event for NFT creation
        emit NFTCreated(newTokenId, "", "", 0, payable(msg.sender), msg.sender);
        return newTokenId;
    }

    function listNFT(uint256 tokenId, string memory name, string memory description, uint256 price) public {
        require(price > 0, "Price must be positive");
        require(!listedTokens[tokenId].isListed, "Token already listed");

        listedTokens[tokenId] = ListedToken(
            name,
            description,
            price,
            true,
            payable(msg.sender),
            msg.sender
        );

        // Emit event for NFT listing
        emit NFTListed(tokenId, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        ListedToken memory tokenData = listedTokens[tokenId];
        require(tokenData.isListed, "Token not for sale");
        require(msg.value == tokenData.price, "Incorrect price");

        payable(tokenData.curr_owner).transfer(msg.value);
        tokenData.curr_owner = payable(msg.sender);
        tokenData.prev_owner = tokenData.curr_owner;

        listedTokens[tokenId] = tokenData;
        emit NFTSold(tokenId, msg.sender, tokenData.price);
    }

    function fetchListedNFTs() public view returns (uint256[] memory) {
        uint256 totalTokens = tokenCounter;
        uint256 listedCount = 0;

        for (uint256 i = 0; i < totalTokens; i++) {
            if (listedTokens[i].isListed) {
                listedCount++;
            }
        }

        uint256[] memory listedTokensArr = new uint256[](listedCount);
        uint256 index = 0;

        for (uint256 i = 0; i < totalTokens; i++) {
            if (listedTokens[i].isListed) {
                listedTokensArr[index] = i;
                index++;
            }
        }

        return listedTokensArr;
    }
}