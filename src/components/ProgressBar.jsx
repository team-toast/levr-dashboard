import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export default function ProgressBar({
  children,
  status,
  closeBtn,
  messages = [],
}) {
  return (
    <ProgressBarDiv status={status}>
      <Content>
        <Block>
          {`${status}`}
          <Block>
            {children}
            {messages.map((message, index) => {
              return (
                <div
                  key={`message-${index}`}
                  className="progress-message text-1 padding-1"
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                ></div>
              );
            })}
          </Block>
        </Block>
      </Content>
      <CloseBtn onClick={closeBtn}>X</CloseBtn>
    </ProgressBarDiv>
  );
}

const Block = styled.div`
  display: block;
  flex: 1 0 100%;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: initial;
  padding: 0 1rem;
`;

const Content = styled.div`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 0 1rem;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 6rem 1rem 2rem;
`;

const ProgressBarDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 3;
  backdrop-filter: blur(2px);
`;
