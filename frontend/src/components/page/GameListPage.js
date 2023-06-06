import React, { useEffect, useRef, useState } from "react";
import { GET_GAMES } from "../../API";
import GameCard from "../pageComponets/gameCard";
import { Grid, Typography } from "@mui/material";

const GameListPage = ({ getType }) => {
  
  const [gameList, setGameList] = useState([
    { game_name: "1", id: 1 },
  ]);

  useEffect(() => {

    const getGameList = async () => {
      let rep = await fetch(GET_GAMES, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      let data = await rep.json();
      let games = []||data?.message;
      setGameList(games);
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
        {gameList.map((game) => (
          <GameCard
            key={game.id}
            name={game.game_name}
            id={game.id}
            intro={game.game_intro}
            isEdit={false}
          ></GameCard>
        ))}
      </Grid>
    </>
  );
};

export default GameListPage;
