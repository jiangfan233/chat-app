import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
