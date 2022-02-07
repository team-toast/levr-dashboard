import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Chart } from "chart.js";

import { colors, sizes } from "./../styles/styleguide";

export default function CurveGraph({
  curveData,
  initSaleInfoFetch,
  maxTokens,
  zoomLevel,
  zoomGraph,
  STATIC_MAX_TOKENS,
  showUSDCurrency,
  ethPrice,
  convertTo,
}) {
  let fit_in =
    STATIC_MAX_TOKENS /
    (curveData.totalTokensSoldBefore + curveData.tokensReceived);
  if (fit_in == "Infinity") {
    fit_in = 1;
  }
  let steps_to_use =
    convertTo(
      curveData.priceBefore,
      showUSDCurrency ? "ether" : "microether"
    ) !==
    convertTo(curveData.priceAfter, showUSDCurrency ? "ether" : "microether")
      ? parseFloat(
          curveData.tokensReceived /
            (STATIC_MAX_TOKENS -
              (curveData.totalTokensSoldBefore + curveData.tokensReceived))
        ).toFixed(4) * fit_in
      : parseFloat(curveData.totalTokensSoldBefore / STATIC_MAX_TOKENS).toFixed(
          4
        ) * fit_in;
  let bottomPosition =
    parseFloat(
      (curveData.totalTokensSoldBefore + curveData.tokensReceived) /
        (maxTokens / zoomLevel)
    ) * 100;
  if (bottomPosition < 15) {
    // bottomPosition = 15;
  } else if (bottomPosition >= 99) {
    bottomPosition = 99;
  }
  return (
    <CurveBox>
      <Row>
        <Col className="margin-b-4 hide-xs" size={"0 0 auto"}>
          {showUSDCurrency ? (
            <PriceStrong>Price (USD)</PriceStrong>
          ) : (
            <PriceStrong>Price (µEth)</PriceStrong>
          )}
        </Col>
        {/* Y AXIS PRICING */}
        <Col className="margin-b-4" size={"0 0 auto"}>
          <ColRow>
            <Col size={1}>
              {showUSDCurrency ? (
                <span className={bottomPosition > 90 ? "opacity-0" : ""}>
                  {(
                    (ethPrice * convertTo(curveData.maxPrice, "ether")) /
                    zoomLevel
                  ).toFixed(4)}
                </span>
              ) : (
                <span className={bottomPosition > 90 ? "opacity-0" : ""}>
                  {(
                    convertTo(curveData.maxPrice, "microether") / zoomLevel
                  ).toFixed(2)}
                </span>
              )}
            </Col>
            <ColPositionAbsolute
              className={
                initSaleInfoFetch
                  ? "newprice hide-this-price"
                  : "newprice show-this-price"
              }
              bottom={bottomPosition}
            >
              {showUSDCurrency ? (
                <span>
                  {(
                    ethPrice * convertTo(curveData.priceAfter, "ether")
                  ).toFixed(4)}
                </span>
              ) : (
                <span>
                  {convertTo(curveData.priceAfter, "microether").toFixed(2)}
                </span>
              )}
            </ColPositionAbsolute>
            <ColPositionAbsolute
              className="currentprice"
              bottom={
                parseFloat(
                  curveData.totalTokensSoldBefore / (maxTokens / zoomLevel)
                ) * 100
              }
            >
              {showUSDCurrency ? (
                <span>
                  {(
                    ethPrice * convertTo(curveData.priceBefore, "ether")
                  ).toFixed(4)}
                </span>
              ) : (
                <span>
                  {convertTo(curveData.priceBefore, "microether").toFixed(2)}
                </span>
              )}
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
                    parseFloat(
                      curveData.totalTokensSoldBefore / (maxTokens / zoomLevel)
                    ) * 100
                  }
                >
                  <Text className="right">LEVR Raised</Text>
                </Raised>
                <NewPrice
                  difference={
                    parseFloat(
                      curveData.tokensReceived / (maxTokens / zoomLevel)
                    ) * 100
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
              <Col size={1}>{(0 / zoomLevel).toFixed()}M</Col>
              <Col size={1}>{(400 / 4 / zoomLevel).toFixed()}M</Col>
              <Col size={1}>{(((400 / 4) * 2) / zoomLevel).toFixed()}M</Col>
              <Col size={1}>{(((400 / 4) * 3) / zoomLevel).toFixed()}M</Col>
              <Col size={"0 0 auto"}>
                {(400 / zoomLevel).toFixed()}M {zoomLevel == 1 ? "" : " ..."}
              </Col>
            </Row>
          </Supply>
        </Col>
        <Col className="text-center hide-xs">
          <RangeSliderBox
            className={steps_to_use * 2 >= 2 ? "disable-zoom" : ""}
          >
            <RangeSlider
              onChange={(value) => zoomGraph(value.target.value)}
              type="range"
              min="1"
              max={fit_in}
              value={zoomLevel}
              step={steps_to_use}
            />
            <span>
              Graph
              <br />
              Zoom
            </span>
          </RangeSliderBox>
        </Col>
      </Row>
      <br />
      <h3 className="text-center">Token Supply</h3>
      <Row hidesm hidemd hidelg showxs>
        <Col size={1}>
          <RangeSliderBox className="mobile-zoom">
            <RangeSlider
              className="mobile-zoom__input"
              onChange={(value) => zoomGraph(value.target.value)}
              type="range"
              min="1"
              max={fit_in}
              value={zoomLevel}
              step={steps_to_use}
            />
            <span>Graph Zoom</span>
          </RangeSliderBox>
        </Col>
      </Row>
    </CurveBox>
  );
}

const RangeSliderBox = styled.div`
  top: 3rem;
  position: relative;
  height: 450px;
  width: 100px;
  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &.disable-zoom {
    opacity: 0.3;
    cursor: disabled;
    input {
      cursor: not-allowed;
      filter: grayscale(1);
    }
  }
  &.mobile-zoom {
    height: initial;
    width: 100%;
    display: block;
    top: 0;
    margin-top: 1rem;
    & > * {
      flex: 1;
    }
    span {
      display: block;
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      position: relative;
      left: initial;
      transform: initial;
    }
  }
`;

const RangeSlider = styled.input`
  -webkit-appearance: none;
  width: 366px;
  background: #f5f5f5;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  //   appearance: slider-vertical;
  height: 16px;
  transform: rotate(-90deg) translateY(-50%);
  top: 42%;
  position: absolute;
  left: 0;
  margin-left: -126px;
  border-radius: 8px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #1ae287;
    cursor: pointer;
    top: -13px;
    box-shadow: 1px 2px 2px #0000001a;
    border-radius: 2px;
    height: 33px;
    width: 16px;
  }

  &::-moz-range-thumb {
    position: relative;
    left: -12px;
    width: 25px;
    height: 25px;
    background: black;
    cursor: pointer;
    border: none;
  }
  &.mobile-zoom__input {
    top: 0;
    left: 0;
    margin: auto;
    position: relative;
    transform: initial;
    width: 100%;
  }
`;

const ColPositionAbsolute = styled(Col)`
  position: absolute;
  bottom: ${(props) => props.bottom}%;
  transition: all 0.25s ease;
  right: 8px;
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
  width: 100px;
`;

const ColRow = styled(Row)`
  position: relative;
  text-align: right;
  -webkit-flex-direction: column;
  flex-direction: column;
  float: left;
  height: 100%;
  padding: 0rem 0.5rem 0;
  top: 2rem;
  @media screen and (max-width: 48em) {
    padding-left: 0;
  }
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
  @media screen and (max-width: 48em) {
    height: 280px;
  }
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
