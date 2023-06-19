import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginScreen from "./page/Login";
import SignupScreen from "./page/Signup";
import UserLayout from "./components/pageComponets/userLayout";
import NotFound from "./components/pageComponets/notFound";
import Layout from "./components/pageComponets/layout";
import GamePage from "./page/gamePage";
import LogoutScreen from "./page/Logout";
import User from "./page/user/user";
import EditGamePage from "./page/editGamePage";
import GameListPage from "./page/GameListPage";
import UserGameListPage from "./page/UserGameListPage";
import { Container } from "@mui/material";

import PlayGame from "./page/play/playGame";
import Home from "./page/home/home";

const App = () => {
  //const [auth,dispath]=useAuth()
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"login"} element={<LoginScreen />} />
          <Route path={"logout"} element={<LogoutScreen />} />
          <Route element={<SignupScreen />} path={"singup"} />
          <Route element={<GameListPage />} path={"games"} />
          <Route element={<GamePage />} path={"games/:gameid"} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<User />} />
          <Route path="games" element={<UserGameListPage />} />
          <Route path="edit/:gameid" element={<EditGamePage />} />
        </Route>
        <Route path="/play/:gameid" element={<PlayGame />} />

        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
