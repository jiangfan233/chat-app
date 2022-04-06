import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Buffer } from "buffer";
import styled from "styled-components";
import SimpleLoader from "../components/SimpleLoader";

const apiKey = import.meta.env.VITE_Avatar_Apikey;
import { setAvatarRoute } from "./../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar!", toastOptions);
      return;
    }
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = data.isSet;
      user.avatarImage = data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      toast.info(
        "Successful, congratulations! The page will automatically redirect...",
        toastOptions
      );
      setTimeout(() => navigate("/chat"), 8000);
    } else {
      toast.error("Error setting avatar.Please try again!", toastOptions);
    }
  };

  // 在 useEffect 中使用 async 的正确方式
  const fetchAvataImage = useCallback(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}${Math.round(Math.random() * 1000)}.svg?apikey=${apiKey}`
      );
      const imgBuffer = new Buffer(image.data);
      data.push(imgBuffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  });

  useEffect(() => {
    const userJson = localStorage.getItem("chat-app-user");
    if (!userJson) {
      navigate("/login");
    }
    const user = JSON.parse(userJson);
    if (user.isAvatarImageSet) {
      navigate("/chat")
    }
    fetchAvataImage();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <SimpleLoader />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture.</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={
                    selectedAvatar === index ? "avatar-selected" : "avatar"
                  }
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131334;
  gap: 3rem;

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    /* min-width: 30rem;
    min-height: 8rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
      transition: 0.5s ease-in-out;
      /* img {
        border: 0.4rem solid transparent;
        border-radius: 5rem;
        min-width: 6rem;
        min-height: 6rem;
      } */
    }
    .avatar-selected {
      border: 0.4rem solid #4e0eff;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      /* img {
        border: 0.4rem solid transparent;
        border-radius: 5rem;
        min-width: 6rem;
        min-height: 6rem;
      } */
    }
    img {
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      min-width: 6rem;
      min-height: 6rem;
    }
  }
  .submit-btn {
    color: white;
    background-color: #997af0;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
