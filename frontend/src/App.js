import React from "react";
import Header from "./components/Header";

import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/app.css"

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>

      <ToastContainer />
    </div>
  );
};

export default App;
