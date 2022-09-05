import "../styles/layouts/Header.css";
import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { boxSizing, display } from "@mui/system";

const Header = () => {
  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");
  const [skillsHover, setSkillsHover] = useState(0);

  return (
    <header className="header">
      <div className="innerheader">
        <Link to="/">
          <div className="logo">specFarm</div>
        </Link>
        <nav className="catwrap">
          <div></div>
          {/* 자격증 찾기 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setSkillsHover(0);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <NavLink
              to="/cert"
              className="catStyle"
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              자격증 찾기
            </NavLink>
          </div>

          {/* 스킬즈 메뉴 */}
          <div
            // style={{ marginLeft: "10px" }}
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(0);
              setSkillsHover(1);
              setCommName("커뮤니티");
              setNoticeName("공지사항");
            }}
          >
            <NavLink
              className="catStyle"
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
              to="/skills"
            >
              Skills(미정)
            </NavLink>
            {skillsHover ? (
              <div
                className="skillsMenu"
                onMouseOut={() => {
                  setSkillsHover(0);
                }}
              >
                <div className="skillsCat">
                  <Link className="skillsItem" to="/skills/jobcafe">
                    일자리 CaFe
                  </Link>
                  <Link className="skillsItem" to="/skills/findcourse">
                    직Up훈련탐색
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* 커뮤니티 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(1);
              setnoticeHover(0);
              setSkillsHover(0);
              setCommName("마을회관");
              setNoticeName("공지사항");
            }}
          >
            <NavLink
              className="catStyle"
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
              to="/community"
            >
              {commName}
            </NavLink>
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

          {/* 공지사항 메뉴 */}
          <div
            onMouseOver={() => {
              setcommHover(0);
              setnoticeHover(1);
              setSkillsHover(0);
              setCommName("커뮤니티");
              setNoticeName("마을소식");
            }}
          >
            <NavLink
              className="catStyle"
              style={({ isActive }) => ({
                // borderBottom: isActive ? "2px solid black" : "",
              })}
              to="/cs"
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
              >
                <div className="noticeCat">
                  <Link className="noticeItem" to="/cs">
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
              setSkillsHover(0);
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
