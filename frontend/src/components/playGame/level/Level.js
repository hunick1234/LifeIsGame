import React from "react";
import PropTypes from "prop-types";
import DataInjection from "../DataInjection";
import { GET_Levels } from "../../../API";

const RenderLevel = ({ data, setSceneIDS }) => {
  const { response } = data;
  console.log(response, "level");
  const handleSetSceneIDS = () => {
    setSceneIDS(response?.message?.scene_id_array);
  };
  return (
    <>
      <div>關卡名稱</div>
      <br />
      <div>{response?.message?.level_name}</div>
    </>
  );
};
const Level = ({ children, levelID }) => {
  const { sceneIdArray, setSceneIdArray } = React.useState([]);
  return (
    <>
      <DataInjection url={GET_Levels(levelID)}>
        <RenderLevel />
      </DataInjection>

      {children}
    </>
  );
};

Level.propTypes = {};

export default Level;
