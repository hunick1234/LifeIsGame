import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/pageComponets/header";
import Footer from "./components/pageComponets/footer";
import "./App.css";

import LoginScreen from "./screens/LoginScreen";
import SingupScreen from "./screens/SingupScreen";
import HomeScreen from "./screens/homeScreen";
import CreatGameScreen from "./screens/CreatGameScreen";
import GameSidebare from "./components/pageComponets/gameSidebar";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route element={<HomeScreen />} path={"/"} />
          <Route element={<LoginScreen />} path={"/login"} />
          <Route element={<SingupScreen />} path={"/singup"} />
          <Route
            element={
              <>
                <div className="row">
                  <div className="col-2">
                  <GameSidebare />
                  </div>
                  <div className="col">
                  <CreatGameScreen></CreatGameScreen>
                  </div>
                </div>
              </>
            }
            path={"/creatGame"}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
