module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    ETH_RPC: "https://cloudflare-eth.com/",
    ETH_CONTRACT_ADDRESS: "0x2d1256e9F1758dA2722991BC5D411872549C89A1",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
