import React, { useState, useEffect } from "react";

import ScenesWrapper from "../components/ScenesWrapper";
import { Button } from "react-bootstrap";
import styles from "../assets/css/creatGame.module.css";
import { GET_USERINFO } from "../API";
import shortid from "shortid";

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
    let id = shortid.generate();
    setLevellist([...levellist, { title: 0, id: id }]);
  };

  //delet level
  const deleteLevel = (id) => {
    const reLevel = levellist.filter((level) => id !== level.id);
    setLevellist(reLevel);
  };
  return (
    <>
      <div className={`CreatGameScreen back row`} id="df">
        {levellist.map((key, index) => (
          <div key={key.id} className="col-xl-3">
            {console.log(key)}
            <ScenesWrapper
              key={key.id}
              id={key.id}
              title={title}
              deleteLevelListener={deleteLevel}
            ></ScenesWrapper>
          </div>
        ))}
      </div>
      <Button onClick={creatLevel}>新關卡</Button>
    </>
  );
};
export default CreatGameScreen;
