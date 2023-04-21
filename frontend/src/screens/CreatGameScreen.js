import React, { useState } from "react";

import ScenesWrapper from "../components/ScenesWrapper";
import { Button } from "react-bootstrap";
import styles from '../assets/css/CreatGame.moudle.css'

//根據輸入 決定頁面
/**
 * scenes=[id,scenesType]
 *
 * @param {*} props
 * @returns
 */
const CreatGameScreen = () => {
  
  const [levellist,setLevellist]=useState([])
  const [title,setTitle]=useState('關卡名稱')
  const creatLevel=()=>{
    setLevellist([...levellist,{title:0}])
  }


  return (
    <>
    <div className={styles.back} >
      {levellist.map((key,index) => (
        console.log(key),
        <div key={key} className='col-xl-3'>
        <ScenesWrapper title={title}></ScenesWrapper>
        </div>
        
      ))
      }
    </div>
    <Button onClick={creatLevel}>新關卡</Button>
    </>
  );
};
export default CreatGameScreen
