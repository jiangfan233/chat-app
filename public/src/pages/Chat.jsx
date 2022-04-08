import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "./Contacts";
import SimpleLoader from "../components/SimpleLoader";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const getContacts = useCallback(async (id) => {
    const { data } = await axios.get(`${allUserRoute}/${id}`);
    setContacts(data);
  });

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const userJson = localStorage.getItem("chat-app-user");
    if (!userJson) {
      navigate("/login");
    }
    const user = JSON.parse(userJson);
    if (!user.isAvatarImageSet) {
      navigate("/setAvatar");
    }
    setCurrentUser(user);
    getContacts(user._id);
  }, []);

  const handleClick = (evt) => {
    // console.log(evt.target.className);
  };

  return (
    <Container onClick={handleClick}>
      {currentUser && contacts ? (
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            onChangeChat={handleChatChange}
          />
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              setCurrentChat={setCurrentChat}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
      ) : (
        <SimpleLoader />
      )}
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131334;
  gap: 3rem;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
