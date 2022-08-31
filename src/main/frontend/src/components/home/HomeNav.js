import React, { useRef, useState } from "react";
import whitelogo1 from "../../images/logo_white1.png";

const HomeNav = ({ goClickPage }) => {
  const commRef = useRef();
  const noticeRef = useRef();

  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");

  return (
    <header className="header" style={{ background: "none" }}>
      <div className="innerheader">
        <a href="/">
          <img
            className="whitelogo1"
            src={whitelogo1}
            alt="logo"
            style={{ visibility: "hidden" }}
          />
        </a>
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
            <a id="CertMain" onClick={(e) => goClickPage(e)}>
              자격증 찾기
            </a>
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
            <a id="SeminarMain" onClick={(e) => goClickPage(e)}>
              세미나
            </a>
          </div>
          <div
            onMouseOver={() => {
              setcommHover(1);
              setnoticeHover(0);
              setCommName("마을회관");
              setNoticeName("공지사항");
            }}
          >
            <a id="CommunityMain" onClick={(e) => goClickPage(e)} ref={commRef}>
              {commName}
            </a>
            {commHover ? (
              <div
                className="communityMenu"
                onMouseOut={() => {
                  setcommHover(0);
                  setCommName("커뮤니티");
                }}
              ></div>
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
            <a id="Notice" onClick={(e) => goClickPage(e)} ref={noticeRef}>
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
              ></div>
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
        <div className="tailwrap" style={{ visibility: "hidden" }}>
          <div className="loginbtn">
            <a href="/login">로그인</a>
          </div>
          <div className="joinbtn">
            <a href="/join">회원가입</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeNav;
