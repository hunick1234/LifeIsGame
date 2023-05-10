import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/pageComponets/header";
import Footer from "./components/pageComponets/footer";
import "./App.css";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/homeScreen";
import CreatGameScreen from "./screens/CreatGameScreen";
import UserLayout from "./components/pageComponets/userLayout";
import NotFound from "./components/pageComponets/notFound";
import Layout from "./components/pageComponets/layout";
import useAuth from "./hook/useAuth";
import GameListScreen from "./screens/GameListScreen";
import GamePage from "./components/page/gamePage";
import LogoutScreen from "./screens/logoutScreen";
import BackStageScreen from "./screens/backStageScreen";
import SettingPage from "./components/page/settingPage";

const App = () => {
  //const [auth,dispath]=useAuth()
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path={"login"} element={<LoginScreen />} />
            <Route path={"logout"} element={<LogoutScreen />} />
            <Route element={<SignupScreen />} path={"singup"} />
            <Route element={<GameListScreen />} path={"games"} />
            <Route element={<GamePage />} path={"games/:gameid"} />
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<CreatGameScreen />} />
            <Route path="games" element={<CreatGameScreen />} />            
            <Route path="setting" element={<SettingPage />} />
           
          </Route>

          <Route path="*" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
