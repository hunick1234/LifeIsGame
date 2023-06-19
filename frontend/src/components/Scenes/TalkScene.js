/**
 * 此為製作對話內容顯示畫面
 * 選擇說話人物  輸入內容
 * 是否新增下句對話
 */

import React, { useRef, useState } from "react";
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
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POST_SCENE } from "../../API";

const TalkScene = ({ info, onSave, handelSave }) => {
  const [title, setTitle] = useState("talkScene");
  const talkContextRef = useRef("");
  const [talkContext, setTalkContext] = useState("");
  const [talker, setTalker] = useState("");
  const [formData, setFormData] = useState(
    info.scene_content ? info.scene_content : []
  );

  if (onSave) {
    sumbitSave();
    handelSave(false);
  }

  const sumbitSave = async () => {
    const response = await fetch(POST_SCENE(info.id, info.level_id), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: info.id,
        scene_type: "talk",
        scene_content: formData,
      }),
    });
  };

  const handleAdd = () => {
    setFormData([
      ...formData,
      {
        talker: "",
        talk_content: "",
      },
    ]);
  };

  const handleChange = (index, value) => {
    setFormData((prevFormData) =>
      prevFormData.map((item, i) =>
        i === index ? { ...item, talk_content: value } : item
      )
    );
    handleAdd();
  };
  return (
    <Container>
      {formData.map((item, index) => {
        return (
          <div key={index}>
            <Select
              defaultValue={item.talker}
              value={item.talker}
              onChange={(e) => {
                setFormData((prevFormData) =>
                  prevFormData.map((item, i) =>
                    i === index ? { ...item, talker: e.target.value } : item
                  )
                );
              }}
              fullWidth
              label="說話人物"
            >
              <MenuItem value="旁白">旁白</MenuItem>
              <MenuItem value="角色A">角色A</MenuItem>
              <MenuItem value="角色B">角色B</MenuItem>
            </Select>
            <TextField
              defaultvalue={item.talk_content}
              value={item.talk_content}
              onChange={(e) => {
                setFormData((prevFormData) =>
                  prevFormData.map((item, i) =>
                    i === index
                      ? { ...item, talk_content: e.target.value }
                      : item
                  )
                );
              }}
              fullWidth
              label="對話內容"
              multiline
              rows={4}
            />
          </div>
        );
      })}
      <Button variant="contained" color="primary" onClick={handleAdd}>
        新增下句對話
      </Button>
      <Button variant="contained" color="primary" onClick={sumbitSave}>
        save
      </Button>
    </Container>
    // </Dialog>
  );
};

export default TalkScene;
