import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/home/Home.module.css";

const HomeNav = ({ goClickPage }) => {
  const commRef = useRef();
  const noticeRef = useRef();

  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");

  return (
    <header className={styles.homeNav}>
      <div className="innerheader">
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
        <nav className="catwrap">
          <div></div>
          {/* 자격증 찾기 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <a
              className={styles.catStyle}
              id="1"
              onClick={(e) => goClickPage(e)}
            >
              자격증 찾기
            </a>
          </div>

          {/* 세미나 메뉴 */}
          <div
            // style={{ marginLeft: "10px" }}
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <a
              className={styles.catStyle}
              id="2"
              onClick={(e) => goClickPage(e)}
            >
              Skills(미정)
            </a>
          </div>

          {/* 커뮤니티 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(1);
              setnoticeHover(0);
              setCommName("마을회관");
              setNoticeName("공지사항");
            }}
            onMouseOut={() => {
              setcommHover(0);
              setCommName("커뮤니티");
            }}
          >
            <a
              className={styles.catStyle}
              id="3"
              onClick={(e) => goClickPage(e)}
            >
              {commName}
            </a>
            {commHover ? <div className="communityMenu" /> : ""}
          </div>

          {/* 공지사항 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(1);
              setCommName("커뮤니티");
              setNoticeName("마을소식");
            }}
          >
            <a
              className={styles.catStyle}
              id="4"
              onClick={(e) => goClickPage(e)}
            >
              {noticeName}
            </a>
            {noticeHover ? (
              <div
                className="noticeMenu"
                onMouseOut={() => {
                  setnoticeHover(0);
                  setCommName("커뮤니티");
                  setNoticeName("공지사항");
                }}
                onMouseOver={() => {
                  setcommHover(0);
                  setnoticeHover(0);
                  setCommName("커뮤니티");
                  setNoticeName("공지사항");
                }}
              />
            ) : (
              ""
            )}
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

export default HomeNav;
