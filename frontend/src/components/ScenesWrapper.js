import React, { useState } from "react";
import ScenesSelect from "./scenesSelect";
import TalkScene from "./Scenes/TalkScene";
import ChoiseAnsScene from './Scenes/ChoiseAnsScene'
import ReviewSceneCard from "./ReviewSceneCard";

const ScenesWrapper = ({title}) => {
  
  const [scenes, setScenes] = useState([]);
  const addNewScenesList = (scenesType) => {
    setScenes([...scenes, { scenesType: scenesType,isEdit:false }]);

  };

  const creatScene = (scene) => {
    console.log(scene);

    switch (scene.scenesType) {
      case "talk":
        return <TalkScene  />;
        case "option":
          return <ChoiseAnsScene  />;
      default:
        console.log("not this type");
        break;
    }
  };
  return (
    <div>
      
      <input></input>
      <ScenesSelect addNewScene={addNewScenesList}>  </ScenesSelect>
      <div className="scenes row">
        {scenes.map((key, index) => (
          <div className="scene" key={index}>{<ReviewSceneCard scene={creatScene(key)} sceneType={key.scenesType}></ReviewSceneCard>}</div>
        ))}
      </div>
     
      
    </div>
  );
};

export default ScenesWrapper;
