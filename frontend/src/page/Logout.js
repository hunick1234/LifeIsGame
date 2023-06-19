import React, { useEffect } from "react";
import { LOGOUT } from "../API";
import { Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "../hook/useFetch";

const Logout = () => {
  const navigate = useNavigate();
  const { response, error } = useFetch(LOGOUT, {
    method: "GET",
    credentials: "include",
  });

  if (error) {
    return <div>error</div>;
  } else {
    navigate("/login", { replace: true });

    // const now = new Date();
    // const pastDate = new Date(now.getTime() - 1);
    // document.cookie =
    //   "_session=; expires=" + pastDate.toUTCString() + "; path=/";
  }
  return <div>logout</div>;
};

export default Logout;
