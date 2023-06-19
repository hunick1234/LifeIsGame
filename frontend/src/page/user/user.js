import React, { useEffect } from "react";
import "../../assets/css/user/userInfo.css"; // 引入使用者詳細資訊的 CSS 樣式
import { GET_USERINFO } from "../../API";
const User = () => {
  useEffect(() => {
    const userInfo = async () => {
      let rep = await fetch(GET_USERINFO, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      let data = await rep.json();
      console.log(data);
    };
    userInfo();
  }, []);

  const user = {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/300",
    creationDate: "2021/10/10",
    playCount: 10,
    gamesOwned: 5,
  };
  return (
    <div className="user-details-container">
      <div className="user-info">
        <h3>
          <div className="user-name">{user.name}</div>
        </h3>
      </div>
      <div className="user-stats">
        <ul>
          <li>創建日期: {user?.creationDate}</li>
          <li>遊玩次數: {user?.playCount}</li>
          <li>擁有遊戲: {user?.gamesOwned}</li>
          <li>其他...</li>
        </ul>
      </div>
    </div>
  );
};

export default User;
