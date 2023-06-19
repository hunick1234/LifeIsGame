import React, { useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Select,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POST_SCENE } from "../../API";

const StoryScene = ({ onSave, handelSave, info }) => {
  const [formData, setFormData] = useState([
    // {
    //   story_content: "",
    // },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const sumbitSave = async () => {
    const response = await fetch(POST_SCENE(info.id, info.level_id), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: info.id,
        scene_type: "story",
        scene_content: formData,
      }),
    });
    const data = await response.json();
    console.log(response);
    handelSave(false);
  };

  const handleAdd = () => {
    setFormData([
      ...formData,
      {
        story_content: "",
      },
    ]);
  };
  return (
    // <Dialog fullScreen open={open} onClose={handleClose}>
    //   <AppBar sx={{ position: "relative" }}>
    //     <Toolbar>
    //       <IconButton
    //         edge="start"
    //         color="inherit"
    //         onClick={handleClose}
    //         aria-label="close"
    //       >
    //         <CloseIcon />
    //       </IconButton>
    //       <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
    //         Story
    //       </Typography>
    //       <Button autoFocus color="inherit" onClick={handleAdd}>
    //         save
    //       </Button>
    //     </Toolbar>
    //   </AppBar>
    <Container>
      {formData?.map((item, index) => {
        return (
          <div key={index}>
            <TextField
              name={`${index}`}
              label="story"
              defaultValue={item.story_content}
              value={item.story_content}
              onChange={(e) => {
                console.log(index, item);
                setFormData((prevFormData) => {
                  const updatedFormData = [...prevFormData]; // 先複製一份原本的資料陣列
                  console.log(updatedFormData, "ff");
                  updatedFormData[e.target.name] = {
                    ...updatedFormData[index],
                    story_content: e.target.value, // 更新指定索引處的 story_content 屬性值
                  };
                  return updatedFormData; // 返回更新後的資料陣列
                });
              }}
              fullWidth
              margin="dense"
            />
          </div>
        );
      })}

      <Button variant="contained" color="primary" onClick={handleAdd}>
        Next page
      </Button>
      <Button variant="contained" color="primary" onClick={sumbitSave}>
        save
      </Button>
    </Container>
  );
};

export default StoryScene;
