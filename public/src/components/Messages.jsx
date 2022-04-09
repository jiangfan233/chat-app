import React from "react";
import styled from "styled-components";

export default function Messages({ allMessages, currentUser, currentChat }) {
  return (
    <Container>
      <div className="chat-scoll">
        {allMessages.map((msg, index) => {
          const { text, users } = msg.message;
          return (
            <div key={msg._id || index} className="message-user">
              {users.from === currentChat._id ? (
                <span>
                  <img
                    className="avatar"
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar"
                  />
                </span>
              ) : (
                <div />
              )}
              <div
                className={
                  "msg-box " +
                  (users.from === currentUser._id
                    ? "user-msg-box"
                    : "other-msg-box")
                }
              >
                <p>{text}</p>
              </div>
              {users.from === currentUser._id ? (
                <span>
                  <img
                    className="avatar"
                    src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                    alt="avatar"
                  />
                </span>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  overflow-y: auto;
  max-height: 100%;
  overflow-y: auto;
  padding: 0.5rem 0.2rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff40;
      width: 0.2rem;
      border: 1rem;
    }
  }
  .chat-scoll {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    gap: 0.8rem;
    .message-user {
      display: grid;
      grid-template-columns: 10% auto 10%;
      gap: 0.8rem;
      span {
        /* background-color: red; */
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 0%;
        .avatar {
          width: 2.5rem;
        }
      }
      .msg-box {
        display: inline-flex;
        p {
          font-size: 1.2rem;
          color: white;
          background-color: #96828276;
          padding: 0 0.3rem;
          border-radius: 0.4rem;
          display: inline-flex;
          align-items: center;
          width: fit-content;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .user-msg-box {
        justify-content: flex-end;
      }
      .other-msg-box {
        justify-content: flex-start;
      }
    }
  }
`;
