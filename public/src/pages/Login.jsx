import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

// 对 localStorage.getItem 进行一次封装
const getLocalValue = (key) => {
  return localStorage.getItem(key);
};

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: getLocalValue("username") ? getLocalValue("username") : "",
    password: getLocalValue("password") ? getLocalValue("password") : "",
    rememberMe: getLocalValue("rememberMe") ? true : false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat");
    }
  }, []);

  const handleChange = (event) => {
    // 如果不解构 values, 会把其他值覆盖为 undefined！
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRemember = (event) => {
    const { rememberMe } = values;
    setValues({ ...values, [event.target.name]: !rememberMe });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, rememberMe } = values;
    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        return false;
      }
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      if (rememberMe) {
        localStorage.setItem("rememberMe", rememberMe);
      }
      navigate("/chat");
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (password.length < 8) {
      toast.error(
        "Password should be greater than 8 characters!",
        toastOptions
      );
      return false;
    }
    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit} autoComplete={"false"}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          <div className="login-option">
            <div className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleRemember}
              ></input>
              <label>Remember Me</label>
            </div>
            <button type="submit">Login</button>
          </div>
          <span>
            No Account? <Link to="/register">Create one</Link>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    min-width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: #00000076;
    padding: 2rem 4rem;
    border-radius: 2rem;
  }

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

  form > input {
    color: white;
    background-color: transparent;
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    border: 0.12rem solid MediumBlue;
    border-radius: 0.2rem;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid MediumPurple;
      outline: none;
    }
  }

  .login-option {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.2rem;
  }

  .remember-me {
    display: flex;
    flex-direction: row;
    gap: 0.1rem;
    align-items: center;

    input {
      width: auto;
    }
    label {
      font-size: 0.9rem;
    }
  }

  button {
    color: white;
    background-color: MediumPurple;
    border: none;
    border-radius: 0.4rem;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8rem;
    &:hover {
      background-color: MediumBlue;
    }
  }

  span {
    align-self: end;
    font-size: 0.8rem;
    color: white;
    text-transform: uppercase;
    a {
      font-weight: bold;
      color: cyan;
      margin: 0 0.2rem;
    }
  }
`;

export default Login;
