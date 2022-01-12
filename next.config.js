module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    ETH_RPC: "https://cloudflare-eth.com/",
    ETH_CONTRACT_ADDRESS: "0xa788211dcE331d519A9BDA81aB070C9079346791",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
