import "../styles/layouts/Header.css";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../service/ApiService";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import {
  AccordionDetails,
  Box,
  List,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [commHover, setcommHover] = useState(0);
  const [commName, setCommName] = useState("커뮤니티");
  const [noticeHover, setnoticeHover] = useState(0);
  const [noticeName, setNoticeName] = useState("공지사항");
  const [skillsHover, setSkillsHover] = useState(0);
  const [loginedUser, setLoginedUser] = useState({});

  const isAuthenticated = !!sessionStorage.getItem("ACCESS_TOKEN");

  const [state, setState] = useState({
    top: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ state, [anchor]: open });
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ padding: "0" }}>
        <Accordion
          expanded={expanded === "panel1"}
          // onChange={handleChange("panel1")}
          sx={{ borderTop: "0" }}
        >
          <NavLink to="/cert" onClick={toggleDrawer("right", false)}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography
                sx={{ fontFamily: "Pretendard-Regular", color: "#0d0d0d" }}
              >
                자격증 찾기
              </Typography>
            </AccordionSummary>
          </NavLink>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
              성장창고
            </Typography>
          </AccordionSummary>
          <NavLink to="/skills/jobcafe" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                일자리 카페
              </Typography>
            </AccordionDetails>
          </NavLink>
          <NavLink
            to="/skills/findcourse"
            onClick={toggleDrawer("right", false)}
          >
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                직업훈련탐색
              </Typography>
            </AccordionDetails>
          </NavLink>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
              마을회관
            </Typography>
          </AccordionSummary>
          <NavLink to="/community/study" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                지식 품앗이
              </Typography>
            </AccordionDetails>
          </NavLink>
          <NavLink to="/community/ask" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                물어방
              </Typography>
            </AccordionDetails>
          </NavLink>
          <NavLink to="/community/share" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                나눔장터
              </Typography>
            </AccordionDetails>
          </NavLink>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
              마을소식
            </Typography>
          </AccordionSummary>
          <NavLink to="/cs" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                이장님 말씀
              </Typography>
            </AccordionDetails>
          </NavLink>
          <NavLink to="/cs/faq" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                FAQ
              </Typography>
            </AccordionDetails>
          </NavLink>
          <NavLink to="/cs/lost" onClick={toggleDrawer("right", false)}>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Pretendard-Regular" }}>
                분실물센터
              </Typography>
            </AccordionDetails>
          </NavLink>
        </Accordion>
      </List>
      {/* <Divider /> */}
      <div className="catBtnLogout">
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
    </Box>
  );

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        // console.log(response.data.user);
        setLoginedUser(response.data.user);
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
            ) : loginedUser.role === "ROLE_ADMIN" ? (
              <Link to="/admin" id="adminLink">
                <div
                  style={{
                    // width: "110px",
                    fontSize: "17px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  관리자페이지
                </div>
              </Link>
            ) : (
              <Link to="/mypage" id="mypageLink">
                {loginedUser.userProfileName && (
                  <img
                    src={
                      Object.keys(loginedUser).length !== 0
                        ? "/upload/profile/" + loginedUser.userProfileName
                        : "/upload/profile/farmer.png"
                    }
                    alt=""
                    className="loginedProfileImg"
                  ></img>
                )}
                <div
                  style={{
                    // width: "110px",
                    fontSize: "17px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {loginedUser.userNick}
                </div>
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
        <button
          className="catBtn"
          onClick={toggleDrawer("right", !state.right)}
        >
          <MenuIcon sx={{ color: "black", fontSize: "xx-large" }} />
        </button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
          sx={{ marginTop: "50px", zIndex: "1" }}
        >
          {list("right")}
        </SwipeableDrawer>
      </div>
    </header>
  );
};

export default Header;
