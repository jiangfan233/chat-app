import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import DivInput from "./DivInput";

export default function ChatInput({
  onSendMessage,
}) {
  // react-contenteditable 和 useState 不兼容，使用 useRef
  // https://github.com/lovasoa/react-contenteditable/issues/161
  const [value, setValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessageAndReset = (event) => {
    event.preventDefault();
    onSendMessage(value);
    setValue("");
  };

  const handleEmojiClick = (event, emojiObject) => {
    setValue(value + emojiObject.emoji);
  };

  const handleShowEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Container>
      <div className="emoji">
        <button onClick={handleShowEmoji}>
          <BsEmojiSmileFill />
        </button>
        {showEmojiPicker && (
          <Picker id="emoji-picker" onEmojiClick={handleEmojiClick} />
        )}
      </div>
      <form onSubmit={handleSendMessageAndReset}>
        <DivInput value={value} setValue={setValue}  />
        <button type="submit">
          <AiOutlineSend className="send-icon" />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  height: fit-content;
  max-height: 8rem;
  outline: none;
  border-radius: 1.5rem;
  margin: 0 .5rem;
  gap: 0.2rem;
  cursor: pointer;
  min-height: 2.5rem;
  .emoji {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    border: none;
    button {
      display: inline-flex;
      border: none;
      outline: none;
      background-color: transparent;
      svg {
        font-size: 1.5rem;
      }
      color: #1e9bac;
    }
    aside {
      position: absolute;
      z-index: 10;
      bottom: 150%;
      left: 10%;
    }
  }
  form {
    display: flex;
    max-height: inherit;
    height: -webkit-fill-available;
    width: 100%;
    gap: 0.1rem;
    border: none;
    border-radius: inherit;
    align-items: center;
   
    button {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      height: 100%;
      max-height: inherit;
      border-radius: inherit;
      border: none;
      background-color: #9186f3;
      padding: 0.2rem 1rem;
      svg {
        text-align: center;
        min-height: fit-content;
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
