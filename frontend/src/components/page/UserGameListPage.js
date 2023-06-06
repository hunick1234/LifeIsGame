import React, { useEffect, useRef, useState } from "react";
import { GET_USER_GAMES } from "../../API";
import GameCard from "../pageComponets/gameCard";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import shortid from "shortid";
import { styled } from "@mui/system";
import { POST_GAME } from "../../API";

const StyleTypography = styled(Typography)(({ theme }) => ({
  height: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "center",
  border: "2px solid #ccc",
  borderRadius: "3px",
  boxShadow: "none",
  transition: "all 0.1s ease",
  "&:hover": {
    boxShadow: "0px 5px 5px 2px rgba(198, 226, 243, 0.8)",
  },
}));

const CreatGameDialog = ({ open, onClose }) => {
  const gameRef = useRef({
    game_name: "your game",
    game_intro: "game intro",
    id: "",
    create_time: "",
  });
  const [isAdd, setIsadd] = useState(false);
  const [gameIint, setGameInit] = useState(false);
  const handleClose = () => {
    onClose(null);
  };
  const handSave = () => {
    if (!isAdd) {
      setIsadd(true);
      const createdAt = new Date().toISOString();
      const game = {
        game_name: gameRef.current.game_name,
        game_intro: gameRef.current.game_intro,
        id: shortid.generate(),
        create_time: new Date().toISOString(),
      };
      onClose(game);
      setTimeout(() => {
        setIsadd(false);
      }, 500);
    }
  };

  // useEffect(() => {
  //   if (gameIint) {
  //     onClose(gameRef);
  //   }
  //   setGameInit(false);
  // }, [gameIint]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增遊戲</DialogTitle>
        <DialogContent>
          <DialogContentText>請輸入遊戲名稱與遊戲簡介</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="遊戲名稱"
            type="text"
            fullWidth
            onChange={(e) => {
              gameRef.current.game_name = e.target.value;
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="遊戲簡介"
            type="text"
            fullWidth
            onChange={(e) => {
              gameRef.current.game_intro = e.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handSave}>新增</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UserGameListPage = ({ getType }) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true); // [isEdit, setIsEdit
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const getGameList = async () => {
      let rep = await fetch(GET_USER_GAMES, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      let data = await rep.json();
      console.log(data)
      if (data.message===null) {
        return
      }
      setGameList(data.message);
      console.log(gameList);
    };
    getGameList();
  }, []);

  // add new game
  const addNewGame = (game) => {
    //creat new game
    try {
      const response = fetch(`${POST_GAME}${game.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
           game
        ),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setGameList([...gameList, game]);
  };

  //delet game
  const deletGameListener = (id) => {
    const reGames = gameList.filter((game) => id !== game.id);
    setGameList(reGames);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

    if (value !== null) {
      addNewGame(value);
    }
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={9} sm={6} md={8} lg={10}>
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
            你的所有遊戲
          </Typography>
        </Grid>
        <Grid item xs={3} sm={6} md={4} lg={2}>
          <Typography
            variant="h6"
            sx={{
              color: "green",
              fontWeight: "italic",
              textAlign: "center",
              mt: 5,
              mb: 5,
            }}
          >
            <StyleTypography onClick={handleClickOpen}>
              創建遊戲
            </StyleTypography>
          </Typography>
        </Grid>
      </Grid>
      <CreatGameDialog open={open} onClose={handleClose} />
      <Grid container spacing={2}>
       {gameList.map((game) => (
          <GameCard
            key={game.id}
            name={game.game_name}
            id={game.id}
            intro={game.game_intro}
            isEdit={isEdit}
            deletListener={deletGameListener}
          ></GameCard>
        ))}
      </Grid>
    </>
  );
};

export default UserGameListPage;
