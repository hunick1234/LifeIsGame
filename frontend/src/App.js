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
import BackStageLayout from "./components/pageComponets/backStageLayout";
import Navigator from "./components/pageComponets/navigator";
import NotFound from "./components/pageComponets/notFound";
import Layout from "./components/pageComponets/layout";
import useAuth from "./hook/useAuth";

const App = () => {
  //const [auth,dispath]=useAuth()
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route element={<LoginScreen />} path={"/login"} />
            <Route element={<SingupScreen />} path={"/singup"} />
          </Route>

          
          <Route element={<CreatGameScreen />} path={"/creatGame"} />
          <Route element={<Navigator />} path="n" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
