import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const UserSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "您的遊戲",
    path: "./games",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },

  {
    title: "用戶資訊",
    path: "",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];