import { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import CONTRACT_ABI_SALE_INFO from "./../lib/abi_2022_01_14.json";

import Layout from "../components/Layout";
import Header from "../components/Header";
import ProgressBar from "./../components/ProgressBar";
import CurveSale from "./../components/CurveSale";
import Buy from "./../components/Buy";

let web3;

const STATIC_MAX_TOKENS = 100000000;

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [web3Obj, setWeb3Obj] = useState(null);
  const [web3Detect, setWeb3Detect] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);

  const [setNewDataIncrements, setSetNewDataIncrements] = useState(1);

  const [maxTokens, setMaxTokens] = useState(100000000);
  const [zoomLevel, setZoomLevel] = useState(1);

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
  const setNewData = () => {
    // fetchSaleData("20000000000000000000000");
    const data = 1000;
    fetchSaleData(web3.utils.toWei(data.toString(), "ether"));
  };
  const fetchSaleData = async (amount) => {
    try {
      let new_contract = await new web3.eth.Contract(
        CONTRACT_ABI_SALE_INFO,
        process.env.ETH_CONTRACT_ADDRESS_SALE_INFO
      );
      const saleInfo = await new_contract.methods.getSaleInfo(amount).call();
      console.log(60, saleInfo);
      setCurveData({
        priceBefore: parseFloat(
          web3?.utils?.fromWei(saleInfo._priceBefore, "ether")
        ),
        raisedBefore: parseFloat(
          web3?.utils?.fromWei(saleInfo._raisedBefore, "ether")
        ),
        totalTokensSoldBefore: parseFloat(
          web3?.utils?.fromWei(saleInfo._totalTokensSoldBefore, "ether")
        ),
        raisedAfter: parseFloat(
          web3?.utils?.fromWei(saleInfo._raisedAfter, "ether")
        ),
        totalTokensSoldAfter: parseFloat(
          web3?.utils?.fromWei(saleInfo._totalTokensSoldAfter, "ether")
        ),
        priceAfter: parseFloat(
          web3?.utils?.fromWei(saleInfo._priceAfter, "ether")
        ),
        tokensReceived: parseFloat(
          web3?.utils?.fromWei(saleInfo._tokensReceived, "ether")
        ),
        pricePaidPerToken: parseFloat(
          web3?.utils?.fromWei(saleInfo._pricePaidPerToken, "ether")
        ),
        maxPrice: parseFloat(web3?.utils?.fromWei("328352394996040", "ether")),
      });
      if (curveData.priceBefore !== 0) {
        setInitSaleInfoFetch(false);
      }
    } catch (error) {
      console.log("Increase -error", error);
    }
  };
  const connectSelectedWallet = async () => {
    console.log("connectSelectedWallet", wallet);
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
        const provider = new WalletConnectProvider({
          rpc: {
            1: process.env.ETH_RPC,
          },
        });
        await provider.enable();
        const newWeb3 = await new Web3(provider);
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
    // setDETHbalance(null);
    // setDETHtoETHvalue(0);
    // setETHbalance(0);
  };
  const connectWallet = () => {
    console.log(66, `connectWallet`);
    if (typeof window != "undefined" && web3) {
      (async () => {
        console.log("Startup, test eth_requestAccounts");
        let testPassed = false;
        if (wallet === "metamask") {
          try {
            const sendTest = await window.ethereum.send("eth_requestAccounts");
            console.log("sendTest", sendTest);
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
          console.log("accounts", accounts);
          setWalletAddress(accounts[0]);
          // await getDETHbalance(accounts[0]);
          // await getETHbalance(accounts[0]);
        }
      })();
    }
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
        if (chainID == 1 || chainID == 3) {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    }
  }, [web3, web3Obj, walletAddress]);
  const connectWeb3 = async () => {
    if (typeof window != "undefined" && web3 === undefined) {
      console.log(201, "connectWeb3");
      // const newWeb3 = await new Web3(window.ethereum);
      const newWeb3 = await new Web3(process.env.ETH_RPC);
      web3 = newWeb3;
      // Execute and fetch data on first init
      fetchSaleData("1");
    }
  };
  useEffect(() => {
    connectWeb3();
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
        if (networkId === "0x1" || networkId === "0x3") {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    } else {
      console.warn("No web3 detected.");
    }
  }, []);
  return (
    <Layout>
      {wrongChain !== false && (
        <ProgressBar
          status={`Wrong chain, please switch to Ethereum Mainnet${
            wallet === "walletconnect" ? " and refresh." : "."
          }`}
          closeBtn={() => setWrongChain(false)}
        ></ProgressBar>
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
      />
      <CurveSale
        initSaleInfoFetch={initSaleInfoFetch}
        web3={web3}
        curveData={curveData}
        maxTokens={maxTokens}
        zoomLevel={zoomLevel}
        zoomGraph={zoomGraph}
        STATIC_MAX_TOKENS={STATIC_MAX_TOKENS}
      />
      <Buy
        setShowConnectOptions={setShowConnectOptions}
        walletAddress={walletAddress}
        web3Obj={web3Obj}
        web3={web3}
        curveData={curveData}
      />
    </Layout>
  );
}
