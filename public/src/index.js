import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import {createRoot} from "react-dom/client"
import SetAvatar from './pages/SetAvatar';

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="chat" element={<Chat />} />
          <Route path="setAvatar" element={<SetAvatar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
