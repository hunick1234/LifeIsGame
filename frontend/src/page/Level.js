import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  ListItem,
  List,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SenceWrapper from "./SenceWrapper";
import styles from "../assets/css/level.module.css";
import GameCard from "../components/pageComponets/gameCard";
import SceneFatoria from "../components/Scenes/sceneFatoria";
import shortid from "shortid";
import { POST_SCENE } from "../API";
import { useParams } from "react-router-dom";

const ChildComponent = ({ items, addItem, deleteItem, levelID }) => {
  const [open, setOpen] = useState("id");

  const handleOpen = (id) => {
    console.log("open:", id);
    setOpen(id);
  };
  const handleClose = () => {
    setOpen("false");
  };

  const handleAddItem = (type) => {
    const newScene = {
      level_id: levelID,
      id: shortid.generate(),
      scene_type: type,
      scene_context: "",
      scene_name: "",
    };

    addItem(newScene);
  };

  const handleDeleteItem = (index) => {
    deleteItem(index);
  };

  const renderItems = () => {
    return items.map((item) => (
      <ListItem key={item.id}>
        <ListItemText primary={item.scene_type} />
        <SceneFatoria scene={item} isopen={open} onclose={handleClose} />
        <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
        <Button onClick={() => handleOpen(item.id)}>Edit</Button>
        <ListItemText primary={item.scene_name + "asdfsdfdsfsdfdasdfsdf"} />
      </ListItem>
    ));
  };

  return (
    <>
      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
        <Select
          native
          defaultValue=""
          value=" "
          id="grouped-scene-select"
          label="Grouping"
          onChange={(e) => {
            handleAddItem(e.target.value);
          }}
        >
          <option aria-label="None" value="類型選擇" />
          <optgroup label="劇情類">
            <option value={"talk"}>talk</option>
            <option value={"story"}>story</option>
          </optgroup>
          <optgroup label="答案">
            <option value={"text_answer"}>text</option>
            <option value={"MultipleChoice_answer"}>select</option>
          </optgroup>
        </Select>
      </FormControl>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {renderItems()}
      </List>
    </>
  );
};

//level info 從edit gane page 傳入
const Level = ({ addLevelListerner, deletLevelListener, levelInfo }) => {
  const [scene, setScene] = useState([]);
  const creatLevel = () => {
    addLevelListerner();
  };

  const deletLevel = async (e) => {
    e.preventDefault();
    deletLevelListener(levelInfo.id);
  };

  useEffect(() => {}, []);
  return (
    <Grid container spacing={0} className={styles.wrapper}>
      <IconButton aria-label="delete" onClick={deletLevel} size="small">
        <DeleteIcon />
        delet : {levelInfo.id}
      </IconButton>
      <IconButton aria-label="save" onClick={"saveScene"} size="small">
        <SaveIcon />
        save
      </IconButton>
      <SenceWrapper
        levelID={levelInfo.id}
      >
        <ChildComponent />
      </SenceWrapper>
    </Grid>
  );
};

export default Level;
