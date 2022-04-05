import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

export default function SimpleLoader() {
  return (
    <Loader>
      <img className="loader-img" src={logo} alt="loader" />
      <span>Loading...</span>
    </Loader>
  );
}

const Loader = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .loader-img {
    z-index: 10;
    width: auto;
    height: auto;
    animation-name: beat;
    animation-timing-function: ease-out;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    @keyframes beat {
      20% {
        transform: scale(1.1);
      }
      80% {
        transform: scale(1.4);
      }
    }
  }
`;
