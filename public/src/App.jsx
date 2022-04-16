import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fakeAuth } from "./utils/common";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    const { from } = state || { from: { pathname: "/login" } };
    if (!fakeAuth()) {
      navigate(from);
      return;
    }
    navigate("/chat");
    return;
  }, []);

  return <Outlet />;
};

export default App;
