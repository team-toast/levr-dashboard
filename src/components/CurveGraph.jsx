import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Chart } from "chart.js";

import { colors, sizes } from "./../styles/styleguide";

export default function CurveGraph() {
  const data = {
    labels: ["1", "2", "1", "2", "1", "1", "2"],
    datasets: [
      {
        label: "1",
        data: [10, 20, 30, null, null, null],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "2",
        data: [null, null, null, 40, 50, 60],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    // <ChartBox>
    //   <Line data={data} height={120} />
    // </ChartBox>
    <CurveBox>
      <Row>
        <Col className="margin-b-4" size={"0 0 auto"}>
          <PriceStrong>Price (nETH)</PriceStrong>
        </Col>
        <Col className="margin-b-4" size={"0 0 auto"}>
          <ColRow>
            <Col size={1}>1</Col>
            <Col size={1}>0.7</Col>
            <Col size={1}>0.5</Col>
            <Col size={"0 0 auto"}>0</Col>
          </ColRow>
        </Col>
        <Col size={1}>
          <LineCurve>
            <Curve>
              <Raised>
                <Text className="right">LEVR Raised</Text>
              </Raised>
              <NewPrice></NewPrice>
              <Available>
                <Text>LEVR Available</Text>
              </Available>
            </Curve>
          </LineCurve>
          <Supply>
            <Row>
              <Col size={1}>100M</Col>
              <Col size={1}>250M</Col>
              <Col size={1}>500M</Col>
              <Col size={1}>750M</Col>
              <Col size={"0 0 auto"}>1B</Col>
            </Row>
            <br />
            <h3 className="text-center">Token Supply</h3>
          </Supply>
        </Col>
      </Row>
    </CurveBox>
  );
}

const PriceStrong = styled.strong`
  transform: rotate(-91deg) translateY(-50%);
  display: block;
  top: 50%;
  position: relative;
`;

const ColRow = styled(Row)`
  -webkit-flex-direction: column;
  flex-direction: column;
  float: left;
  height: 100%;
  padding: 2rem 0.5rem;
`;

const CurveBox = styled.div`
  width: 100%;
`;

const Supply = styled.div``;

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
  min-width: 120px;
  background: rgba(255, 179, 0, 0.6);
  background: linear-gradient(
    90deg,
    rgba(255, 179, 0, 0.6) 0%,
    rgba(224, 34, 53, 0.6) 100%
  );
  flex: 1;
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
