import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";

export default function Header({
  wallet,
  setWallet,
  web3Detect,
  walletAddress,
  shortenAddress,
  showConnectOptions,
  setShowConnectOptions,
  showDisconnectWallet,
  setShowDisconnectWallet,
  disconnectWalletConnect,
}) {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  return (
    <StyledHeader>
      <Row>
        <ColLogo>
          <StyledImg className="hide-xs" src="/logo.svg" alt="LEVR LOGO" />
          <StyledImg
            className="visible-xs"
            src="/logo%202.svg"
            alt="LEVR LOGO"
          />
        </ColLogo>
        <Col
          className={
            toggleMobileMenu ? "menu-item show-menu-item" : "menu-item"
          }
          size={1}
        >
          <Row>
            <Col size={1}>
              <Link href="/">
                <a className="menu-item-links">Home</a>
              </Link>
            </Col>
            <Col size={"0 0 auto"} className="text-right">
              <SocialCol
                className={
                  toggleMobileMenu ? "menu-item show-menu-item" : "menu-item"
                }
                size={`0 0 auto`}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/levr_ly"
                  title="twitter"
                >
                  <img src="/Icon feather-twitter.svg" height="21" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://medium.com/levr-ly"
                  title="Medium"
                >
                  <img src="/Icon awesome-medium-m.svg" height="21" />
                </a>
                <a
                  target="_blank"
                  href="https://t.me/levrly"
                  rel="noreferrer"
                  title="Telegram"
                >
                  <img src="/Icon awesome-telegram-plane.svg" height="21" />
                </a>
              </SocialCol>
            </Col>
          </Row>
        </Col>
        <StyledConnectCol size={`0 0 auto`}>
          {walletAddress ? (
            // <ConnectedDiv title={walletAddress}>
            //   <EllipsisSpan onClick={disconnectWalletConnect}>
            //     {shortenAddress(walletAddress)}
            //   </EllipsisSpan>
            // </ConnectedDiv>
            <div>
              <button
                className="action white ellipse"
                onClick={disconnectWalletConnect}
              >
                @{shortenAddress(walletAddress)}
              </button>
            </div>
          ) : (
            <div>
              <button
                className="action white"
                onClick={() => setShowConnectOptions(true)}
              >
                Connect Wallet
              </button>
              <StyledWalletOptions
                className={showConnectOptions ? "" : "hidden"}
              >
                {web3Detect && (
                  <div>
                    <button
                      className="metamask"
                      onClick={() => setWallet("metamask")}
                    >
                      MetaMask
                    </button>
                  </div>
                )}
                <div>
                  <button
                    className="walletconnect"
                    onClick={() => setWallet("walletconnect")}
                  >
                    WalletConnect
                  </button>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setShowConnectOptions(false)}
                >
                  X
                </button>
              </StyledWalletOptions>
            </div>
          )}
        </StyledConnectCol>
        <MobileMenuCol size={1}>
          <StyledHamburgerMenu
            toggleMobileMenu={toggleMobileMenu}
            onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </StyledHamburgerMenu>
        </MobileMenuCol>
      </Row>
    </StyledHeader>
  );
}

const StyledHamburgerMenu = styled.div`
  position: relative;
  margin: auto;
  height: 3.5em;
  width: 3.5em;
  background: none;
  cursor: pointer;
  span {
    display: block;
    height: 2px;
    width: 35px;
    border-radius: 3px;
    background: #fff;
    position: absolute;
    left: 10px;
    top: 10px;
    transition: all 0.25s ease;
    &:nth-child(1) {
      transform: ${(props) =>
        props.toggleMobileMenu ? "rotateZ(45deg)" : "initial"};
      top: ${(props) => (props.toggleMobileMenu ? "25px" : "15px")};
    }
    &:nth-child(2) {
      top: 27px;
      display: ${(props) => (props.toggleMobileMenu ? "none" : "block")};
    }
    &:nth-child(3) {
      top: ${(props) => (props.toggleMobileMenu ? "25px" : "39px")};
      transform: ${(props) =>
        props.toggleMobileMenu ? "rotateZ(135deg)" : "initial"};
    }
  }
  @media screen and (min-width: 40em) {
    display: none;
  }
`;

const MobileMenuCol = styled(Col)`
  @media screen and (min-width: 40rem) {
    display: none;
  }
`;

const StyledWalletOptions = styled.div`
  background: #2e2942;
  position: absolute;
  top: 6px;
  right: 3px;
  padding: 0.5rem 0 0;
  border-radius: 23px;
  min-width: 14.625em;
  text-align: center;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  button {
    margin-bottom: 0.5rem;
    text-align: left;
    padding-left: 3rem;
    color: #06033d;
    &.metamask {
      background: #fff url(/metamask.png) no-repeat;
      background-size: 20px;
      background-position: 17px;
      &:hover {
        background-color: #db596d;
      }
    }
    &.walletconnect {
      background: #fff url(/walletConnect.svg) no-repeat;
      background-size: 20px;
      background-position: 17px;
      color: #06033d;
      &:hover {
        background-color: #db596d;
      }
    }
  }
  .close-btn {
    position: absolute;
    left: -25px;
    bottom: -28px;
    min-width: initial;
    padding: 0 1rem;
  }
  &.hidden {
    display: none;
  }
  @media screen and (max-width: 40rem) {
    right: initial;
    left: 50%;
    transform: translateX(-50%);
    button {
      min-width: 92%;
    }
  }
`;

const EllipsisSpan = styled.span`
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  font-size: 0.9em;
  line-height: 3em;
  padding: 0 4em 0 1em;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 75em) {
    max-width: 250px;
  }
`;

const DisconnectWallet = styled.div`
  background: #2e2942;
  position: absolute;
  top: 6px;
  right: 3px;
  padding: 0.5rem 0 0;
  border-radius: 23px;
  min-width: 14.625em;
  text-align: center;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  z-index: 1;
  button {
    margin-bottom: 0.5rem;
    text-align: center;
    padding-left: 0;
    &.metamask {
      background: #fff url(/metamask.png) no-repeat;
      background-size: 20px;
      background-position: 17px;
      &:hover {
        background-color: #db596d;
      }
    }
    &.walletconnect {
      background: #fff url(/walletConnect.svg) no-repeat;
      background-size: 20px;
      background-position: 17px;
      &:hover {
        background-color: #db596d;
      }
    }
  }
  .close-btn {
    position: absolute;
    left: -25px;
    bottom: -28px;
    min-width: initial;
    padding: 0 1rem;
  }
  &.hidden {
    display: none;
  }
`;

const blink = keyframes`
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

const StyledOnIcon = styled.span`
  width: 0.8em;
  height: 0.8em;
  background: #00c762;
  border-radius: 100%;
  display: inline-block;
  margin-right: 0.4em;
  top: 0;
  position: relative;
  animation: 1s ${blink} infinite;
`;

const ConnectedDiv = styled.div`
  overflow: hidden;
  display: block;
  border: none;
  box-shadow: inset 0 0 0 1px #fff;
  border-radius: 25px;
  background: none;
  color: #fff;
  text-transform: capitalize;
`;

const StyledConnectCol = styled(Col)`
  text-align: right;
  @media screen and (max-width: 40rem) {
    button {
      min-width: 13em;
    }
  }
`;

const StyledSpan = styled.span`
  color: #5987db;
  display: block;
  text-align: center;
`;

const StyledImg = styled.img`
  height: 3em;
  position: relative;
  top: 4px;
  max-width: 14rem;
`;

const StyledHeader = styled.header`
  width: 100%;
  border-bottom: none;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background: #06033d;
  z-index: 3;
  padding: 0.5em 1em;
  box-shadow: none;
  > div {
    align-items: center;
  }
  @media screen and (max-width: 40rem) {
    padding-right: 0;
  }
  .dropdown-links {
    position: relative;
    .dropdown {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      width: 200px;
      background: #fff;
      box-shadow: 0 11px 10px rgba(0, 0, 0, 0.1);
      border-radius: 0 0 5px 5px;
      top: 30px;
      a {
        display: block;
        width: 100%;
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-weight: normal;
        &:hover {
          background: #f1f1f3;
        }
        &:last-child {
          padding-bottom: 1rem;
        }
      }
    }
    &:hover {
      .dropdown {
        transition: all 0.25s ease;
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .menu-item {
    a {
      color: #fff;
    }
    .menu-item-links {
      display: inline-block;
      text-decoration: none;
      color: #fff;
      font-weight: normal;
      &:hover,
      > a:hover {
        color: #1ae287;
        transition: color 0.15s;
      }
    }
    @media screen and (max-width: 40rem) {
      position: absolute;
      top: 69px;
      left: 0;
      width: 100%;
      background: #06033d;
      height: 100vh;
      padding-right: 1.5rem;
      display: none;
      .dropdown-links {
        a {
          display: block;
        }
        > a {
          padding-bottom: 1rem;
          padding-top: 1rem;
        }
        .dropdown {
          opacity: 1;
          visibility: visible;
          width: 100%;
          box-shadow: none;
          position: relative;
          top: 0;
          padding: 0 0 1rem;
          a {
            font-weight: normal;
            padding-right: 0;
          }
        }
      }
      &.show-menu-item {
        left: 0;
        transition: all 0.25s ease;
        display: block;
      }
      .menu-item-links {
        text-decoration: none;
        display: block;
        text-align: right;
        padding: 17px 0;
        margin: 0;
        border-bottom: solid 2px #f7f7f7;
        font-weight: bold;
        &:last-child {
          border-bottom: none;
        }
        > a {
          font-weight: bold;
        }
      }
      .dropdown-links {
        padding: 0;
        a {
          margin: 0;
        }
      }
    }
    a {
      margin-right: 1rem;
      padding: 1rem 0;
      cursor: pointer;
    }
  }
  .dropdown-links .dropdown a {
    color: #06033d;
    &:hover {
      color: #1ae287;
    }
  }
`;

const ColLogo = styled(Col)`
  padding-right: 2rem;
`;

const SocialCol = styled(Col)`
  display: flex;
  a {
    display: flex;
    margin: 0 1rem;
    &:last-child {
      margin-right: 2rem !important;
    }
    &:hover {
      opacity: 0.7;
    }
    @media screen and (max-width: 40em) {
      display: inline-block;
      text-align: right;
      &:last-child {
        margin-right: 1rem !important;
      }
    }
  }
  @media screen and (max-width: 40em) {
    display: block;
    text-align: right;
  }
`;
