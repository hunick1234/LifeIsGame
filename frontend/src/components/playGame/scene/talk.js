import React from "react";
import PropTypes from "prop-types";
import styles from "./talk.module.css";

const talk = ({ content, step }) => {
  //content=[{talker:"a",content:"hi"},{talker:":b" content:"hi"}....]

  console.log(content, content?.length);

  if (step >= content?.length) {
    return -1; //next scene
  }
  
  const { stalker, scontent } = content[step];

  return (
    <div>
      <img
        src="background.jpg"
        alt="Background"
        className={styles.backgroundImg}
      />
      <div className={styles.dialogueBox}>
        <span className={styles.characterName}>{stalker}</span>
        <p className={styles.dialogue}>{scontent}</p>
      </div>
      ;{/* <div className={styles.clickArea}></div> */}
    </div>
  );
};

talk.propTypes = {};

export default talk;
