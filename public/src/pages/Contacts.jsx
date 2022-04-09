import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import ButtonWithTip from "../components/ButtonWithTip";
import { BiPowerOff } from "react-icons/bi";

export default function Contacts({ contacts, currentUser, onChangeChat }) {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUerImage] = useState(undefined);

  useEffect(() => {
    setCurrentUsername(currentUser.username);
    setCurrentUerImage(currentUser.avatarImage);
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    onChangeChat(contact);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <Container>
        <div className="brand">
          <img src={logo} alt="logo" />
          <h3>Snappy</h3>
        </div>
        <div className="contacts-box">
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={
                  "contact " + (index === currentSelected ? "selected" : "")
                }
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="current-user">
          <ButtonWithTip
            icon={BiPowerOff}
            tip="Log out"
            onclick={handleLogout}
          />
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  color: white;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  max-height: inherit;
  background-color: #080420;
  .brand {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts-box {
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border: 1rem;
      }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin: 0.4rem 0;
      .contact {
        display: grid;
        grid-template-columns: 20% auto auto;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff39;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar {
          width: 3rem;
        }
        .username {
          color: white;
        }
      }
      .selected {
        background-color: #9186f3;
      }
    }
  }
  .current-user {
    padding: 0 0.8rem;
    background-color: #0d0d30;
    display: grid;
    grid-template-columns: 15% 70% 15%;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    .user-details {
      display: flex;
      flex-direction: columns;
      justify-content: center;
      align-items: center;
      align-content: center;
      justify-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
          max-inline-size: 100%;
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
