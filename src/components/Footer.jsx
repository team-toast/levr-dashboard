import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "./../styles/flex-grid";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledImg src="/logo 2.svg" alt="LEVR LOGO" />
      <PageLinks>
        <Link href="/">
          <a className="menu-item-links">Home</a>
        </Link>
      </PageLinks>
      <Row>
        <SocialCol size={`0 0 auto`}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/levr_ly"
            title="twitter"
          >
            <img src="/twitter-dark.svg" height="21" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://medium.com/levr-ly"
            title="Medium"
          >
            <img src="/medium-dark.svg" height="21" />
          </a>
          <a
            target="_blank"
            href="https://t.me/levrly"
            rel="noreferrer"
            title="Telegram"
          >
            <img src="/telegram-dark.svg" height="21" />
          </a>
        </SocialCol>
      </Row>
      &copy; Copyright {new Date().getFullYear()}
    </StyledFooter>
  );
}

const PageLinks = styled.div`
  width: 100%;
  text-align: center;
  a {
    color: #06033d !important;
    text-decoration: none;
    margin: 1rem 1rem 0;
    display: inline-block;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledImg = styled.img`
  height: 6.6em;
  position: relative;
  top: 4px;
  max-width: 14rem;
`;

const StyledFooter = styled.div`
  background: #ffffff;
  padding: 4rem 0;
  width: 100%;
  text-align: center;
`;

const SocialCol = styled(Col)`
  display: flex;
  margin: 2rem auto;
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
