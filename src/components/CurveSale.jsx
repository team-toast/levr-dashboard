import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";

import CurveGraph from "./../components/CurveGraph";

export default function CurveSale({
  curveData,
  web3,
  initSaleInfoFetch,
  maxTokens,
  zoomLevel,
  zoomGraph,
  STATIC_MAX_TOKENS,
  showUSDCurrency,
  ethPrice,
  convertTo,
}) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Box>
      <h1 className="text-center">LEVR Curve Sale</h1>
      <ChartRow xsNoflex className="font-family-HandelGotDBol">
        <Col size={1}>
          <Row>
            <Col
              className="b-r-10-0-0-10 bg-grey p-10 text-center strong-500"
              size={1}
            >
              ETH Raised
            </Col>
            <Col
              className="b-r-0-10-10-0 bg-blue text-white p-10 text-center strong-500"
              size={"0 0 170px"}
            >
              {numberWithCommas(curveData.raisedBefore.toFixed(3))} ETH
            </Col>
          </Row>
        </Col>
        <StyledColMargin10 size={1}>
          <Row>
            <Col
              className="b-r-10-0-0-10 bg-grey p-10 text-center strong-500"
              size={1}
            >
              LEVR Distributed
            </Col>
            <Col
              className="b-r-0-10-10-0 bg-red text-white p-10 text-center strong-500"
              size={"0 0 170px"}
            >
              {numberWithCommas(curveData.totalTokensSoldBefore.toFixed())} LEVR
            </Col>
          </Row>
        </StyledColMargin10>
        <Col size={1}>
          <Row>
            <Col
              className="b-r-10-0-0-10 bg-grey p-10 text-center strong-500"
              size={1}
            >
              Current Price
            </Col>
            <Col
              className="b-r-0-10-10-0 bg-green text-white p-10 text-center strong-500"
              size={"0 0 170px"}
            >
              {showUSDCurrency ? (
                <span>
                  {(
                    ethPrice * convertTo(curveData.priceBefore, "ether")
                  ).toFixed(4)}{" "}
                  USD
                </span>
              ) : (
                <span className="meth-symbol">
                  <span>
                    {isNaN(
                      convertTo(curveData.priceBefore, "microether").toFixed(2)
                    )
                      ? (0.0).toFixed(2)
                      : convertTo(curveData.priceBefore, "microether").toFixed(
                          2
                        )}{" "}
                    µEth
                  </span>
                  <span className="explain"></span>
                </span>
              )}
            </Col>
          </Row>
        </Col>
      </ChartRow>
      <CurveGraph
        web3={web3}
        curveData={curveData}
        initSaleInfoFetch={initSaleInfoFetch}
        maxTokens={maxTokens}
        zoomLevel={zoomLevel}
        zoomGraph={zoomGraph}
        STATIC_MAX_TOKENS={STATIC_MAX_TOKENS}
        ethPrice={ethPrice}
        showUSDCurrency={showUSDCurrency}
        convertTo={convertTo}
      ></CurveGraph>
    </Box>
  );
}

const ChartRow = styled(Row)`
  > div {
    @media screen and (max-width: 48em) {
      margin-bottom: 1rem;
    }
  }
`;

const Box = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: auto;
  padding: 0 1rem;
`;

const StyledColMargin10 = styled(Col)`
  margin: 0 1rem;
  @media screen and (max-width: 48em) {
    margin: 0;
  }
`;
