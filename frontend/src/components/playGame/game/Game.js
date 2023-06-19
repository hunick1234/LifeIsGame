import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import DataInjection from "../DataInjection";
import { GET_GAME_INFO } from "../../../API";
import { useParams } from "react-router-dom";
import styles from "./game.module.css";
const RenderGame = ({ data, setLevelIDS }) => {
  const [response, setResponse] = useState({});

  const handleSetLevelIDS = (ids) => {
    console.log("set ids", ids);
    setLevelIDS(ids);
  };

  useEffect(() => {
    setResponse(data?.response?.message);
    handleSetLevelIDS(data?.response?.message.level_id_array);
    console.log(response, "game", data);
  }, [data]);
  // const { game_name, level_id_array } = response?.message;

  //const { game_name, level_id_array } = response?.message;

  return (
    <>
      <div className={styles.container}>
        {/* <div>{game_name}</div> */}
        <div>遊戲名稱</div>
        <br />
        <div>{`${response?.game_name}`}</div>
      </div>
    </>
  );
};
const Game = ({ children }) => {
  const { gameid } = useParams();
  const [levelIdArray, setLevelIdArray] = useState([]); // Use array destructuring
  const [step, setStep] = useState(0); // Use array destructuring
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    console.log("lids",levelIdArray);
    startGame();
  }, [levelIdArray]);

  const startGame = () => {
    setGameStart(true);
  };

  const handleSetLevelIDS = (level_id_array) => {
    console.log(level_id_array, "game level array");
    setLevelIdArray(level_id_array);
  };

  return (
    <>
      <DataInjection url={`${GET_GAME_INFO}${gameid}`}>
        <RenderGame setLevelIDS={handleSetLevelIDS} />
      </DataInjection>

      {gameStart ? (
        React.Children.map(children, (child) => (
          <>{React.cloneElement(child, { levelID: levelIdArray })}</>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;
