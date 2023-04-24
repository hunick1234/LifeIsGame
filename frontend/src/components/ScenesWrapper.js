import React, { useState } from "react";
import ScenesSelect from "./scenesSelect";
import TalkScene from "./Scenes/TalkScene";
import ChoiseAnsScene from "./Scenes/ChoiseAnsScene";
import ReviewSceneCard from "./ReviewSceneCard";

const ScenesWrapper = ({ title }) => {
  const [scenes, setScenes] = useState([]);
  const [senceTitle, setSenceTitle] = useState("title");
  const [LevelTitle,setLevelTitle]=useState(title)
  const addNewScenesList = (scenesType) => {
    setScenes([...scenes, { scenesType: scenesType, isEdit: false }]);
  };
  const reviewTitle = (e) => {
    setSenceTitle(e);
    console.log(senceTitle);
  };

  const creatScene = (scene) => {
    console.log(scene);

    switch (scene.scenesType) {
      case "talk":
        return <TalkScene title="" reviewTitle={reviewTitle} />;
      case "option":
        return <ChoiseAnsScene />;
      default:
        console.log("not this type");
        break;
    }
  };
  return (
    <div>
      <input id="input1" type="text" value={LevelTitle} onChange={(e)=>{setLevelTitle(e.target.value)}} />
      <ScenesSelect addNewScene={addNewScenesList}> </ScenesSelect>
      <div className="scenes row">
        {scenes.map((key, index) => (
          <div className="scene" key={index}>
            {
              <ReviewSceneCard
                sceneTitle={senceTitle}
                scene={creatScene(key)}
                sceneType={key.scenesType}
              ></ReviewSceneCard>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenesWrapper;
