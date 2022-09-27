import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import HomeNav from "../components/home/HomeNav";
import Main from "../components/home/Main";
import styles from "../styles/home/Home.module.css";
import CertMain from "./CertMain";
import SkillsMain from "./SkillsMain";
import CommunityMain from "./CommunityMain";
import NoticeMain from "./NoticeMain";
import { useNavigate } from "react-router";
import HomeNavAfter from "../components/home/HomeNavAfter";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../service/ApiService";
import { API_BASE_URL } from "../app-config";
import axios from "axios";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Home = () => {
  const isAuthenticated = !!sessionStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const [page, setPage] = useState("/cert");
  const [pageComponent, setPageComponent] = useState(<CertMain />);
  const [loginedUser, setLoginedUser] = useState({});
  const [isScroll, setIsScroll] = useState("");

  const [state, setState] = useState({
    top: false,
    right: false,
  });

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        setLoginedUser(response.data.user);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

  useEffect(() => {
    return () => {
      for (let i = 0; i < 10000; i++) {
        clearInterval(i);
      }
      window.removeEventListener("resize", innerHeight, true);
    };
  }, []);

  let scrollInterval;

  // body scroll
  useEffect(() => {
    document.getElementById("wheel").onwheel = { wheelEvent };
    innerHeight();
    window.addEventListener("resize", innerHeight, true);
  }, []);

  let innerHeight = function () {
    //console.log(this);
    if (window.innerHeight <= 730 || window.innerWidth <= 1200) {
      setIsScroll(true);
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
      document.getElementById("wheel").removeEventListener("wheel", wheelEvent);
      document.getElementById("header").style.position = "static";
      document.getElementById("scrollIcon").style.display = "none";
    } else {
      setIsScroll(false);
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      document.getElementById("wheel").addEventListener("wheel", wheelEvent);
      document.getElementById("scrollIcon").style.display = "flex";
    }
  };

  // window.addEventListener("resize", innerHeight, true);

  const [show, setShow] = useState(true);
  // wheel event
  let count = 1;
  const wheelEvent = (e) => {
    if (e.deltaY >= 0 && count === 1) {
      count++;
      fnScrollInterval();
      setShow(false);
    }
  };

  const fnScrollInterval = () => {
    let position = window.scrollY;

    scrollInterval = setInterval(() => {
      position += 5;
      window.scroll({
        top: position,
      });
    }, 1);
  };

  // home nav click event
  const goClickPage = (click) => {
    switch (click.target.id) {
      case "1":
        setPage("/cert");
        setPageComponent(<CertMain />);
        setShow(false);
        break;
      case "2":
        setPage("/skills");
        setPageComponent(<SkillsMain />);
        setShow(false);
        break;
      case "3":
        setPage("/community");
        setPageComponent(<CommunityMain />);
        setShow(false);
        break;
      case "4":
        setPage("/cs");
        setPageComponent(<NoticeMain />);
        setShow(false);
        break;
      default:
        break;
    }

    //fnScrollInterval();
    window.scrollTo({ top: window.innerHeight - 70, behavior: "smooth" });
  };

  // scroll event
  window.onscroll = () => {
    if (!isScroll) {
      if (window.scrollY >= window.innerHeight - 105) {
        document.getElementById("logoLink").style.color = "#1d5902";
        document.getElementById("leftLink").style.color = "black";
        document.getElementById("rightLink").style.color = "black";
      }
      if (window.scrollY >= window.innerHeight - 71) {
        clearInterval(scrollInterval);
        navigate(page);
        window.onscroll = () => {};
        window.removeEventListener("resize", innerHeight, true);
      }
    }
  };

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
        <Link to="/" onClick={logout} sx={{ marginTop: "20px" }}>
          로그아웃
        </Link>
      </div>
    </Box>
  );

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <div className={styles.outer} id="wheel">
        <div className={styles.homeBackground}>
          <header
            className={styles.header}
            id="header"
            style={{ position: "sticky", top: "0" }}
          >
            <div className="innerheader">
              <Link to="/">
                <div className={styles.logo} id="logoLink">
                  specFarm
                </div>
              </Link>
              <div className={styles.tailwrap}>
                <div className="loginbtn">
                  {!isAuthenticated ? (
                    <Link
                      to="/login"
                      className="loginLink"
                      id="leftLink"
                      style={{ fontSize: "14px", textAlign: "end" }}
                    >
                      로그인
                    </Link>
                  ) : loginedUser.role === "ROLE_ADMIN" ? (
                    <Link
                      to="/admin"
                      className={styles.adminLink}
                      id="leftLink"
                    >
                      <div>관리자페이지</div>
                    </Link>
                  ) : (
                    <Link
                      to="/mypage"
                      className={styles.mypageLink}
                      id="leftLink"
                    >
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
                          maxWidth: "110px",
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
                    <Link to="/join" className="joinLink" id="rightLink">
                      회원가입
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="logoutLink"
                      id="rightLink"
                      onClick={logout}
                    >
                      로그아웃
                    </Link>
                  )}
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
                  sx={{
                    marginTop: "50px",
                    zIndex: "1",
                  }}
                >
                  {list("right")}
                </SwipeableDrawer>
              </div>
            </div>
          </header>
          <Main className={styles.content} />
          <div id="scrollIcon" className={styles.scrollIcon}>
            <div className={styles.scrollDiv}>
              <span style={{ marginTop: "5px", color: "rgb(250, 250, 250)" }}>
                Scroll
              </span>
              <KeyboardDoubleArrowDownIcon
                style={{ fill: "rgb(250, 250, 250)" }}
              />
            </div>
          </div>
        </div>
      </div>
      {isScroll ? (
        <Footer />
      ) : (
        <div className={styles.homeDiv} id="scroll">
          <div
            className="layout"
            style={{ background: "rgba(255, 255, 255, 0.15)" }}
          >
            {show && <HomeNav goClickPage={goClickPage} show={show} />}
            {!show && <HomeNavAfter />}
            <div
              style={{
                background: "rgb(250, 250, 250)",
                width: "100%",
                height: "100%",
              }}
            >
              <main className="main" style={{ height: "90vh" }}>
                {pageComponent}
              </main>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
