module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    // ETH_RPC: "https://cloudflare-eth.com/",
    // ETH_RPC: "https://ropsten.infura.io/v3/2adef7d1aa684a1485e38140c7894434",
    ETH_RPC: "https://arb1.arbitrum.io/rpc",
    // ETH_RPC: "https://rinkeby.arbitrum.io/rpc",
    ETH_CONTRACT_ADDRESS_SALE_INFO:
      "0xF7C43849a0748848910b27FF2802951c9fb93794",
    ETH_CONTRACT_ADDRESS: "0x272cC4925E544D2878D41bbDc5fF57F2120592b6",
    ETH_CONTRACT_ADDRESS_TOKEN_SALE:
      "0x7A416Afc042537f290CB44A7c2C269Caf0Edc93C",
    BLOCKCHAINS: {
      eth: "Ethereum",
    },
  },
};
