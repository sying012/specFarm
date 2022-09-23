import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { logout } from "../service/ApiService";
import { API_BASE_URL } from "../app-config";
import axios from "axios";

const Home = () => {
  const isAuthenticated = !!sessionStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const [page, setPage] = useState("/cert");
  const [pageComponent, setPageComponent] = useState(<CertMain />);
  const [loginedUser, setLoginedUser] = useState({});

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
    };
  }, []);

  let scrollInterval;

  // body scroll
  useEffect(() => {
    document.getElementById("wheel").onwheel = { wheelEvent };
    if (window.innerHeight <= 786) {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
      document.getElementById("wheel").removeEventListener("wheel", wheelEvent);
    } else {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      document.getElementById("wheel").addEventListener("wheel", wheelEvent);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerHeight <= 786) {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
      document.getElementById("wheel").removeEventListener("wheel", wheelEvent);
    } else {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      document.getElementById("wheel").addEventListener("wheel", wheelEvent);
    }
  });

  const [show, setShow] = useState(true);
  // wheel event
  let count = 1;
  const wheelEvent = (e) => {
    console.log("이게 아니야?");
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
    if (window.scrollY >= window.innerHeight - 105) {
      document.getElementById("logoLink").style.color = "#1d5902";
      document.getElementById("leftLink").style.color = "black";
      document.getElementById("rightLink").style.color = "black";
    }
    if (window.scrollY >= window.innerHeight - 71) {
      clearInterval(scrollInterval);
      navigate(page);
      window.onscroll = () => {};
    }
  };

  return (
    <>
      <div
        className={styles.outer}
        id="wheel"
        // onWheel={wheelEvent}
      >
        <header className={styles.header} style={{ position: "fixed" }}>
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
                    style={{ fontSize: "14px" }}
                  >
                    로그인
                  </Link>
                ) : (
                  <Link
                    to="/mypage"
                    className={styles.mypageLink}
                    id="leftLink"
                  >
                    <img
                      src={
                        Object.keys(loginedUser).length !== 0
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
            </div>
          </div>
        </header>
        <Main className={styles.content} />
      </div>
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
    </>
  );
};

export default Home;
