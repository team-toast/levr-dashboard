import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../../styles/flex-grid";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function Buy({ curveData, web3 }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Box>
      <h2 className="text-center">Your LEVR</h2>
      <BuyRow xsNoflex smNoflex>
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
              <h2 className="text-green">{numberWithCommas(5000)} LEVR</h2>
              <i>In your wallet</i>
            </Col>
          </Row>
          <div className="text-center margin-top-2">
            <button className="action">List on my Metamask/Wallet</button>
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
`;

const StyledColMargin10 = styled(Col)`
  margin: 0 1rem;
  @media screen and (max-width: 48em) {
    margin: 0;
  }
`;
