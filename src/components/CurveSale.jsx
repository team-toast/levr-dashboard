import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";

export default function CurveSale() {
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
              size={"0 0 120px"}
            >
              17 ETH
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
              size={"0 0 120px"}
            >
              505M LEVR
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
              size={"0 0 120px"}
            >
              0,62 nETH
            </Col>
          </Row>
        </Col>
      </Row>
      <Curve></Curve>
      <div>
        <h3 className="text-center">Token Supply</h3>
      </div>
    </Box>
  );
}

const Curve = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  height: 480px;
  width: 100%;
  max-width: 1000px;
  margin: 2rem 0;
`;

const Box = styled.div`
  width: 100%;
  margin: auto;
  padding: 0 1rem;
`;

const StyledColMargin10 = styled(Col)`
  margin: 0 1rem;
`;
