module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    // ETH_RPC: "https://cloudflare-eth.com/",
    ETH_RPC: "https://ropsten.infura.io/v3/2adef7d1aa684a1485e38140c7894434",
    ETH_CONTRACT_ADDRESS_SALE_INFO:
      "0x45F7e0A7Ebb5cd6E908F6AaE5F47c2D6f3952abd",
    ETH_CONTRACT_ADDRESS: "0xfb49AA9de494D3350d2CAcd16cC28885DD43f8Bd",
    ETH_CONTRACT_ADDRESS_TOKEN_SALE:
      "0xa9cccd81e1fa331ac893dfc7ff833bbb7309c720",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
