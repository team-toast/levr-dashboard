import Layout from "../components/Layout";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Web3 from "web3";

export default function GenerateReferral({}) {
    const [referrerAddress, setRefererAddress] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [referralLink, setReferralLink] = useState(null);
    const [buttonText, setButtonText] = useState("Generate Referral Link");

    useEffect(() => {
        let tmpWeb3 = new Web3();
        setWeb3(tmpWeb3);
    }, []);

    const copiedTimer = () => {
        setButtonText("Copied to Clipboard!");
        setTimeout(() => {
            setButtonText("Generate Referral Link");
        }, 5000);
    };

    const handleAddressInput = (value) => {
        console.log(web3.utils.isAddress(value.toString()));
        setRefererAddress(value);
    };

    const handleReferralGenerate = () => {
        if (
            referrerAddress &&
            web3.utils.isAddress(referrerAddress.toString())
        ) {
            let refAddr =
                "https://community.levr.ly/?referer=" + referrerAddress;
            // "http://localhost:3000/?referer=" + referrerAddress;
            setReferralLink(refAddr);
            copiedTimer();
            copy(refAddr);
        } else {
            setReferralLink("Invalid Address");
        }
    };

    const copy = async (text) => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <Layout>
            <Header noWeb3={true} />
            <ReferralArea>
                <h1>Generate Referral Link</h1>
                <p>Get a 12.5% LEVR bonus if someone uses your link.</p>
                <input
                    // value={referrerAddress}
                    onChange={(event) => {
                        handleAddressInput(event.target.value);
                    }}
                    type="text"
                    placeholder="Enter your wallet address"
                />

                <button
                    onClick={() => {
                        handleReferralGenerate();
                    }}
                >
                    {buttonText}
                </button>
                <p className="small">{referralLink}</p>
                {referralLink && referralLink !== "Invalid Address" && (
                    <div>
                        <p>
                            Copied {"  "} <img src="copied.svg" />
                        </p>
                    </div>
                )}
            </ReferralArea>
        </Layout>
    );
}

const ReferralArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width: 100%;

    button,
    .button {
        width: 10px;
        margin-top: 10px;
    }

    p.small {
        font-size: 15px;
    }
`;
