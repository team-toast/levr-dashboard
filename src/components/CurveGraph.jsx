import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Chart } from "chart.js";

import { colors, sizes } from "./../styles/styleguide";

export default function CurveGraph({ curveData, initSaleInfoFetch }) {
  let bottomPosition =
    parseFloat(
      (curveData.totalTokensSoldBefore + curveData.tokensReceived) / 100000000
    ) * 100;
  if (bottomPosition < 15) {
    bottomPosition = 15;
  } else if (bottomPosition > 92.8) {
    bottomPosition = 92.8;
  }
  return (
    <CurveBox>
      <Row>
        <Col className="margin-b-4 hide-xs" size={"0 0 auto"}>
          <PriceStrong>Price (nETH)</PriceStrong>
        </Col>
        {/* Y AXIS PRICING */}
        <Col className="margin-b-4" size={"0 0 auto"}>
          <ColRow>
            <Col size={1}>
              <span className="opacity-0">{curveData.maxPrice.toFixed(6)}</span>
            </Col>
            <ColPositionAbsolute
              className={
                initSaleInfoFetch
                  ? "newprice hide-this-price"
                  : "newprice show-this-price"
              }
              bottom={bottomPosition < 15 ? 15 : bottomPosition}
            >
              {curveData.priceAfter.toFixed(6)}
            </ColPositionAbsolute>
            <ColPositionAbsolute
              className="currentprice"
              bottom={
                parseFloat(curveData.totalTokensSoldBefore / 100000000) * 100
              }
            >
              {curveData.priceBefore.toFixed(6)}
            </ColPositionAbsolute>
            {/* <Col size={1}>{((curveData.maxPrice / 5) * 4).toFixed(6)}</Col> */}
            {/* <Col size={1}>{((curveData.maxPrice / 5) * 3).toFixed(6)}</Col>
            <Col size={1}>{((curveData.maxPrice / 5) * 2).toFixed(6)}</Col>
            <Col size={1}>{((curveData.maxPrice / 5) * 1).toFixed(6)}</Col> */}
            <Col size={"0 0 auto"}>0</Col>
          </ColRow>
        </Col>
        <Col size={1}>
          {/* X AXIS TOKENS RAISED */}
          <LineCurve>
            <InnerCurve>
              <Curve>
                <Raised
                  raisedlevr={
                    parseFloat(curveData.totalTokensSoldBefore / 100000000) *
                    100
                  }
                >
                  <Text className="right">LEVR Raised</Text>
                </Raised>
                <NewPrice
                  difference={
                    parseFloat(curveData.tokensReceived / 100000000) * 100
                  }
                ></NewPrice>
                <Available>
                  <Text>LEVR Available</Text>
                </Available>
              </Curve>
            </InnerCurve>
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

const ColPositionAbsolute = styled(Col)`
  position: absolute;
  bottom: ${(props) => props.bottom}%;
  transition: all 0.25s ease;
  &.hide-this-price {
    opacity: 0;
    bottom: 0;
  }
  &.show-this-price {
    bottom: ${(props) => props.bottom}%;
    opacity: 1;
  }
  &.newprice {
    color: #133be3;
    box-shadow: 0 0 10px 6px #fff;
    background: rgba(255, 255, 255, 0.7);
    z-index: 2;
  }
  &.newprice::before {
    content: "New Price";
    border-bottom: dashed 1px #133be3;
    width: 85px;
    display: block;
    left: 116%;
    position: absolute;
    bottom: 5px;
    z-index: 1;
    color: #133be3;
    line-height: 19px;
    font-size: 14px;
    background: rgba(245, 245, 245, 0.7);
  }
  &.currentprice::after {
    content: "Current Price";
    border-bottom: dashed 1px #e02235;
    width: 85px;
    display: block;
    left: 116%;
    position: absolute;
    bottom: 5px;
    z-index: 1;
    color: #e02235;
    line-height: 19px;
    font-size: 14px;
  }
`;

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
  position: relative;
  text-align: right;
  -webkit-flex-direction: column;
  flex-direction: column;
  float: left;
  height: 100%;
  padding: 1.3rem 0.5rem 0;
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
  margin: 2rem auto 0.5rem;
  overflow: hidden;
  position: relative;
`;

const InnerCurve = styled.div`
  background: #0b0581;
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
  position: relative;
  height: 100%;
`;

const Curve = styled.div`
  background: #ffffff;
  position: absolute;
  top: 5px;
  left: 5px;
  right: 0;
  bottom: 0;
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
    right: 1rem;
  }
`;

const Raised = styled.div`
  position: relative;
  min-width: 0;
  flex: 1;
  flex: 0 0 ${(props) => props.raisedlevr}%;
  transition: all 0.25s ease;
  background: rgba(255, 179, 0, 0.6);
  background: linear-gradient(
    90deg,
    rgba(255, 179, 0, 0.6) 0%,
    rgba(224, 34, 53, 0.6) 100%
  );
`;

const NewPrice = styled.div`
  background: #b68cf4;
  flex: 0 0 ${(props) => props.difference}%;
  transition: all 0.25s ease;
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
