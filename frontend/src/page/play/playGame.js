import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/index";
import layout from "../../assets/css/playGame/gameLayout.module.css";
import Talk from "../../components/playGame/scene/talk";
import SceneComponent from "../../components/playGame/SceneFatoria";
import Click from "../../components/playGame/Click";
import Game from "../../components/playGame/game/Game";
import Level from "../../components/playGame/level/Level";
import Scene from "../../components/playGame/scene/Scene";
const PlayGame = ({ defaultAge }) => {
  //db test
  // const [name, setName] = useState("");
  // const [age, setAge] = useState(defaultAge);
  // const [status, setStatus] = useState("");

  // async function addFriend() {
  //   try {

  //     // Add the new friend!
  //     const id = await db.friends.add({
  //       name,
  //       age
  //     });

  //     setStatus(`Friend ${name} successfully added. Got id ${id}`);
  //     setName("");
  //     setAge(defaultAge);
  //   } catch (error) {
  //     setStatus(`Failed to add ${name}: ${error}`);
  //   }
  // }

  // return <>
  //   <p>
  //     {status}
  //   </p>
  //   Name:
  //   <input
  //     type="text"
  //     value={name}
  //     onChange={ev => setName(ev.target.value)}
  //   />
  //   Age:
  //   <input
  //     type="number"
  //     value={age}
  //     onChange={ev => setAge(Number(ev.target.value))}
  //   />

  //   <button onClick={addFriend}>
  //     Add
  //   </button>
  // </>

  // const renderGame=()=>{
  //   const gameList = useLiveQuery(() => db.games.toArray(), []);
  //   if (!gameList) return null;
  //   return gameList.map((game) => (
  //     <div key={game.id}>
  //       <h3>{game.game_name}</h3>
  //       <p>{game.game_intro}</p>
  //     </div>
  //   ));
  // }
  const [step, setStep] = useState(0);
  const stepR = useRef(0);

  const handleScreenClick = () => {
    // 在點擊螢幕時執行的操作
    // 根據需要更新 currentScene 或顯示下一個對話等
    // 例如，在每次點擊時增加 currentScene 的值
    stepR.current += 1;
    // setStep((step)=>step + 1);
    console.log(stepR);
  };

  const RenderGame = () => {
    //get game data
    return (
      <Game>
        <RenderLevel />
      </Game>
    );
  };

  const RenderLevel = ({levelID}) => {
    //get level data
    return (
      <Level levelID={levelID}>
        <RenderScene></RenderScene>
      </Level>
    );
  };

  const RenderScene = () => {
    //get scene data
    return (
      <Scene />
      // <Talk
      //   content={[
      //     { talker: "a", content: "hi" },
      //     { talker: "b", content: "hi" },
      //   ]}
      //   step={step}
      // />
    );
  };

  //render game ->render level->render scene
  return (
    <div className={layout.container}>
      <div
        className={`${layout.flexContainer} game`}
        onClick={handleScreenClick}
      >
        <RenderGame />
      </div>
    </div>
  );
};
PlayGame.propTypes = {};

export default PlayGame;
