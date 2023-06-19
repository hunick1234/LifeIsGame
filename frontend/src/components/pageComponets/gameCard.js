import React from "react";
import { DELET_GAME } from "../../API";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import testImage from "../../assets/images/image0.jpg";
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
    backgroundColor: "#d0dce5",
  },
}));

const StyleTypography = styled(Typography)(({ theme }) => ({
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
    boxShadow: "0px 4px 20px rgba(198, 226, 243, 0.3)",
  },
}));

const GameCard = ({ game,isEdit }) => {
  const { game_name, id, game_intro, is_upload, deletListener } = game;
  const deletGame = async (e) => {
    e.preventDefault();

    deletListener(id);

    try {
      const response = await fetch(`${DELET_GAME}${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text === undefined) {
      return "";
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  const truncatedIntro = truncateText(game_intro, 20);
  return (
    <>
      <Grid item xs={10} sm={6} md={4} lg={3} key={id}>
        <StyleCard sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            src={testImage}
            image={testImage}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`${game_name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {`${game_intro}`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {`${id}`}
            </Typography>
          </CardContent>
          <CardActions>
            {isEdit ? (
              <>
                <Link to={`../edit/${id}`} onClick={"re"}>
                  <BiEditAlt />
                </Link>
                <Link onClick={deletGame}>
                  <MdDeleteForever />
                </Link>
              </>
            ) : (
              <>
                <Link to={`./${id}`}>
                  <RxMagnifyingGlass />
                </Link>
              </>
            )}
          </CardActions>
        </StyleCard>
      </Grid>
    </>
  );
};

export default GameCard;
