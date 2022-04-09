import React from "react";
import styled from "styled-components";



export default function Messages({
  allMessages,
  currentUserId,
  currentChatId,
}) {
  
  return (
    <Container>
        {allMessages.map((msg, index) => {
          const {text, users} = msg.message;
          return (
            <div key={msg._id || index} className="message-user">
              <span
                className={
                  (users.from === currentChatId ? "current-user" : "other") +
                  " user"
                }
              >
                {users.to}
              </span>
              <span>{`${text} -- ${createdAt}`}</span>
              <span
                className={
                  (users.from == currentUserId ? "current-user" : "other") +
                  " user"
                }
              >
                {users.from}
              </span>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
  gap: 0.5rem;

  .message-user {
    display: grid;
    align-content: center;
    grid-template-columns: 10% auto 10%;
    gap: 0.2rem;

    span {
      color: white;
      background-color: #96828276;
      padding: 0.2rem 0.3rem;
      border-radius: 0.4rem;
    }
    .user {
      display: inline-block;
      width: 3rem;
      height: auto;
      overflow: hidden;
      margin: auto;
    }
    .other {
      opacity: 0;
    }
  }
`;
