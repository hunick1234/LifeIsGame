import React, { useEffect, useRef, useState } from "react";
import { GET_GAMES } from "../API";
import GameCard from "../components/pageComponets/gameCard";
import { Grid, Typography } from "@mui/material";

const GameListPage = ({ getType }) => {
  const [gameList, setGameList] = useState([
    {
      // game_name: "1", id: 1
    },
  ]);

  useEffect(() => {
    const getGameList = async () => {
      let rep = await fetch(GET_GAMES, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      let data = await rep.json();
      setGameList(data.message);
    };
    getGameList();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: "green",
          fontWeight: "italic",
          textAlign: "justify",
          mt: 4,
          mb: 4,
        }}
      >
        所有開放中遊戲
      </Typography>
      <Grid container spacing={2}>
        {gameList?.map((game) => (
          <GameCard key={game.id} game={game} isEdit={false}></GameCard>
        ))}
      </Grid>
    </>
  );
};

export default GameListPage;
