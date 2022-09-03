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

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("/cert");
  const [pageComponent, setPageComponent] = useState(<CertMain />);

  useEffect(() => {
    return () => {
      for (let i = 0; i < scrollInterval; i++) {
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
  document.getElementsByTagName("body")[0].style.overflowY = "scroll";

  // wheel event
  const wheelEvent = (e) => {
    if (e.deltaY >= 0) {
      fnScrollInterval();
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
    console.log(click.target.id);
    switch (click.target.id) {
      case "1":
        setPage("/cert");
        setPageComponent(<CertMain />);
        break;
      case "2":
        setPage("/skills");
        setPageComponent(<SkillsMain />);
        break;
      case "3":
        setPage("/community");
        setPageComponent(<CommunityMain />);
        console.log("dkdkd");
        break;
      case "4":
        setPage("/cs");
        setPageComponent(<NoticeMain />);
        break;
      default:
        break;
    }

    //fnScrollInterval();
    window.scrollTo({ top: window.innerHeight - 70, behavior: "smooth" });
  };

  // scroll event
  window.onscroll = () => {
    if (window.scrollY >= window.innerHeight - 71) {
      clearInterval(scrollInterval);
      navigate(page);
      window.onscroll = () => {};
    }
  };

  return (
    <>
      <div className={styles.outer} onWheel={wheelEvent}>
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
          <HomeNav goClickPage={goClickPage} id="homeNav" />
          <main className="main">{pageComponent}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
