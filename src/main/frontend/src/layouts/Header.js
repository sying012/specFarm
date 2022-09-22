import "../styles/layouts/Header.css";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../service/ApiService";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

const Header = () => {
  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");
  const [skillsHover, setSkillsHover] = useState(0);
  const [loginedUser, setLoginedUser] = useState({});

  const isAuthenticated = !!sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        // console.log(response.data.user.userId);
        setLoginedUser(response.data);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

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
              성장창고
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
                    일자리카페
                  </Link>
                  <Link className="skillsItem" to="/skills/findcourse">
                    직업훈련탐색
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
            {!isAuthenticated ? (
              <Link to="/login" id="loginLink" style={{ fontSize: "14px" }}>
                로그인
              </Link>
            ) : (
              <Link to="/mypage" id="mypageLink">
                <img
                  src={
                    loginedUser.userProfileName !== null
                      ? "/upload/profile/" + loginedUser.userProfileName
                      : "/upload/profile/farmer.png"
                  }
                  alt=""
                  className="loginedProfileImg"
                ></img>
                <div>{loginedUser.userNick}</div>
              </Link>
            )}
          </div>
          <div className="joinbtn">
            {!isAuthenticated ? (
              <Link to="/join" id="joinLink">
                회원가입
              </Link>
            ) : (
              <Link to="/" id="logoutLink" onClick={logout}>
                로그아웃
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
