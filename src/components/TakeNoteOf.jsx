import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";

export default function TakeNoteOf() {
    return (
        <Box id="please-note" className="text-center">
            <h2>Things to take note of</h2>
            <Container>
                <Row xsNoflex>
                    <Col size={1} className="padding-0-1">
                        <ImageBox src="/calculator.svg" />
                        <div className="strong-500 font-21">
                            Estimation only
                        </div>
                        <p>
                            The amount indicated that you will receive is
                            estimated as accurately as we can and is dependent
                            on transaction time.
                        </p>
                    </Col>
                    <Col size={1} className="padding-0-1">
                        <ImageBox src="/money.svg" />
                        <div className="strong-500 font-21">
                            Always sellable
                        </div>
                        <p>
                            Funds go toward permanently locked liquidity, which
                            means, you can always sell your LEVR, but the amount
                            of ETH you regain might not be the same.
                        </p>
                    </Col>
                    <Col size={1} className="padding-0-1">
                        <ImageBox src="/fast-time.svg" />
                        <div className="strong-500 font-21">Don’t wait</div>
                        <p>
                            Since the cost raises with each transaction, the
                            faster you buy, the more LEVR you will get for the
                            ETH you spend!
                        </p>
                    </Col>
                </Row>
            </Container>
        </Box>
    );
}
const ImageBox = styled.div`
    height: 190px;
    width: 190px;
    margin: 0 auto 3rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #fff;
    background-repeat: no-repeat;
    bacground-size: contain;
    background-position: center;
    background-image: url(${(props) => props.src});
`;

const Box = styled.div`
    width: 100%;
    padding: 2rem 0;
    position: relative;
    background: #f5f5f5;
    margin-top: 3rem;
    h2 {
        margin-bottom: 3rem;
        @media screen and (max-width: 48em) {
            font-size: 2rem;
        }
    }
`;

const Container = styled.div`
    margin: auto;
    max-width: 1050px;
    p {
        @media screen and (max-width: 48em) {
            margin-bottom: 4rem;
        }
    }
`;
