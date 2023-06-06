import React, { useEffect } from "react";
import { LOGOUT } from "../API";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      await fetch(LOGOUT, {
        credentials: "include",
        method: "GET",
      });
    }
    logout();
    navigate("/login", { replace: true });
  }, []);

  return <div>logout</div>;
};

export default LogoutScreen;
