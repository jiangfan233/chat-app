import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import ButtonWithTip from "./ButtonWithTip";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import SimpleLoader from "./SimpleLoader";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { toast } from "react-toastify";

export default function ChatContainer({
  currentChat,
  currentUser,
  setCurrentChat,
  socketRef,
}) {
  const [allMessages, setAllMessages] = useState([]);

  const handleCloseChat = () => {
    setCurrentChat(undefined);
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // 监听socket中的消息；
  const receiveMsgFromSocket = (duration) => {
    setInterval(() => {
      if (socketRef.current) {
        socketRef.current.on("messageReceive", (data) => {
          setAllMessages([data, ...allMessages]);
        });
      }
    }, duration);
  };

  // 从数据库获取所有消息
  const getAllMessages = useCallback(async () => {
    const { data } = await axios.post(getAllMessagesRoute, {
      fromId: currentUser._id,
      toId: currentChat._id,
    });
    data.status
      ? setAllMessages(data.messageList)
      : toast.error(data.msg, toastOptions);
  });

  // 从 ChatInput 组件获取用户输入
  const handleSendMessage = async (value) => {
    const { data } = await axios.post(sendMessageRoute, {
      msg: value,
      fromId: currentUser._id,
      toId: currentChat._id,
    });
    const newMsg = {
      message: {
        text: value,
        users: {
          from: currentUser._id,
          to: currentChat._id,
        },
      },
    };
    if (!data.status) {
      newMsg.status = false;
      // toast.error(data.msg, toastOptions);
    }
    socketRef.current.emit("send-message", newMsg);
    setAllMessages([newMsg, ...allMessages]);
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  useEffect(() => {
    receiveMsgFromSocket(1000);
  });

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
      {allMessages ? (
        <Messages
          allMessages={allMessages}
          currentUserId={currentUser._id}
          currentChatId={currentChat._id}
        />
      ) : (
        <SimpleLoader />
      )}
      <ChatInput
        allMessages={allMessages}
        setAllMessages={setAllMessages}
        currentUserId={currentUser._id}
        currentChatId={currentChat._id}
        onSendMessage={handleSendMessage}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% auto auto;
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
