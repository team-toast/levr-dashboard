import { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import axios from "axios";

import CONTRACT_ABI_SALE_INFO from "./../lib/abi_sale_info.json";

import Layout from "../components/Layout";
import Header from "../components/Header";
import ProgressBar from "./../components/ProgressBar";
import CurveSale from "./../components/CurveSale";
import Buy from "./../components/Buy";
import TakeNoteOf from "./../components/TakeNoteOf";

let web3;

const STATIC_MAX_TOKENS = 400000000;

let PROVIDER;

export default function Home({ ethPrice }) {
  const [showUSDCurrency, setShowUSDCurrency] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [web3Obj, setWeb3Obj] = useState(null);
  const [web3Detect, setWeb3Detect] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(Date.now());

  const [depositEth, setDepositEth] = useState("");

  const [setNewDataIncrements, setSetNewDataIncrements] = useState(1);

  const [maxTokens, setMaxTokens] = useState(400000000);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [switchNetworkErrorMessage, setSwitchNetworkErrorMessage] =
    useState("");

  const [curveData, setCurveData] = useState({
    priceBefore: 0,
    raisedBefore: 0,
    totalTokensSoldBefore: 0,
    raisedAfter: 0,
    totalTokensSoldAfter: 0,
    priceAfter: 0,
    tokensReceived: 0,
    pricePaidPerToken: 0,
    maxPrice: 0,
  });

  const [initSaleInfoFetch, setInitSaleInfoFetch] = useState(true);
  useEffect(() => {
    if (typeof window != "undefined" && web3 != undefined) {
      if (window.ethereum !== undefined) {
        setWeb3Detect(true);
      }
      connectSelectedWallet();
    }
  }, [wallet]);
  const zoomGraph = (data) => {
    setZoomLevel(data);
  };
  const setNewData = (ethValue) => {
    const data = ethValue;
    fetchSaleData(web3.utils.toWei(data.toString(), "ether"));
  };
  const fetchSaleData = async (amount) => {
    try {
      let new_contract = await new web3.eth.Contract(
        CONTRACT_ABI_SALE_INFO,
        process.env.ETH_CONTRACT_ADDRESS_SALE_INFO
      );
      const saleInfo = await new_contract.methods.getSaleInfo(amount).call();
      setCurveData({
        priceBefore: saleInfo._priceBefore.toString(),
        raisedBefore: parseFloat(
          web3?.utils?.fromWei(saleInfo._raisedBefore.toString(), "ether")
        ),
        totalTokensSoldBefore: parseFloat(
          web3?.utils?.fromWei(
            saleInfo._totalTokensSoldBefore.toString(),
            "ether"
          )
        ),
        raisedAfter: parseFloat(
          web3?.utils?.fromWei(saleInfo._raisedAfter.toString(), "ether")
        ),
        totalTokensSoldAfter: parseFloat(
          web3?.utils?.fromWei(
            saleInfo._totalTokensSoldAfter.toString(),
            "ether"
          )
        ),
        priceAfter: saleInfo._priceAfter.toString(),
        tokensReceived: parseFloat(
          web3?.utils?.fromWei(saleInfo._tokensReceived.toString(), "ether")
        ),
        pricePaidPerToken: saleInfo._pricePaidPerToken.toString(),
        maxPrice: "328352394996040",
      });
      if (curveData.priceBefore !== 0) {
        setInitSaleInfoFetch(false);
      }
    } catch (error) {
      console.log("Increase -error", error);
    }
  };
  const connectSelectedWallet = async () => {
    if (wallet === "metamask") {
      try {
        const newWeb3 = await new Web3(window.ethereum);
        web3 = newWeb3;
        setWeb3Obj(web3);
        connectWallet();
      } catch (error) {
        setWallet(null);
        // web3 = false;
        setWeb3Obj(null);
        console.log("Could not connect Web3");
      }
    } else if (wallet === "walletconnect") {
      try {
        PROVIDER = new WalletConnectProvider({
          rpc: {
            1: "https://cloudflare-eth.com/",
            42161: process.env.ETH_RPC,
            421611: process.env.ETH_RPC,
          },
        });
        PROVIDER.enable();

        // Subscribe to accounts change
        PROVIDER.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            // setWeb3(null);
            localStorage.removeItem("walletconnect");
            // web3 = null;
            setWeb3Obj(null);
            setWalletAddress(null);
            setWallet(null);
            // setDETHbalance(null);
            // setDETHtoETHvalue(0);
            // setETHbalance(0);
          }
        });

        PROVIDER.on("session_update", (error, payload) => {
          if (error) {
            alert(error);
            throw error;
          }
          const { accounts, chainId } = payload.params[0];
          alert(chainId);
        });

        // Subscribe to chainId change
        PROVIDER.on("chainChanged", (chainId) => {
          console.log(chainId);
          console.log(157, chainId);
          if (chainId === "0xa4b1") {
            setWrongChain(false);
          } else {
            setWrongChain(true);
          }
        });

        // Subscribe to session disconnection
        PROVIDER.on("disconnect", (code, reason) => {
          console.log(code, reason);
          disconnectWalletConnect();
        });
        const newWeb3 = await new Web3(PROVIDER);
        web3 = newWeb3;
        setWeb3Obj(web3);
        const accounts = await web3.eth.getAccounts();
        console.log(56, accounts);
        connectWallet();
      } catch (error) {
        setWallet(null);
        // web3 = false;
        setWeb3Obj(null);
        console.log("Could not connect Web3");
      }
    }
  };
  const disconnectWallet = () => {
    // setWeb3(null);
    setWalletAddress(null);
  };
  const disconnectWalletConnect = () => {
    localStorage.removeItem("walletconnect");
    // web3 = null;
    setWeb3Obj(null);
    setWalletAddress(null);
    setWallet(null);
    setSwitchNetworkErrorMessage([]);
    // setDETHbalance(null);
    // setDETHtoETHvalue(0);
    // setETHbalance(0);
  };
  const connectWallet = () => {
    if (typeof window != "undefined" && web3) {
      (async () => {
        console.log("Startup, test eth_requestAccounts");
        let testPassed = false;
        if (wallet === "metamask") {
          try {
            const sendTest = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            testPassed = true;
          } catch (error) {
            setWallet(null);
            web3 = false;
            setWeb3Obj(null);
            console.log("sendTest Error: ", error);
          }
        }

        if (testPassed || wallet === "walletconnect") {
          console.log("updating web3");
          // const newWeb3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          setWalletAddress(accounts[0]);
          // await getDETHbalance(accounts[0]);
          // await getETHbalance(accounts[0]);
        }
      })();
    }
    setSwitchNetworkErrorMessage([]);
  };
  const shortenAddress = (data) => {
    const first = data.slice(0, 6);
    const last = data.slice(data.length - 4, data.length);
    return `${first}...${last}`;
  };
  useEffect(() => {
    if (web3Obj !== null) {
      web3Obj.eth.getChainId().then((chainID) => {
        // Detect which blockchain MM is connected to. ID 1 means Ethereum
        if (chainID == 42161 || chainID == 421611) {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    }
  }, [web3, web3Obj, walletAddress]);
  const connectWeb3 = async () => {
    if (typeof window != "undefined") {
      // const newWeb3 = await new Web3(window.ethereum);
      const newWeb3 = await new Web3(process.env.ETH_RPC);
      web3 = newWeb3;
      // Execute and fetch data on first init
      fetchSaleData("1");
    }
  };
  useEffect(() => {
    connectWeb3();
  }, [currentTimeStamp]);
  useEffect(() => {
    if (window.ethereum) {
      setWeb3Detect(true);
      // Metamask account change
      window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          // setWeb3(null);
          localStorage.removeItem("walletconnect");
          // web3 = null;
          setWeb3Obj(null);
          setWalletAddress(null);
          setWallet(null);
          // setDETHbalance(null);
          // setDETHtoETHvalue(0);
          // setETHbalance(0);
        }
      });
      // Network account change
      window.ethereum.on("chainChanged", function (networkId) {
        console.log(157, networkId);
        if (networkId === "0xa4b1") {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    } else {
      console.warn("No web3 detected.");
    }
    console.log(`ethPrice`, ethPrice);
  }, []);
  const switchNetworkToArbitrum = async () => {
    console.log("switchNetworkToArbitrum");
    if (wallet === "walletconnect") {
      setSwitchNetworkErrorMessage([
        `<strong>Switch not being detected?</strong>
        <p>1. Disconnect Wallet</p>
        <p>2. Switch manually to "Arbitrum One"</p>
        <p>3. Connect to wallet</p>
        `,
        `<strong>Add "Arbitrum One" manually.</strong>

          <p>Network Name: Arbitrum One</p>

          <p>New RPC URL: https://arb1.arbitrum.io/rpc</p>

          <p>Chain ID: 42161</p>

          <p>Symbol: AETH</p>

          <p>Block Explorer URL: https://arbiscan.io</p>
          `,
      ]);
    }
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa4b1" }],
      });
      console.log("switchNetworkToArbitrum", "try");
    } catch (error) {
      console.log("switchNetworkToArbitrum", error.code, error);
      if (error.code == undefined) {
        setSwitchNetworkErrorMessage([
          `<strong>Switch not being detected?</strong>
        <p>1. Disconnect Wallet</p>
        <p>2. Switch manually to "Arbitrum One"</p>
        <p>3. Connect to wallet</p>
        `,
          `<strong>Unable to switch chain? Add "Arbitrum One" manually.</strong>

          <p>Network Name: Arbitrum One</p>

          <p>New RPC URL: https://arb1.arbitrum.io/rpc</p>

          <p>Chain ID: 42161</p>

          <p>Symbol: AETH</p>

          <p>Block Explorer URL: https://arbiscan.io</p>
          `,
        ]);
      }
      if (error.code === 4902) {
        try {
          console.log("switchNetworkToArbitrum", 264, "try");
          await web3.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa4b1",
                chainName: "Arbitrum One",
                rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                nativeCurrency: {
                  name: "AETH",
                  symbol: "AETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://arbiscan.io"],
              },
            ],
          });
        } catch (error) {
          console.log("switchNetworkToArbitrum", 282, error);
          setSwitchNetworkErrorMessage([
            `<strong>Switch not being detected?</strong>
        <p>1. Disconnect Wallet</p>
        <p>2. Switch manually to "Arbitrum One"</p>
        <p>3. Connect to wallet</p>
        `,
            `<strong>Unable to switch chain? Add "Arbitrum One" manually.</strong>

          <p>Network Name: Arbitrum One</p>

          <p>New RPC URL: https://arb1.arbitrum.io/rpc</p>

          <p>Chain ID: 42161</p>

          <p>Symbol: AETH</p>

          <p>Block Explorer URL: https://arbiscan.io</p>
          `,
          ]);
        }
      }
    }
  };
  const convertTo = (value, data) => {
    const convert = parseFloat(web3?.utils?.fromWei(value.toString(), data));
    return convert;
  };
  return (
    <Layout>
      {wrongChain !== false && walletAddress != null && (
        <ProgressBar
          status={`Wrong chain, please switch to "Arbitrum One"${
            wallet === "walletconnect" ? " and refresh." : "."
          }`}
          messages={switchNetworkErrorMessage}
          closeBtn={() => setWrongChain(false)}
        >
          <br />
          <button onClick={switchNetworkToArbitrum}>
            Switch to Arbitrum One
          </button>
        </ProgressBar>
      )}
      <Header
        wallet={wallet}
        setWallet={setWallet}
        web3Detect={web3Detect}
        walletAddress={walletAddress}
        showConnectOptions={showConnectOptions}
        setShowConnectOptions={setShowConnectOptions}
        showDisconnectWallet={showDisconnectWallet}
        setShowDisconnectWallet={setShowDisconnectWallet}
        disconnectWalletConnect={disconnectWalletConnect}
        shortenAddress={shortenAddress}
        showUSDCurrency={showUSDCurrency}
        setShowUSDCurrency={setShowUSDCurrency}
      />
      <CurveSale
        initSaleInfoFetch={initSaleInfoFetch}
        web3={web3}
        curveData={curveData}
        maxTokens={maxTokens}
        zoomLevel={zoomLevel}
        zoomGraph={zoomGraph}
        STATIC_MAX_TOKENS={STATIC_MAX_TOKENS}
        showUSDCurrency={showUSDCurrency}
        ethPrice={ethPrice}
        convertTo={convertTo}
      />
      <Buy
        showUSDCurrency={showUSDCurrency}
        setShowConnectOptions={setShowConnectOptions}
        walletAddress={walletAddress}
        web3Obj={web3Obj}
        web3={web3}
        curveData={curveData}
        setNewDataFunction={setNewData}
        ethPrice={ethPrice}
        depositEth={depositEth}
        setDepositEth={setDepositEth}
        convertTo={convertTo}
      />
      <TakeNoteOf />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  );
  const ethPrice = await axios(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD`
  );
  return {
    props: {
      ethPrice: ethPrice.data.USD ? ethPrice.data.USD : "3000",
    },
  };
}
