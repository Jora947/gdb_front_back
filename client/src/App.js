import React from "react";
import { BrowserRouter } from "react-router-dom";
import Approuter from "./componets/AppRouter";
import NavBar from "./componets/Navbar";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
        <Approuter/>     
    </BrowserRouter>
  );
};

export default App;
