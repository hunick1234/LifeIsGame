import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

/**
 * 使用者選擇 活動類型 並輸入對應的內容
 * 對話畫面: 標題、圖片、內容
 *
 */
const ScenesSelect = ({ addNewScene }) => {
  const [scenesType, setScenesType] =useState('');
  //const scenesType = useRef("");
  const addNewPage = (e) => {
    e.preventDefault();
    if (scenesType === "") {
      return;
    }
    addNewScene(scenesType);
    setScenesType("");
  };

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

      <Button onClick={addNewPage} variant="secondary">
        新增頁面
      </Button>
    </>
  );
};

export default ScenesSelect;
