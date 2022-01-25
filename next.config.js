module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    // ETH_RPC: "https://cloudflare-eth.com/",
    ETH_RPC: "https://ropsten.infura.io/v3/2adef7d1aa684a1485e38140c7894434",
    ETH_CONTRACT_ADDRESS: "0x45F7e0A7Ebb5cd6E908F6AaE5F47c2D6f3952abd",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
