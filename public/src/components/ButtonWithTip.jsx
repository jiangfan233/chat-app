import React from "react";
import styled from "styled-components";

export default function ButtonWithTip({ icon: Icon, onclick, tip, ...rest }) {
  return (
    <Button onClick={() => onclick()} {...rest}>
      {<Icon />}
      <span>{tip}</span>
    </Button>
  );
}

const Button = styled.button`
  position: relative;
  color: gray;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ffffff47;
  padding: 0.2rem;
  text-align: center;
  border: 0.1rem solid transparent;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    color: black;
    background-color: #d65fd0;
  }
  &:hover > span {
    opacity: 100%;
  }
  span {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 0.8rem;
    opacity: 0%;
    position: absolute;
    z-index: 10;
    width: 5rem;
    height: 1.4rem;
    background-color: #aca7a7;
    border-radius: 0.3rem;
    top: calc(100% + 1rem);
    left: calc(50% - 2.5rem);
    transition: 0.4s ease-in-out;
    &::after {
      --trangle-len: 0.8rem;
      content: "";
      position: absolute;
      width: var(--trangle-len);
      height: var(--trangle-len);
      background-color: #aca7a7;
      transform: rotate(45deg);
      top: calc(var(--trangle-len) /2 * -1);
      overflow: auto;
    }
  }
`;
