import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import useScript from "./../lib/useScript";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { sizes, colors } from "./../styles/styleguide";
import CONTRACT_ABI from "./../lib/abi_2021_02_25.json";
import axios from "axios";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import ProgressBar from "./../components/ProgressBar";
import CalculatorEstimate from "../components/CalculatorEstimation";
import Calculator from "./../components/Calculator";
import Media from "./../components/Media";

let web3;

export default function Home({ ethPrice }) {
  const [wallet, setWallet] = useState(null);
  const [web3Obj, setWeb3Obj] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [dETHbalance, setDETHbalance] = useState(null);
  const [eTHbalance, setETHbalance] = useState(0);
  const [dETHtoETHvalue, setDETHtoETHvalue] = useState(0);
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [web3Detect, setWeb3Detect] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  useEffect(() => {
    if (typeof window != "undefined" && !web3) {
      if (window.ethereum !== undefined) {
        setWeb3Detect(true);
      }
      connectSelectedWallet();
    }
  }, [wallet]);
  const connectSelectedWallet = async () => {
    console.log("connectSelectedWallet");
    if (wallet === "metamask") {
      try {
        const newWeb3 = await new Web3(window.ethereum);
        web3 = newWeb3;
        setWeb3Obj(web3);
        connectWallet();
      } catch (error) {
        setWallet(null);
        web3 = false;
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
        web3 = false;
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
    web3 = null;
    setWeb3Obj(null);
    setWalletAddress(null);
    setWallet(null);
    setDETHbalance(null);
    setDETHtoETHvalue(0);
    setETHbalance(0);
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
          await getDETHbalance(accounts[0]);
          await getETHbalance(accounts[0]);
        }
      })();
    }
  };
  useEffect(() => {
    if (web3Obj !== null) {
      web3Obj.eth.getChainId().then((chainID) => {
        // Detect which blockchain MM is connected to. ID 1 means Ethereum
        if (chainID == 1) {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    }
  }, [web3, web3Obj, walletAddress]);
  const getDETHtoETHValue = async (data) => {
    let new_contract = await new web3.eth.Contract(
      CONTRACT_ABI,
      process.env.ETH_CONTRACT_ADDRESS
    );
    const balanceOfDETH = await new_contract.methods
      .calculateRedemptionValue(data)
      .call();
    setDETHtoETHvalue(balanceOfDETH);
  };
  const getDETHbalance = async (data) => {
    console.log(104, web3, web3Obj);
    let new_contract;
    try {
      if (web3 === undefined) {
        new_contract = await new web3Obj.eth.Contract(
          CONTRACT_ABI,
          process.env.ETH_CONTRACT_ADDRESS
        );
      } else {
        new_contract = await new web3.eth.Contract(
          CONTRACT_ABI,
          process.env.ETH_CONTRACT_ADDRESS
        );
      }
      const balanceOfDETH = await new_contract.methods.balanceOf(data).call();
      setDETHbalance(web3?.utils?.fromWei(balanceOfDETH));
      await getDETHtoETHValue(balanceOfDETH);
    } catch (error) {
      console.log("Unable to connect to wallet.", error);
    }
  };

  const getETHbalance = async (data) => {
    const getBalance = await web3?.eth?.getBalance(data);
    const getWeiValue = await web3?.utils?.fromWei(getBalance.toString());
    //  Get Chain Id
    console.log("ETH Balance", getWeiValue);
    setETHbalance(getWeiValue);
  };
  useEffect(() => {
    if (window.ethereum) {
      // Metamask account change
      window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          // setWeb3(null);
          localStorage.removeItem("walletconnect");
          web3 = null;
          setWeb3Obj(null);
          setWalletAddress(null);
          setWallet(null);
          setDETHbalance(null);
          setDETHtoETHvalue(0);
          setETHbalance(0);
        }
      });
      // Network account change
      window.ethereum.on("chainChanged", function (networkId) {
        console.log(157, networkId);
        if (networkId === "0x1") {
          setWrongChain(false);
        } else {
          setWrongChain(true);
        }
      });
    } else {
      console.warn("No web3 detected.");
    }
  }, []);
  const shortenAddress = (data) => {
    const first = data.slice(0, 6);
    const last = data.slice(data.length - 4, data.length);
    return `${first}...${last}`;
  };
  return (
    <Layout>
      <h1>LEVR Curve Sale</h1>
      <h2>LEVR Curve Sale</h2>
      <div>
        <button>Button</button>
        <button className="green border-radius-0-10">Button</button>
        <button className="red border-radius-0-10">Button</button>
      </div>
      <div>
        <button className="action">Button</button>
      </div>
      <div>
        <button className="action">Button</button>
      </div>
      <div>
        <p>
          Since the cost raises with each transaction, the faster you buy, the
          more LEVR you will get for the ETH you spend! Since the cost raises
          with each transaction, the faster you buy, the more LEVR you will get
          for the ETH you spend! Since the cost raises with each transaction,
          the faster you buy, the more LEVR you will get for the ETH you spend!
        </p>
        <p>
          Since the cost raises with each transaction, the faster you buy, the
          more LEVR you will get for the ETH you spend! Since the cost raises
          with each transaction, the faster you buy, the more LEVR you will get
          for the ETH you spend! Since the cost raises with each transaction,
          the faster you buy, the more LEVR you will get for the{" "}
          <a href="https://levr.ly" rel="noreferrer">
            ETH you spend
          </a>
          !
        </p>
      </div>
      <div className="flex">
        <input type="text" />
        <button className="blue border-radius-0-10">Button</button>
      </div>
      <br />
      <div className="flex">
        <div className="bg-red">RED</div>
        <div className="bg-blue">BLUE</div>
        <div className="bg-green">GREEN</div>
        <div className="bg-dark-blue">BLUE</div>
        <div className="bg-yellow">YELLOW</div>
        <div className="bg-darkest-blue">darkest-blue</div>
      </div>
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