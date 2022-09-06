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

const Home = () => {
  const isAuthenticated = sessionStorage.getItem("ACCESS_TOKEN") !== "null";
  const navigate = useNavigate();
  const [page, setPage] = useState("/cert");
  const [pageComponent, setPageComponent] = useState(<CertMain />);

  useEffect(() => {
    return () => {
      for (let i = 0; i < 10000; i++) {
        clearInterval(i);
      }
    };
  }, []);

  // Application acceptance schedule
  const [acceptances, setAcceptance] = useState([
    {
      id: 1,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
    {
      id: 2,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
    {
      id: 3,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
  ]);

  // test schedule
  const [tests, setTests] = useState([
    {
      id: 1,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
    {
      id: 2,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
    {
      id: 3,
      title: "2022년 제 32회 정수시설운영관리사 1,2차 동시",
      startDate: "2022.08.29",
      endDate: "2022.09.02",
    },
  ]);

  let scrollInterval;

  // body scroll
  document.getElementsByTagName("body")[0].style.overflowY = "hidden";

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
    if (window.scrollY >= window.innerHeight - 105) {
      document.getElementById("logoLink").style.color = "#1d5902";
      document.getElementById("loginLink").style.color = "black";
      document.getElementById("joinLink").style.color = "black";
    }
    if (window.scrollY >= window.innerHeight - 71) {
      clearInterval(scrollInterval);
      navigate(page);
      window.onscroll = () => {};
    }
  };

  return (
    <>
      <div className={styles.outer} onWheel={wheelEvent}>
        <header className={styles.header} style={{ position: "fixed" }}>
          <div className="innerheader">
            <Link to="/">
              <div className={styles.logo} id="logoLink">
                specFarm
              </div>
            </Link>
            <div className={styles.tailwrap}>
              <div className="loginbtn">
                {isAuthenticated ? (
                  <Link to="/" id="logoutLink" onClick={logout}>
                    로그아웃
                  </Link>
                ) : (
                  <Link to="/login" id="loginLink">
                    로그인
                  </Link>
                )}
              </div>
              <div className="joinbtn">
                {isAuthenticated ? (
                  <Link to="/mypage" id="mypageLink">
                    마이페이지
                  </Link>
                ) : (
                  <Link to="/join" id="joinLink">
                    회원가입
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
        <Main
          className={styles.content}
          acceptances={acceptances}
          tests={tests}
        />
      </div>
      <div className={styles.homeDiv} id="scroll">
        <div
          className="layout"
          style={{ background: "rgba(255, 255, 255, 0.15)" }}
        >
          {show && <HomeNav goClickPage={goClickPage} show={show} />}
          {!show && <HomeNavAfter />}
          <main className="main">{pageComponent}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
