import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export default function DivInput({ value, setValue }) {
  const message = useRef();
  const handleInput = (event) => {
    message.current = event.target;
    const msg = event.target.textContent.trim();
    if(msg) {
      setValue(event.target.textContent.trim());
    }
  };

  const getTarget = (event) => {
    message.current = event.target;
  };

  useEffect(() => {
    if (message.current) {
      message.current.textContent = value;
    }
  }, [value]);

  return (
    <Container
      contentEditable={true}
      onBeforeInput={getTarget}
      onInput={handleInput}
      placeholder="type message..."
      className="message-text"
      textContent={value}
    ></Container>
  );
}

const Container = styled.div`
  cursor: text;
  display: inline-flex;
  max-height: inherit;
  width: 100%;
  font-size: 1.2rem;
  row-gap: 0.1rem;
  resize: none;
  border: none;
  outline: none;
  flex-wrap: wrap;
  overflow-y: auto;
  word-break: break-word;
  float: left;
  &:empty::before {
    content: attr(placeholder);
    color: gray;
  }
  &::-webkit-scrollbar {
    /* background-color: red; */
    width: 0.2rem;
    &-thumb {
      background-color: #11010167;
      width: 0.1rem;
      border: 1rem;
    }
  }
`;
