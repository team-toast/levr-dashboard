module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    // ETH_RPC: "https://cloudflare-eth.com/",
    // ETH_RPC: "https://ropsten.infura.io/v3/2adef7d1aa684a1485e38140c7894434",
    ETH_RPC: "https://arb1.arbitrum.io/rpc",
    // ETH_RPC: "https://rinkeby.arbitrum.io/rpc",
    ETH_CONTRACT_ADDRESS_SALE_INFO:
      "0x82154Fe7991B3d253BF0954269dFAF50c078247a",
    ETH_CONTRACT_ADDRESS_Levr_Sale:
      "0x8e131BD8CD1D9E5bCE080bc54613d811E0425aF8",
    ETH_CONTRACT_ADDRESS_LEVR_ERC20:
      "0x77De4df6F2d87Cc7708959bCEa45d58B0E8b8315",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
