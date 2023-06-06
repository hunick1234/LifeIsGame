import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/homeScreen";
import UserLayout from "./components/pageComponets/userLayout";
import NotFound from "./components/pageComponets/notFound";
import Layout from "./components/pageComponets/layout";
import GamePage from "./components/page/gamePage";
import LogoutScreen from "./screens/logoutScreen";
import UserInfoPage from "./components/page/userInfoPage";
import EditGamePage from "./components/page/editGamePage";
import GameListPage from "./components/page/GameListPage";
import UserGameListPage from "./components/page/UserGameListPage";
import { Container } from "@mui/material";

const App = () => {
  //const [auth,dispath]=useAuth()
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path={"login"} element={<LoginScreen />} />
          <Route path={"logout"} element={<LogoutScreen />} />
          <Route element={<SignupScreen />} path={"singup"} />
          <Route element={<GameListPage />} path={"games"} />
          <Route element={<GamePage />} path={"games/:gameid"} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserInfoPage />} />
          <Route path="games" element={<UserGameListPage />} />
          <Route path="edit/:gameid" element={<EditGamePage />} />
        </Route>

        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
