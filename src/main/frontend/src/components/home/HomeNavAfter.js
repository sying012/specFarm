import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/home/Home.module.css";

const HomeNavAfter = () => {
  return (
    <header className="header">
      <div className="innerheader">
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
        <nav className="catwrap">
          <div></div>
          <div>
            <a className="catStyle">자격증 찾기</a>
          </div>
          <div>
            <a className="catStyle">성장창고</a>
          </div>
          <div>
            <a className="catStyle">커뮤니티</a>
          </div>
          <div>
            <a className="catStyle">공지사항</a>
          </div>
          <div></div>
        </nav>
        <div className="tailwrap">
          <div className="loginbtn"></div>
          <div className="joinbtn"></div>
        </div>
      </div>
    </header>
  );
};

export default HomeNavAfter;
