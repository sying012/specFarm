import React, { useRef, useState } from "react";

const HomeHeader = () => {
  const commRef = useRef();
  const noticeRef = useRef();

  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");

  return (
    <header className="header">
      <div className="innerheader">
        <div style={{ width: "270px" }} />
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
            <a href="/cert">자격증 찾기</a>
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
            <a href="/seminar">세미나</a>
          </div>
          <div
            onMouseOver={() => {
              setcommHover(1);
              setnoticeHover(0);
              setCommName("마을회관");
              setNoticeName("공지사항");
            }}
          >
            <a href="/community" ref={commRef}>
              {commName}
            </a>
            {commHover ? (
              <div
                className="communityMenu"
                onMouseOut={() => {
                  setcommHover(0);
                  setCommName("커뮤니티");
                }}
              >
                <div className="commCat">
                  <a className="commItem" href="/community/study">
                    지식 품앗이
                  </a>
                  <a className="commItem" href="/community/ask">
                    물어방
                  </a>
                  <a className="commItem" href="/community/share">
                    나눔장터
                  </a>
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
            <a href="/notice" ref={noticeRef}>
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
              >
                <div className="noticeCat">
                  <a className="noticeItem" href="/notice">
                    이장님 말씀
                  </a>
                  <a className="noticeItem" href="/notice/faq">
                    FAQ
                  </a>
                  <a className="noticeItem" href="/notice/lost">
                    분실물센터
                  </a>
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
        <div className="tailwrap" />
      </div>
    </header>
  );
};

export default HomeHeader;
