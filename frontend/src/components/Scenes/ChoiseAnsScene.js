/**
 * 此為對話內容顯示畫面
 */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const ChoiseAnsScene = () => {
  const [title, setTitle] = useState('');
  const [talkContext,setTalkContext]=useState('')
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch("http//localhost:8080/api/creatgame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        talkContext
      }),
    });
  };

  const submitSaveHandler=(e)=>{

  }

  // return(
  //   <div>{talk}</div>
  // )
  return (
    <Form className="mx-auto" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>asdfasf</Form.Label>
        <Form.Control
          type="text"
          placeholder="輸入選擇"
          value={title}
          onChange={(e) => (setTitle(e.target.value))
            
          }
        />
      </Form.Group>

     
      <Button variant="primary" onClick={submitSaveHandler}>
        save
      </Button>
    </Form>
  );
};

export default ChoiseAnsScene;
