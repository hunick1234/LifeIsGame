import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { GET_USERINFO } from "../../API";
const UserInfoPage = () => {
 
  useEffect(() => {
    const userInfo = async () => {
      let rep = await fetch(GET_USERINFO, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      let data = await rep.json();
      console.log(data);
    };
    userInfo();
  }, []);

  return <>user info</>;
};

export default UserInfoPage;
