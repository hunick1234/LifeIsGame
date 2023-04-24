import React from "react";
import Styles from "D:\\LIG/frontend/src/assets/css/sidebar.module.css"

const GameSideBar = () => {
  return (
    <div className='sidebar'>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="/" className="sidebar-menu-link">
            Home
          </a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/about" className="sidebar-menu-link">
            About
          </a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/contact" className="sidebar-menu-link">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GameSideBar;
