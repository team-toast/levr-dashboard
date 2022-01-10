import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";

import CurveGraph from "./../components/CurveGraph";

export default function CurveSale({ curveData, web3 }) {
  return (
    <Box>
      <h1 className="text-center">LEVR Curve Sale</h1>
      <Row className="font-family-HandelGotDBol">
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
              size={"0 0 160px"}
            >
              {curveData.raised === 1000 ? "0" : curveData.raised - 1000} ETH
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
              size={"0 0 160px"}
            >
              {curveData.tokensIssued} LEVR
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
              size={"0 0 160px"}
            >
              {curveData.price.toFixed(5)} nETH
            </Col>
          </Row>
        </Col>
      </Row>
      <CurveGraph web3={web3} curveData={curveData}></CurveGraph>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  margin: auto;
  padding: 0 1rem;
`;

const StyledColMargin10 = styled(Col)`
  margin: 0 1rem;
`;
