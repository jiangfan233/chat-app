import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Login from "./pages/Login";


const App = () => {
  const params = useParams();
  return (
    <React.Fragment>
      {params.id ? <Outlet /> : <Login />}
    </React.Fragment>
  );
};

export default App;
