import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { registerRoute } from "./../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    useranme: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirmPassword should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form
          autoComplete={"false"}
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #131334;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .brand {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 0.5rem;
      border: 0.12rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.2rem solid #997af0;
        outline: none;
      }
    }
    button {
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
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
      }
    }
  }
`;
