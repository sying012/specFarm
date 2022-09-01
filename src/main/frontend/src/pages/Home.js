import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import HomeNav from "../components/home/HomeNav";
import Main from "../components/home/Main";
import styles from "../styles/home/home.module.css";
import CertMain from "./CertMain";
import SkillsMain from "./SkillsMain";
import CommunityMain from "./CommunityMain";
import NoticeMain from "./NoticeMain";

const Home = () => {
  const boody = useRef();
  document.getElementsByTagName("body")[0].style.overflowY = "scroll";
  const wheelEvent = (e) => {
    if (e.deltaY >= 0)
      window.scrollTo({
        top: window.innerHeight - 70,
        left: 0,
        behavior: "smooth",
      });
  };

  const [homepage, setHomepage] = useState(
    <div className={styles.outer} onWheel={wheelEvent}>
      <Main className={styles.content} />
    </div>
  );

  const [ppp, setPpp] = useState(<CertMain />);

  const goClickPage = (click) => {
    const id = "<" + click.target.id + "/>";
    setPpp(<CommunityMain />);
    boody.current.scrollIntoView({ behavior: "smooth" });
  };

  const [page, setPage] = useState(
    <div className={styles.homeDiv} id="scroll">
      <div className="layout">
        <HomeNav goClickPage={goClickPage} />
        <main className="main">{ppp}</main>
        <Footer />
      </div>
    </div>
  );

  useEffect(() => {
    setPage(
      <div className={styles.homeDiv} id="scroll">
        <div className="layout">
          <HomeNav goClickPage={goClickPage} />
          <main className="main">{ppp}</main>
          <Footer />
        </div>
      </div>
    );
  }, [ppp]);

  const homeScroll = (window.onscroll = () => {
    if (window.scrollY >= window.innerHeight - 70) {
      setHomepage(<></>);
      setPage(
        <div className="layout">
          <Header />
          <main className="main">{ppp}</main>
          <Footer />
        </div>
      );
    }
  });

  return (
    <>
      {homepage}
      <div ref={boody}>{page}</div>
    </>
  );
};

export default Home;
