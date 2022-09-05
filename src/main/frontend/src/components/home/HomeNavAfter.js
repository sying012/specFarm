import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/home/Home.module.css";

const HomeNavAfter = ({ goClickPage }) => {
  const commRef = useRef();
  const noticeRef = useRef();

  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");

  return (
    <header className="header">
      <div className="innerheader">
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
        <nav className="catwrap">
          <div></div>
          {/* 자격증 찾기 메뉴 */}
          <div>
            <a className="catStyle">자격증 찾기</a>
          </div>

          {/* 세미나 메뉴 */}
          <div>
            <a className="catStyle">Skills(미정)</a>
          </div>

          {/* 커뮤니티 메뉴 */}
          <div>
            <a className="catStyle">커뮤니티</a>
          </div>

          {/* 공지사항 메뉴 */}
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
