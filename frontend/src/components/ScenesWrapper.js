import React, { useEffect, useState } from "react";
import ScenesSelect from "./scenesSelect";
import TalkScene from "./Scenes/TalkScene";
import ChoiseAnsScene from "./Scenes/ChoiseAnsScene";
import ReviewSceneCard from "./ReviewSceneCard";
import shortid from "shortid";
import { Button } from "react-bootstrap";
const ScenesWrapper = ({ id,title,deleteLevelListener }) => {
  const [scenes, setScenes] = useState([]);
  const [senceTitle, setSenceTitle] = useState("title");
  const [LevelTitle, setLevelTitle] = useState(title);

  const addNewScenesList = (scenesType, id) => {
    setScenes([...scenes, { scenesType: scenesType, isEdit: false, id: id }]);
    //console.log(scenes);
  };

useEffect(() => {
  console.log(scenes);
}, [scenes])

  const deleteScenes = (id) => {
    const reScenes = scenes.filter((scene) => id !== scene.id);
    setScenes(reScenes);
  };

  //delet level
  const deleteLevel = (e) => {
    e.preventDefault();
    deleteLevelListener(id);
  };

  const reviewTitle = (e) => {
    setSenceTitle(e);
    console.log(senceTitle);
  };

  const creatScene = (scene) => {
    switch (scene.sceneType) {
      case "talk":
        return <TalkScene title="" reviewTitle={reviewTitle} />;
      case "option":
        return <ChoiseAnsScene />;
      case "answer":
        return <ChoiseAnsScene />;
      default:
        console.log("not this type");
        break;
    }
  };

  return (
    <div>
      <input
        id="input1"
        type="text"
        value={LevelTitle}
        onChange={(e) => {
          setLevelTitle(e.target.value);
        }}
      />
      <Button variant="primary" onClick={deleteLevel}>
        delet
      </Button>
      <ScenesSelect addNewScene={addNewScenesList}> </ScenesSelect>
      <div className="scenes row">
        {scenes.map((s, index) => (
          <ReviewSceneCard
            key={s.id}
            id={s.id}
            sceneTitle={senceTitle}
            scene={creatScene(s)}
            sceneType={s.sceneType}
            deleteScenesListener={deleteScenes}
          ></ReviewSceneCard>
        ))}
      </div>
    </div>
  );
};

export default ScenesWrapper;
