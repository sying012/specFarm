import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
            <NavLink
              to="/cert"
              className={styles.catStyle}
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              자격증 찾기
            </NavLink>
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
              세미나
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
          >
            <a
              className={styles.catStyle}
              id="2"
              onClick={(e) => goClickPage(e)}
            >
              {commName}
            </a>
            {commHover ? (
              <div
                className="communityMenu"
                onMouseOut={() => {
                  setcommHover(0);
                  setCommName("커뮤니티");
                }}
              />
            ) : (
              ""
            )}
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
            <NavLink
              className={styles.catStyle}
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
              to="/cs"
              id="noticeid"
              // onClick={() => {
              //   setNavActive(1);
              // }}
            >
              {/* {navActive ? "마을소식" : noticeName} */}
              {noticeName}
            </NavLink>
            {noticeHover ? (
              <div
                className="noticeMenu"
                onMouseOut={() => {
                  setnoticeHover(0);
                  setCommName("커뮤니티");
                  setNoticeName("공지사항");
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          ></div>
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
