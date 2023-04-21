/**
 * 此為對話內容顯示畫面
 */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const TalkScene = ({getTitle}) => {
  const [title, setTitle] = useState('talkScene');
  const [talkContext,setTalkContext]=useState('')
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8080/api/v1/game", {
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

  
  const reTitle=(params) =>{
    setTitle(params)
    getTitle(title)
  }


  // return(
  //   <div>{talk}</div>
  // )
  return (
    <Form className="mx-auto" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="輸入標題"
          value={title}
          onChange={(e) => (reTitle(e.target.value))
            
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> 文本內容</Form.Label>
        <textarea
          name="postContent"
          placeholder="輸入對話內容"
          value={talkContext}
          onChange={(e)=>{
            setTalkContext(e.target.value)
          
          }}
          rows={4}
          cols={40}
        />
      </Form.Group>
      
      <Button type='sumbit' variant="primary" >
        save
      </Button>
    </Form>
  );
};

export default TalkScene;