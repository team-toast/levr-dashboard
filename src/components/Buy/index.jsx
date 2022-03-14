import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../../styles/flex-grid";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { setCookies, getCookie } from "cookies-next";

import CONTRACT_ABI from "./../../lib/abi_eth_token_sale.json";

import Web3 from "web3";

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
//import { useCallback } from "react/cjs/react.production.min";

export default function Buy({
    curveData,
    web3,
    web3Obj,
    walletAddress,
    setNewDataFunction,
    setShowConnectOptions,
    showUSDCurrency,
    ethPrice,
    depositEth,
    setDepositEth,
    convertTo,
}) {
    const { query } = useRouter();
    const [levrBalance, setLevrBalance] = useState(0);
    const [eTHbalance, setETHbalance] = useState(0);
    const [notEnoughBalance, setNotEnoughBalance] = useState(false);
    const [status, setStatus] = useState([]);
    const [statusBusy, setStatusBusy] = useState(false);
    const [confirmTerms, setConfirmTerms] = useState(false);
    const [confirmLoaction, setConfirmLoaction] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [referrer, setReferrer] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [etherAmountInput, setEtherAmountInput] = useState("0.000001");
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const listenForBuy = async () => {
        if (!subscription) {
            let new_contract = await new web3.eth.Contract(
                CONTRACT_ABI,
                process.env.ETH_CONTRACT_ADDRESS_Levr_Sale
            );
            new_contract.events
                .allEvents()
                .on("connected", function (subscriptionId) {
                    console.log(subscriptionId);
                    setSubscription(subscriptionId);
                })
                .on("data", function (event) {
                    setNewDataFunction(etherAmountInput);
                    console.log("BUY DETECTED! ", event);
                });
        }
    };

    const getLevrBalance = async (data) => {
        let new_contract;
        const rpcURL = process.env.ETH_RPC;
        const web3_rpc = new Web3(rpcURL);
        // try {
        if (web3_rpc !== undefined) {
            new_contract = new web3_rpc.eth.Contract(
                BALANCE_ABI,
                process.env.ETH_CONTRACT_ADDRESS_LEVR_ERC20
            );
        }
        const result = await new_contract.methods
            .balanceOf(walletAddress)
            .call();
        const format = web3?.utils?.fromWei(result.toString());
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
        return getWeiValue;
    };

    const getGasFees = async () => {
        let retrievedGasPrice = 0;
        const getretrievedGasPrice = await web3?.eth?.getGasPrice(function (
            e,
            r
        ) {
            retrievedGasPrice = r;
        });
        const getEstimateGas = await web3?.eth?.estimateGas(
            {
                from: walletAddress,
            },
            function (error, result) {
                if (error) {
                    alert(error);
                }
            }
        );
        const getWeiGasFee = await web3?.utils?.fromWei(
            (retrievedGasPrice * getEstimateGas).toString()
        );
        return getWeiGasFee * 2;
    };

    const addLevrTokenToMM = async () => {
        const tokenAddress = process.env.ETH_CONTRACT_ADDRESS_LEVR_ERC20;
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

    const depositEthToLEVR = async () => {
        setShowConfirmBox(false);
        const currentBalance = await getETHbalance(walletAddress);
        let purchaseReferrer = "0x0000000000000000000000000000000000000000";
        if (referrer) {
            purchaseReferrer = referrer;
        }
        console.log("currentBalance", currentBalance);
        if (parseFloat(currentBalance) >= parseFloat(depositEth)) {
            setStatusBusy(true);
            let new_contract = await new web3.eth.Contract(
                CONTRACT_ABI,
                process.env.ETH_CONTRACT_ADDRESS_Levr_Sale
            );
            setStatus([
                {
                    title: "Awaiting ...",
                },
            ]);

            const fundit = await new_contract.methods
                // Params
                // 1. Wallet who gets the LEVR
                // 2. Person who referred the purchase

                .buy(walletAddress, purchaseReferrer)
                .send(
                    {
                        from: walletAddress,
                        value: web3.utils.toWei(depositEth.toString(), "ether"),
                    },
                    (err, transactionHash) => {
                        setStatusBusy(true);
                        setStatus([
                            {
                                title: "Awaiting ...",
                            },
                            { title: "Pending transaction ..." },
                        ]);
                    }
                )
                .then((res) => {
                    console.log("Success");
                    getLevrBalance(walletAddress);
                    setStatusBusy(true);
                    setStatus([
                        {
                            title: "Awaiting ...",
                        },
                        { title: "Pending transaction" },
                        { title: "Transaction Complete." },
                    ]);
                })
                .catch((err) => {
                    console.log("err", err);
                    setStatusBusy(true);
                    setStatus([
                        { title: "Awaiting" },
                        { title: "Pending transaction" },
                        { title: "Transaction Complete." },
                        { title: "Unable to buy, please try again." },
                    ]);
                });
        } else {
            console.log("setNotEnoughBalance");
            setNotEnoughBalance(true);
        }
    };

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const enterEthValue = (value) => {
        setNewDataFunction(value);
    };

    const optimizedSaleInfoCall = useCallback(debounce(enterEthValue), []);

    const goToPleaseNote = () => {
        document.getElementById("please-note").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    };

    const addMaximumBalance = async () => {
        const getBalance = await getETHbalance(walletAddress);
        const getFees = await getGasFees();
        console.log(getBalance, getBalance == "0", getFees);
        if (getBalance == "0") {
            setDepositEth(getBalance);
            setNewDataFunction(getBalance);
        } else {
            const feesWithBlance = getBalance - parseFloat(getFees) * 2;
            setDepositEth(feesWithBlance < 0 ? "0" : feesWithBlance);
            setNewDataFunction(feesWithBlance < 0 ? "0" : feesWithBlance);
        }
    };

    useEffect(() => {
        if (walletAddress != null) {
            getLevrBalance(walletAddress);
            if (web3) {
                listenForBuy();
            }
        }

        let tmpWeb3 = new Web3();
        //console.log("Referrer: ", query.referrer);
        let referrerCookieValue = getCookie("referrer");
        if (referrerCookieValue) {
            //console.log("Referral cookie found: ", referrerCookieValue);
            setReferrer(referrerCookieValue);
        } else {
            if (tmpWeb3.utils.isAddress(query.referrer)) {
                setReferrer(query.referrer);
                //console.log("Setting referrer value");
                setCookies("referrer", query.referrer, {
                    maxAge: 2592000,
                });
            }
        }
    }, [web3, walletAddress]);

    return (
        <Box>
            {statusBusy && (
                <ConnectWalletOverlay className="status-overlay">
                    <div className="flex">
                        <div>
                            <Row
                                className={
                                    status.length === 1 ? "busy" : "done"
                                }
                            >
                                <Col size={1} className="text-right">
                                    {status.length === 1 ? (
                                        <span className="pending"></span>
                                    ) : (
                                        <span
                                            className={
                                                status.length <= 3
                                                    ? "success"
                                                    : "pending"
                                            }
                                        ></span>
                                    )}
                                </Col>
                                <Col hidexs size={1}>
                                    <h3>Approve </h3>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row
                                className={
                                    status.length === 2 ? "busy" : "done"
                                }
                            >
                                <Col size={1}>
                                    {status.length <= 2 ? (
                                        <span className="pending"></span>
                                    ) : (
                                        <span
                                            className={
                                                status.length <= 3
                                                    ? "success"
                                                    : "pending"
                                            }
                                        ></span>
                                    )}
                                </Col>
                                <Col hidexs size={1}>
                                    <h3>Pending </h3>
                                </Col>
                            </Row>
                        </div>
                        {status.length <= 3 && (
                            <div>
                                <h3>
                                    <Row
                                        className={
                                            status.length === 4
                                                ? "busy"
                                                : "done"
                                        }
                                    >
                                        <Col size={1}>
                                            {status.length === 3 ? (
                                                <span className="success"></span>
                                            ) : (
                                                <span
                                                    className={
                                                        status.length < 3
                                                            ? "pending"
                                                            : "pending"
                                                    }
                                                ></span>
                                            )}
                                        </Col>
                                        <Col hidexs size={1}>
                                            <h3>Success </h3>
                                        </Col>
                                    </Row>
                                </h3>
                            </div>
                        )}
                        {status.length === 4 && (
                            <div>
                                <Row
                                    className={
                                        status.length === 1 ? "busy" : "done"
                                    }
                                >
                                    <Col size={1}>
                                        {status.length === 4 ? (
                                            <span className="error"></span>
                                        ) : (
                                            <span className="pending"></span>
                                        )}
                                    </Col>
                                    <Col hidexs size={1}>
                                        <h3>Failed</h3>
                                    </Col>
                                </Row>
                            </div>
                        )}
                        {status.length >= 3 && (
                            <div className="text-right position-absolute-right">
                                <button
                                    className="close-button"
                                    onClick={() => {
                                        setStatusBusy(false);
                                        setStatus([]);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </ConnectWalletOverlay>
            )}
            {notEnoughBalance && (
                <ConnectWalletOverlay>
                    <div>
                        <h3>Not enough ETH in your wallet to buy </h3>
                        <div>
                            <h2>
                                <span className=" font-weight-bold text-green">
                                    {" "}
                                    {numberWithCommas(
                                        curveData.tokensReceived.toFixed(0)
                                    )}{" "}
                                    LEVR
                                </span>
                            </h2>
                            <br />
                            <br />
                            <button onClick={() => setNotEnoughBalance(false)}>
                                Close
                            </button>
                        </div>
                    </div>
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
                                {numberWithCommas(
                                    parseFloat(levrBalance).toFixed(0)
                                )}{" "}
                                LEVR
                            </h2>
                            <i>
                                Estimated value{" "}
                                {showUSDCurrency ? (
                                    <strong className="display-inline-block">
                                        {numberWithCommas(
                                            parseFloat(
                                                (
                                                    levrBalance *
                                                    (ethPrice *
                                                        convertTo(
                                                            curveData.priceBefore,
                                                            "ether"
                                                        ))
                                                ).toFixed(2)
                                            )
                                        )}{" "}
                                        USD
                                    </strong>
                                ) : (
                                    <strong className="display-inline-block">
                                        {numberWithCommas(
                                            parseFloat(
                                                (
                                                    levrBalance *
                                                    convertTo(
                                                        curveData.priceBefore,
                                                        showUSDCurrency
                                                            ? "ether"
                                                            : "microether"
                                                    )
                                                ).toFixed(2)
                                            )
                                        )}{" "}
                                        µEth
                                    </strong>
                                )}
                            </i>
                        </Col>
                    </Row>
                    <div className="text-center margin-top-2">
                        <button className="action" onClick={addLevrTokenToMM}>
                            List on my Metamask/Wallet
                        </button>
                    </div>
                    {walletAddress == null && (
                        <ConnectWalletOverlay className="top-0">
                            <button onClick={() => setShowConnectOptions(true)}>
                                Connect Wallet
                            </button>
                        </ConnectWalletOverlay>
                    )}
                </Col>
                {/* Buy */}
                <Col className="balance buy" size={1}>
                    <Inner>
                        <strong className="margin-bottom-1 display-block">
                            Buy LEVR
                        </strong>
                        <div className="flex position-relative">
                            <input
                                value={depositEth}
                                onChange={(event) => {
                                    const regExp =
                                        /^(\d+(\.\d{0,18})?|\.?\d{0,2})$/;
                                    const input = event.target.value;
                                    const tmp = input == "" ? "" : input;
                                    if (regExp.test(input)) {
                                        setDepositEth(tmp);
                                        optimizedSaleInfoCall(tmp);
                                    }
                                }}
                                type="text"
                                placeholder="Enter ETH amount"
                            />
                            {walletAddress != null && (
                                <button
                                    onClick={addMaximumBalance}
                                    title="Max"
                                    className="max-button"
                                >
                                    max*
                                </button>
                            )}
                            {walletAddress == null ? (
                                <button
                                    onClick={() => setShowConnectOptions(true)}
                                    className="b-r-0-10-10-0"
                                >
                                    Connect Wallet
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setShowConfirmBox(true);
                                    }}
                                    className={
                                        status.length === 2 &&
                                        status.length !== 0
                                            ? "b-r-0-10-10-0 inactive-button"
                                            : "b-r-0-10-10-0"
                                    }
                                >
                                    {status.length === 2 &&
                                    status.length !== 0 ? (
                                        <span>Busy ...</span>
                                    ) : (
                                        <span>Buy</span>
                                    )}
                                </button>
                            )}
                        </div>
                        <p className="font-14">
                            <i>
                                * Max amount in wallet minus the estimated gas
                                fees.
                            </i>
                        </p>
                        <p>
                            View{" "}
                            <Link href="/terms-and-conditions">
                                <a target="blank">Terms & Conditions</a>
                            </Link>
                        </p>
                        <div>
                            The current cost per token is{" "}
                            {showUSDCurrency ? (
                                <span className="font-weight-bold text-red">
                                    {(
                                        ethPrice *
                                        convertTo(
                                            curveData.priceBefore,
                                            "ether"
                                        )
                                    ).toFixed(4)}{" "}
                                    USD
                                </span>
                            ) : (
                                <span className="font-weight-bold text-red">
                                    {convertTo(
                                        curveData.priceBefore,
                                        "microether"
                                    ).toFixed(4)}{" "}
                                    µEth
                                </span>
                            )}
                        </div>
                        {convertTo(curveData.priceBefore, "ether").toFixed(
                            18
                        ) !==
                            convertTo(curveData.priceAfter, "ether").toFixed(
                                18
                            ) && (
                            <div>
                                You will raise the cost to{" "}
                                {showUSDCurrency ? (
                                    <span className=" font-weight-bold text-blue">
                                        {(
                                            ethPrice *
                                            convertTo(
                                                curveData.priceAfter,
                                                "ether"
                                            )
                                        ).toFixed(4)}{" "}
                                        USD
                                    </span>
                                ) : (
                                    <span className=" font-weight-bold text-blue">
                                        {convertTo(
                                            curveData.priceAfter,
                                            "microether"
                                        ).toFixed(4)}{" "}
                                        µEth
                                    </span>
                                )}
                                <br />
                                You will receive{" "}
                                <span className=" font-weight-bold text-green">
                                    {numberWithCommas(
                                        curveData.tokensReceived.toFixed(0)
                                    )}{" "}
                                    LEVR.
                                </span>
                                <br />
                                You will pay an average of{" "}
                                {showUSDCurrency ? (
                                    <span className=" font-weight-bold text-blue">
                                        {(
                                            ethPrice *
                                            convertTo(
                                                curveData.pricePaidPerToken,
                                                "ether"
                                            )
                                        ).toFixed(4)}{" "}
                                        USD
                                    </span>
                                ) : (
                                    <span className=" font-weight-bold text-blue">
                                        {convertTo(
                                            curveData.pricePaidPerToken,
                                            "microether"
                                        ).toFixed(4)}{" "}
                                        µEth
                                    </span>
                                )}
                            </div>
                        )}
                    </Inner>
                </Col>
            </BuyRow>

            <ConfirmAgree className={showConfirmBox ? "showbox" : "hidebox"}>
                <div className="inner-confirm">
                    <h2>Confirmation</h2>
                    <p className="strong-500">
                        You are about to push{" "}
                        <span className="text-green">{depositEth} ETH</span> to
                        get{" "}
                        <span className="text-blue">
                            {numberWithCommas(
                                curveData.tokensReceived.toFixed(0)
                            )}{" "}
                            LEVR
                        </span>
                        .*
                    </p>
                    <p>
                        <ItalicSmall>
                            *Depending on timing, someone else could front run
                            you and you’ll get less LEVR.
                        </ItalicSmall>
                    </p>
                    <p>
                        <br />
                        <strong>Please indicate that you agree:</strong>
                    </p>
                    <p>
                        <input
                            type="checkbox"
                            value={confirmTerms}
                            onChange={() => setConfirmTerms(!confirmTerms)}
                            name="confirmTerms"
                            id="confirmTerms"
                        />{" "}
                        <label htmlFor="confirmTerms">
                            {" "}
                            to our{" "}
                            <Link href="/terms-and-conditions">
                                <a target="blank">Terms & Conditions</a>
                            </Link>
                        </label>
                    </p>
                    <p>
                        <input
                            type="checkbox"
                            value={confirmLoaction}
                            name="confirmLoaction"
                            id="confirmLoaction"
                            onChange={() =>
                                setConfirmLoaction(!confirmLoaction)
                            }
                        />{" "}
                        <label htmlFor="confirmLoaction">
                            {" "}
                            that you are not a citizen of the USA or a country
                            they have sanctions with.
                        </label>
                    </p>
                    <p>
                        <br />
                        <button
                            onClick={depositEthToLEVR}
                            className={
                                confirmLoaction && confirmTerms
                                    ? "button action"
                                    : "button action disabled-button"
                            }
                        >
                            Confirm and Purchase
                        </button>
                    </p>
                    <p>
                        <button
                            onClick={() => setShowConfirmBox(false)}
                            className="button blue-button"
                        >
                            Cancel
                        </button>
                    </p>
                </div>
            </ConfirmAgree>
            <PleaseNote>
                <span onClick={goToPleaseNote}>Please note</span>
            </PleaseNote>
        </Box>
    );
}

const PleaseNote = styled.div`
    margin-top: 3rem;
    font-weight: 500;
    text-align: center;
    span {
        padding-right: 1.25rem;
        cursor: pointer;
        background: url(/down-arrow.svg) no-repeat right;
        background-size: 1rem;
    }
`;

const ItalicSmall = styled.i`
    font-size: 14px;
`;

const blink = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ConnectWalletOverlay = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 75%;
    width: 100%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    &.top-0 {
        height: 100%;
    }
    &.status-overlay {
        position: fixed;
        bottom: initial;
        text-align: left;
        top: 72px;
        width: 100%;
        background: rgba(255, 255, 255, 0.9);
        height: 72px;
        border-bottom: solid 4px #06033d;
        > div {
            width: 100%;
            max-width: 1240px;
            margin: auto;
        }
        > .flex > * {
            flex: 1;
        }
    }
    .success,
    .pending,
    .error {
        height: 30px;
        width: 30px;
        background: #ccc;
        border-radius: 100%;
        display: block;
        left: 100%;
        position: relative;
        margin-left: -40px;
    }
    .error {
        background: #e02235;
    }
    .success {
        background: #1ae287;
    }
    .busy {
        .pending {
            animation: 1s ${blink} infinite;
            background: #06033d;
        }
    }
    .position-absolute-right {
        position: absolute;
        right: 0;
        top: 1rem;
        @media screen and (max-width: 48em) {
            position: relative;
            right: 0;
            top: 0;
        }
    }
`;

const ConfirmAgree = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(6, 3, 61, 0.3);
    backdrop-filter: blur(5px);
    z-index: 3;
    .inner-confirm {
        text-align: center;
        border-radius: 10px;
        padding: 2rem 2rem;
        background: #fff;
        width: 100%;
        max-width: 820px;
        height: 100%;
        max-height: 590px;
        overflow: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        @media screen and (max-width: 48em) {
            max-height: 100vh;
            border-radius: 0;
        }
    }
    visibility: hidden;
    opacity: 0;
    transition: all 0.15s ease;
    &.showbox {
        opacity: 1;
        visibility: visible;
        transition: all 0.15s ease;
    }
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
        position: relative;
        &.buy {
            padding: 0 2rem;
            background: #fff;
            button {
                width: 150px;
                min-width: auto;
            }
            button.max-button {
                position: absolute;
                left: calc(100% - 197px);
                width: initial;
                height: 1.7rem;
                line-height: 1.7rem;
                top: 8px;
                padding: 0 7px;
                background: none;
                box-shadow: inset 0 0 0 1px #dddddd;
                color: #777;
                &:hover {
                    color: #ffffff;
                    background: #06033d;
                    box-shadow: none;
                    transition: all 0.25s ease;
                }
                @media screen and (max-width: 48em) {
                    left: calc(100% - 169px);
                }
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
