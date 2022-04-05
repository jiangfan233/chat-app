import React from "react";
import { Outlet } from "react-router-dom";
// import Login from "./pages/Login";

const App = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default App;
