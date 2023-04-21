import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/pageComponets/header";
import Footer from "./components/pageComponets/footer";
import "./App.css";

import LoginScreen from "./screens/LoginScreen";
import SingupScreen from "./screens/SingupScreen";
import HomeScreen from "./screens/homeScreen";
import CreatGameScreen from "./screens/CreatGameScreen";
import GameListScreen from "./screens/gameListScreen";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route element={<HomeScreen />} path={"/"} />
          <Route element={<LoginScreen />} path={"/login"} />
          <Route element={<SingupScreen />} path={"/singup"} />
          <Route element={<CreatGameScreen />} path={"/creatGame"} />
          <Route element={<GameListScreen />} path={"/gameList"} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
