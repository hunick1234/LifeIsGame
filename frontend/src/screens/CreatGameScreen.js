import React, { useState, useEffect } from "react";

import ScenesWrapper from "../components/ScenesWrapper";
import { Button } from "react-bootstrap";
import styles from "../assets/css/creatGame.module.css";
import { GET_USERINFO } from "../API";

//根據輸入 決定頁面
/**
 * scenes=[id,scenesType]
 *
 * @param {*} props
 * @returns
 */
const CreatGameScreen = () => {
  useEffect(() => {
    async function fetchData() {
      let pgaeInfo = await fetch(GET_USERINFO, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return pgaeInfo;
    }
    fetchData();
  }, []);

  const [levellist, setLevellist] = useState([]);
  const [title, setTitle] = useState("關卡名稱");
  const creatLevel = () => {
    setLevellist([...levellist, { title: 0 }]);
  };

  return (
    <>
      <div className={` CreatGameScreen back row`} id="df">
        {levellist.map(
          (key, index) => (
            console.log(key),
            (
              <div key={key} className="col-xl-3">
                <ScenesWrapper title={title}></ScenesWrapper>
              </div>
            )
          )
        )}
      </div>
      <Button onClick={creatLevel}>新關卡</Button>
    </>
  );
};
export default CreatGameScreen;
