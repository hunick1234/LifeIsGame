import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Tab,
  Tabs,
  Input,
  TextField,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Level from "./Level";
import { DELET_Level, GET_Levels, POST_GAME, POST_Level } from "../API";
import shortid from "shortid";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useFetch } from "../hook/useFetch";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  // "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
  //   transform: "rotate(90deg)",
  // },
  // "& .MuiAccordionSummary-content": {
  //   marginLeft: theme.spacing(1),
  // },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ flex: 1 }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const RenderSetGameInfo = () => {
  const { gameid } = useParams();
  const [gameName, setGameName] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [gameIntro, setGameIntro] = useState("");
  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleUploadStatusChange = () => {
    setIsUpload((prevIsUpload) => !prevIsUpload);
  };

  const handeleGameIntro = (e) => {
    setGameIntro(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const postLevel = async () => {
        fetch(POST_GAME(gameid), {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            game_name: gameName,
            is_upload: isUpload,
            game_intro: gameIntro,
          }),
        });
      };

      postLevel();
    } catch (error) {
      console.error("Error:", error);
    }
    // Perform submit logic with gameName and isUpload values
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Name:
        <input type="text" value={gameName} onChange={handleGameNameChange} />
      </label>
      <label>
        Upload Status:
        <input
          type="checkbox"
          checked={isUpload}
          onChange={handleUploadStatusChange}
        />
      </label>
      <label>
        Game intro:
        <input type="text" value={gameIntro} onChange={handeleGameIntro} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const EditGamePage = () => {
  const { gameid } = useParams();
  const [levelList, setLevelList] = useState([]); // [levelList, setLevelList
  const [value, setValue] = useState(0);
  const [isChage, setIsChange] = useState(false);
  const [changeFile, setChangeFile] = useState([
    {
      id: "",
      level_name: "",
    },
  ]);

  const updateLevel = () => {
    setIsChange(false);
  };
  const saveLevel = () => {};

  const addLevel = () => {
    const newLevel = { id: shortid.generate(), name: "hi" };
    try {
      const postLevel = async () => {
        fetch(POST_Level(newLevel.id, gameid), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLevel),
        });
      };

      postLevel();
    } catch (error) {
      console.error("Error:", error);
    }

    setLevelList([...levelList, newLevel]);
  };

  const deletLevel = (id) => {
    const reLevel = levelList.filter((level) => id !== level.id);
    try {
      const deletLevel = async () => {
        fetch(DELET_Level(id, gameid), {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

      deletLevel();
    } catch (error) {
      console.error("Error:", error);
    }
    setLevelList(reLevel);
  };

  useEffect(() => {
    try {
      const getLevels = async () => {
        const rep = await fetch(GET_Levels(gameid), {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await rep.json();
        if (data.message !== null) {
          setLevelList(data.message);
          return;
        }
        console.log("d", data, "mnessage is null");
      };
      getLevels();
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const RenderLevels = () => {

   
    return (
      <>
        {levelList.map((level) => (
          <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={level.id}
              id={level.id}
            >
              <Typography>
                <TextField
                  sx={{ width: "33%" }}
                  id="standard-basic"
                  label="關卡名稱"
                  variant="standard"
                  defaultvalue={level?.level_name}
                  onChange={(event) => {
                    setIsChange(true);
                    setChangeFile([
                      ...changeFile,
                      { id: level.id, level_name: event.target.value },
                    ]);
                  }}
                />
                {isChage ? <Button onClick={updateLevel}>save</Button> : <></>}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Level levelInfo={level} deletLevelListener={deletLevel}></Level>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={9} sm={6} md={8} lg={10}>
          <Typography
            variant="h4"
            sx={{
              color: "green",
              fontWeight: "italic",
              textAlign: "justify",
              mt: 4,
              mb: 4,
            }}
          >
            編輯遊戲
          </Typography>
        </Grid>
        <Grid item xs={3} sm={6} md={4} lg={2}>
          <Typography
            variant="h6"
            sx={{
              color: "green",
              fontWeight: "italic",
              textAlign: "center",
              mt: 5,
              mb: 5,
            }}
          >
            <Button onClick={addLevel}>新增關卡</Button>
            <Button onClick={saveLevel}>儲存遊戲</Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label=" 關卡創建" {...a11yProps(0)} />
            <Tab label="遊戲設定" {...a11yProps(1)} />
            <Tab label="物件管理" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Box sx={{ display: "flex" }}>
          <TabPanel value={value} index={0}>
            {RenderLevels()}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RenderSetGameInfo />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h4">物件管理</Typography>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
export default EditGamePage;
