require("dotenv").config();
const _ = require("lodash");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const PRIVATE_KEY = process.env.TESTNET_BASE_SEPOLIA_PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

const config = {
  networks: {
    baseSepolia: {
      provider: () =>
        new HDWalletProvider(PRIVATE_KEY, "https://sepolia.base.org"),
      network_id: 84532,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 4100000,
      gasPrice: 8000000000, // 8 Gwei
    },
    ethereumSepolia: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
        ),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 4000000,
      gasPrice: 10000000000, // 10 Gwei
    },
    mainnet: {
      host: "localhost",
      port: 8545,
      network_id: "1",
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3",
    },
    kovan: {
      host: "localhost",
      port: 8545,
      network_id: "42",
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4",
    },
    goerli: {
      host: "localhost",
      port: 8545,
      network_id: "5",
    },
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "31337",
    },
  },
  mocha: {
    enableTimeouts: false,
    grep: process.env.TEST_GREP,
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      excludeContracts: ["Migrations"],
    },
  },
  compilers: {
    solc: {
      version: "0.5.10",
      settings: {
        optimizer: {
          enabled: true,
        },
      },
    },
  },
};

try {
  const localConfig = require("./truffle-local");
  _.merge(config, localConfig);
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND") {
    console.log("No local truffle config found. Using all defaults...");
  } else {
    console.warn("Tried processing local config but got error:", e);
  }
}
module.exports = config;
