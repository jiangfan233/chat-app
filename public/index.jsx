import React from "react";
import "./src/index.css";
import App from "./src/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import Chat from "./src/pages/Chat";

import {createRoot} from "react-dom/client"
import SetAvatar from './src/pages/SetAvatar';

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="chat" element={<Chat />} />
          <Route path="setAvatar" element={<SetAvatar />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
