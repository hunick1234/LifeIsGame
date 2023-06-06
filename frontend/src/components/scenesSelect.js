import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import shortid from "shortid";
import { Box } from "@mui/material";

/**
 * 使用者選擇 活動類型 並輸入對應的內容
 * 對話畫面: 標題、圖片、內容
 */
const ScenesSelect = ({ addNewScene }) => {
  const [scenesType, setScenesType] = useState("");
  //const scenesType = useRef("");
  const addNewPage = (e) => {
    //e.preventDefault();
    if (scenesType === "") {
      //setScenesType("");
      return;
    }
    let id = shortid.generate();
    addNewScene(scenesType, id);
    setScenesType("");
  };
  useEffect(() => {
    addNewPage();
  }, [scenesType]);

  return (
    <>
      <Form.Select
        value={scenesType}
        onChange={(e) => {
          setScenesType(e.target.value);
        
        }}
        aria-label="Default select example"
      >
        <option value="">請選擇你的頁面</option>
        <option value="talk">對話</option>
        <option value="option">Other option</option>
      </Form.Select>

      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        {/* <Button onClick={addNewPage} variant="secondary">
          新增頁面
        </Button> */}
      </Box>
    </>
  );
};

export default ScenesSelect;
