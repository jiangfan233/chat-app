import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import ButtonWithTip from "./ButtonWithTip";
import ChatInput from "./ChatInput";

export default function ChatContainer({
  currentChat,
  currentUser,
  setCurrentChat,
}) {
  const handleCloseChat = () => {
    setCurrentChat(undefined);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="hidden-element">占位符</div>
        <div className="chat-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentChat.username}</h2>
          </div>
        </div>
        <ButtonWithTip
          icon={AiOutlineClose}
          tip={"Close chat"}
          onClick={handleCloseChat}
        />
      </div>
      <div className="chat-messages"></div>
      <ChatInput
        currentUserId={currentUser._id}
        currentChatId={currentChat._id}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  align-items: end;
  margin: 0.2rem;
  .chat-header {
    display: grid;
    grid-template-columns: 10% 80% 10%;
    align-items: center;
    justify-content: center;
    .hidden-element {
      opacity: 0;
    }
    .chat-user {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
    }
  }
`;
