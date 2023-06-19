import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_GAME_INFO } from "../API";
import { Typography, Card, CardContent, CircularProgress, Button } from "@mui/material";

const GamePage = () => {
  const { gameid } = useParams();
  const [gameInfo, setGameInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${GET_GAME_INFO}${gameid}`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setGameInfo(data.message);
    }
    fetchData();
  }, [gameid]);

  if (!gameInfo) {
    return <CircularProgress />;
  }

  const { game_name, creatUser, game_intro } = gameInfo;

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h6">{game_name}</Typography>
        <Typography variant="subtitle1">{`Created by: ${creatUser}`}</Typography>
        <Typography variant="body1">{game_intro}</Typography>
      </CardContent>
    </Card>
    <Button variant="contained" color="primary" href={`../play/${gameid}`}>
      PLAY
    </Button>
    </>
  );
};
GamePage.propTypes = {

};

export default GamePage;
