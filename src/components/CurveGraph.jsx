import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Chart } from "chart.js";

import { colors, sizes } from "./../styles/styleguide";

export default function CurveGraph({ web3, curveData }) {
  const formatDecimals = (data) => {
    console.log(12, data);
    return data;
    // return data.slice(0, data.length - 13);
  };
  return (
    <CurveBox>
      <Row>
        <Col className="margin-b-4" size={"0 0 auto"}>
          <PriceStrong>Price (nETH)</PriceStrong>
        </Col>
        <Col className="margin-b-4" size={"0 0 auto"}>
          <ColRow>
            <Col size={1}>{curveData.price.toFixed(5)}</Col>
            <Col size={1}>{((curveData.price / 4) * 3).toFixed(5)}</Col>
            <Col size={1}>{((curveData.price / 4) * 2).toFixed(5)}</Col>
            <Col size={1}>{((curveData.price / 4) * 1).toFixed(5)}</Col>
            <Col size={"0 0 auto"}>0</Col>
          </ColRow>
        </Col>
        <Col size={1}>
          <LineCurve>
            <Curve>
              <Raised raisedlevr={curveData.curvePercentage.toFixed()}>
                <Text className="right">LEVR Raised</Text>
              </Raised>
              {/* <NewPrice></NewPrice> */}
              <Available>
                <Text>LEVR Available</Text>
              </Available>
            </Curve>
            {/* <GrowthLine></GrowthLine> */}
            {/* <NewPriceIndicator
              newprice="123"
              oldprice="456"
            ></NewPriceIndicator> */}
          </LineCurve>
          <Supply>
            <Row>
              <Col size={1}>10M</Col>
              <Col size={1}>25M</Col>
              <Col size={1}>50M</Col>
              <Col size={1}>75M</Col>
              <Col size={"0 0 auto"}>100M</Col>
            </Row>
            <br />
            <h3 className="text-center">Token Supply</h3>
          </Supply>
        </Col>
      </Row>
    </CurveBox>
  );
}

const NewPriceIndicator = styled.div`
  position: absolute;
  height: 10px;
  width: 50%;
  background: none;
  border-top: dashed 1px #133be3;
  border-bottom: dashed 1px #e02235;
  top: 50%;
  left: 0;
  &:before {
    content: "New Price 123";
    color: #133be3;
    position: absolute;
    width: 100%;
    height: 20px;
    top: -26px;
    left: 0;
    padding-left: 25%;
  }
  &:after {
    content: "Old Price 456";
    color: #e02235;
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: -26px;
    left: 0;
    padding-left: 25%;
  }
`;

const GrowthLine = styled.div`
  height: 5px;
  width: 120%;
  background: #0b0581;
  position: absolute;
  left: -66px;
  top: 47%;
  transform: rotate(-27.6deg) translateY(-50%);
`;

const PriceStrong = styled.strong`
  transform: rotate(-91deg) translateY(-50%);
  display: block;
  top: 50%;
  position: relative;
`;

const ColRow = styled(Row)`
  text-align: right;
  -webkit-flex-direction: column;
  flex-direction: column;
  float: left;
  height: 100%;
  padding: 2rem 0.5rem;
`;

const CurveBox = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: auto;
`;

const Supply = styled.div`
  width: 100%;
  max-width: 1050px;
  margin: auto;
`;

const ChartBox = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  height: 480px;
  width: 100%;
  max-width: 1050px;
  margin: 2rem auto;
  position: relative;
`;

const LineCurve = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  height: 480px;
  width: 100%;
  max-width: 1050px;
  margin: 2rem auto;
  overflow: hidden;
  position: relative;
`;

const Curve = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
`;

const Text = styled.div`
  text-align: center;
  position: absolute;
  bottom: 3rem;
  width: 100%;
  color: #ffffff;
  font-weight: 500;
  &.right {
    width: inherit;
    right: 4rem;
  }
`;

const Raised = styled.div`
  position: relative;
  min-width: 0;
  flex: 1;
  flex: 0 0 ${(props) => props.raisedlevr}%;
  background: rgba(255, 179, 0, 0.6);
  background: linear-gradient(
    90deg,
    rgba(255, 179, 0, 0.6) 0%,
    rgba(224, 34, 53, 0.6) 100%
  );
`;

const NewPrice = styled.div`
  background: #b68cf4;
  flex: 0 0 20px;
  border-left: dashed 1px #e02235;
  border-right: dashed 1px #133be3;
`;

const Available = styled.div`
  position: relative;
  min-width: 120px;
  background: rgba(54, 169, 255, 0.6);
  background: linear-gradient(
    90deg,
    rgba(54, 169, 255, 0.6) 0%,
    rgba(26, 226, 135, 0.6) 100%
  );
  flex: 1;
`;
