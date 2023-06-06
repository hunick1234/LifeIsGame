import React, { useEffect, useState } from "react";
import { GET_GAMES } from "../API";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,

} from "@mui/material";
import { styled } from "@mui/system";
import GameCard from "../components/pageComponets/gameCard";
import { Link } from "react-router-dom";

const StyleCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));
const GameListScreen = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     let rep= await fetch(GET_GAMES, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setGames(json.message);
          console.log(games);
        });
      let data=await rep.json()
      setGames(data)
    };
    fetchData();
  }, []);

  return (
    <>
     
      <Grid container spacing={2}>
        {games.map((game) => (
         <GameCard name={game.game_name} id={game.id}  isEdit={false}> </GameCard>
        ))}
      </Grid>
    </>
  );
};

export default GameListScreen;
