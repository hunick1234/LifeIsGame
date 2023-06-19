import React from "react";
import PropTypes from "prop-types";
import DataInjection from "../DataInjection";
import { GET_Levels } from "../../../API";
import SceneComponent from "../SceneFatoria";

const RenderScene = ({ data }) => {
  const { response } = data;
  console.log(response, "SCENE");

  return (
    <>
      <SceneComponent
        type={response?.message?.scene_type}
        data={response?.message?.scene_content}
      />
    </>
  );
};
const Scene = () => {
  return (
    <>
      <DataInjection url={""}>
        <RenderScene />
      </DataInjection>
    </>
  );
};

Scene.propTypes = {};

export default Scene;
