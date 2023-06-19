import React from "react";
import StoryScene from "./StoryScene";

import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import MultipleChoiceScene from "./MultipleChoiceScene";
import TalkScene from "./TalkScene";

const SceneFatoria = ({ scene, isopen, onclose, faterID }) => {
  const [save, setSave] = React.useState(false);
  const constructor = () => {
    switch (scene.scene_type) {
      case "story":
        return (
          <StoryScene info={scene} onSave={save} handelSave={handelSave} />
        );
      case "MultipleChoice_answer":
        return (
          <MultipleChoiceScene
            info={scene}
            onSave={save}
            handelSave={handelSave}
          />
        );
      case "talk":
        console.log("creaty talk");
        return <TalkScene info={scene} onSave={save} />;

      default:
        console.log("not this type");
        break;
    }
  };

  const handelSave = (isSave) => {
    setSave(isSave);
  };

  return (
    <>
      <Dialog fullScreen open={scene.id === isopen} onClose={onclose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onclose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {scene.scene_type}
            </Typography>
          </Toolbar>
        </AppBar>
        {constructor()}
      </Dialog>
    </>
  );
};

SceneFatoria.prototype = {
  scene: PropTypes.object.isRequired,
  isopen: PropTypes.string.isRequired,
  onclose: PropTypes.func.isRequired,
  faterID: PropTypes.string,
  
};

export default SceneFatoria;
