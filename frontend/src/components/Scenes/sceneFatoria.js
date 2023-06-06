import React from "react";
import StoryScene from "./StoryScene";
import { Dialog } from "@mui/material";
import { POST_SCENE } from "../../API";

const SceneFatoria = ({ scene, isopen, onclose, faterID }) => {
  

  const constructor = () => {
   
    switch (scene.type) {
      case "story":
        return <StoryScene open={isopen} onClose={onclose} />;

      default:
        console.log("not this type");
        break;
    }
  };

  return <>{constructor()} </>;
};

export default SceneFatoria;
