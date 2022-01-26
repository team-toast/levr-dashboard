import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../../styles/flex-grid";
import { useState, useEffect } from "react";

import CONTRACT_ABI from "./../../lib/abi_2022_01_24.json";

import Web3 from "web3";

import WalletState from "./../WalletState";

const BALANCE_ABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

import Link from "next/link";

export default function Buy({
  curveData,
  web3,
  web3Obj,
  walletAddress,
  setShowConnectOptions,
}) {
  const [levrBalance, setLevrBalance] = useState(0);
  const [eTHbalance, setETHbalance] = useState(0);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const getLevrBalance = async (data) => {
    console.log(27, web3, web3Obj);
    let new_contract;
    const rpcURL = process.env.ETH_RPC;
    const web3_rpc = new Web3(rpcURL);
    // try {
    console.log(42, web3_rpc);
    if (web3_rpc !== undefined) {
      new_contract = new web3_rpc.eth.Contract(
        BALANCE_ABI,
        process.env.ETH_CONTRACT_ADDRESS_TOKEN_SALE
      );
    }
    const result = await new_contract.methods.balanceOf(walletAddress).call();
    const format = web3?.utils?.fromWei(result);
    setLevrBalance(format);
    // } catch (error) {
    //   console.log("Unable to get balance.", error);
    // }
  };

  const getETHbalance = async (data) => {
    const getBalance = await web3?.eth?.getBalance(data);
    const getWeiValue = await web3?.utils?.fromWei(getBalance.toString());
    //  Get Chain Id
    console.log("ETH Balance", getWeiValue);
    setETHbalance(getWeiValue);
  };

  const addLevrTokenToMM = async () => {
    const tokenAddress = "0x45F7e0A7Ebb5cd6E908F6AaE5F47c2D6f3952abd";
    const tokenSymbol = "LEVR";
    const tokenDecimals = 18;
    // const tokenImage = "https://app.levr.ly/deth-logo-svg.svg";

    try {
      const wasAdded = await web3?.currentProvider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("User added token.");
      } else {
        console.log("User cancelled.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (walletAddress != null) {
      getLevrBalance(walletAddress);
    }
  }, [web3Obj, walletAddress]);
  return (
    <Box>
      {walletAddress == null && (
        <ConnectWalletOverlay>
          <button onClick={() => setShowConnectOptions(true)}>
            Connect Wallet
          </button>
        </ConnectWalletOverlay>
      )}
      <h2 className="text-center">Your LEVR</h2>
      <BuyRow xsNoflex>
        {/* Balance */}
        <Col className="balance" size={1}>
          <Row>
            <Col size={1}>
              <h2>
                LEVR
                <br />
                Balance
              </h2>
            </Col>
            <Col className="text-right" size={1}>
              <h2 className="text-green">
                {numberWithCommas(levrBalance)} LEVR
              </h2>
              <i>In your wallet</i>
            </Col>
          </Row>
          <div className="text-center margin-top-2">
            <button className="action" onClick={addLevrTokenToMM}>
              List on my Metamask/Wallet
            </button>
          </div>
        </Col>
        {/* Buy */}
        <Col className="balance buy" size={1}>
          <Inner>
            <strong className="margin-bottom-1 display-block">Buy LEVR</strong>
            <div className="flex">
              <input type="text" placeholder="Enter ETH amount" />
              <button className="b-r-0-10-10-0">Buy</button>
            </div>
            <p>
              View{" "}
              <Link href="/">
                <a>Terms & Conditions</a>
              </Link>
            </p>
            <p>
              Average cost per token is{" "}
              <span className="font-weight-bold text-red">
                {curveData.priceBefore.toFixed(6)} nETH
              </span>
            </p>
            {curveData.priceBefore.toFixed(6) !==
              curveData.priceAfter.toFixed(6) && (
              <p>
                {`You'll`} raise average cost to{" "}
                <span className=" font-weight-bold text-blue">
                  {curveData.priceAfter.toFixed(6)} nETH
                </span>
              </p>
            )}
          </Inner>
        </Col>
      </BuyRow>
    </Box>
  );
}

const ConnectWalletOverlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 75%;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuyRow = styled(Row)`
  h2 {
    line-height: 2.3rem;
    font-size: 2em;
  }
  .balance {
    border-radius: 10px;
    background: #f5f5f5;
    padding: 2rem;
    &.buy {
      padding: 0 2rem;
      background: #fff;
      button {
        width: 150px;
        min-width: auto;
      }
      @media screen and (max-width: 48em) {
        margin-top: 2rem;
        padding: 0;
      }
    }
  }
`;

const Inner = styled.div`
  margin: auto;
  max-width: 388px;
`;

const ChartRow = styled(Row)`
  > div {
    @media screen and (max-width: 48em) {
      margin-bottom: 1rem;
    }
  }
`;

const Box = styled.div`
  width: 100%;
  max-width: 1050px;
  margin: 2rem auto 0;
  padding: 0 1rem;
  position: relative;
`;

const StyledColMargin10 = styled(Col)`
  margin: 0 1rem;
  @media screen and (max-width: 48em) {
    margin: 0;
  }
`;
