require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const api_key = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""
const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url:  `https://eth-sepolia.g.alchemy.com/v2/${api_key.toString()}`,
      chainId: 11155111,
      gasPrice: 25000,
      accounts: [
        private_key
      ]
    }
  },
};

