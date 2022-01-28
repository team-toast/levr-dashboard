module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    // ETH_RPC: "https://cloudflare-eth.com/",
    ETH_RPC: "https://ropsten.infura.io/v3/2adef7d1aa684a1485e38140c7894434",
    ETH_CONTRACT_ADDRESS_SALE_INFO:
      "0x7B2B1D2AF3a16186F824A2a7C8bC18ce49916b0a",
    ETH_CONTRACT_ADDRESS: "0x5A2312edD08C29F185eB63C02f31350Ea2512f64",
    ETH_CONTRACT_ADDRESS_TOKEN_SALE:
      "0xa9cccd81e1fa331ac893dfc7ff833bbb7309c720",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
