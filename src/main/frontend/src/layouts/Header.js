import "../styles/layouts/Header.css";
import whitelogo1 from "../images/logo_white1.png";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <img className="whitelogo1" src={whitelogo1} alt="" />
        </Link>
        <nav className="catwrap">
          <div></div>
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <Link to="/cert">자격증 찾기</Link>
          </div>

          <div
            style={{ marginLeft: "10px" }}
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <Link to="/seminar">세미나</Link>
          </div>
          <div
            onMouseOver={() => {
              setcommHover(1);
              setnoticeHover(0);
              setCommName("마을회관");
              setNoticeName("공지사항");
            }}
          >
            <Link to="/community" ref={commRef}>
              {commName}
            </Link>
            {commHover ? (
              <div
                className="communityMenu"
                onMouseOut={() => {
                  setcommHover(0);
                  setCommName("커뮤니티");
                }}
              >
                <div className="commCat">
                  <Link className="commItem" to="/community/study">
                    지식 품앗이
                  </Link>
                  <Link className="commItem" to="/community/ask">
                    물어방
                  </Link>
                  <Link className="commItem" to="/community/share">
                    나눔장터
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(1);
              setCommName("커뮤니티");
              setNoticeName("마을소식");
            }}
          >
            <Link to="/cs/notice" ref={noticeRef}>
              {noticeName}
            </Link>
            {noticeHover ? (
              <div
                className="noticeMenu"
                onMouseOut={() => {
                  setnoticeHover(0);
                  setCommName("커뮤니티");
                  setNoticeName("공지사항");
                }}
              >
                <div className="noticeCat">
                  <Link className="noticeItem" to="/cs/notice">
                    이장님 말씀
                  </Link>
                  <Link className="noticeItem" to="/cs/faq">
                    FAQ
                  </Link>
                  <Link className="noticeItem" to="/cs/lost">
                    분실물센터
                  </Link>
                </div>
              </div>
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
          <div className="loginbtn">
            <Link to="/login">로그인</Link>
          </div>
          <div className="joinbtn">
            <Link to="/join">회원가입</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
