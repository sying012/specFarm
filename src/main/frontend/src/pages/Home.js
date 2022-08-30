import React, { useEffect, useRef, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import CertMain from "./CertMain";
import HomeNav from "../components/home/HomeNav";
import Main from "../components/home/Main";
import styles from "../styles/home/home.module.css";

const Home = () => {
  const wheelEvent = (e) => {
    // document.documentElement.scrollTop = window.innerHeight;
    if (e.deltaY >= 0)
      window.scrollTo({ top: window.innerHeight, left: 0, behavior: "smooth" });
  };

  const ssss = <div style={{ height: "739px" }}></div>;

  const [page, setPage] = useState(
    <div className={styles.outer} id="aa" onWheel={wheelEvent}>
      <Main className={styles.content} />
      <div className={styles.homeDiv} id="scroll" style={{ height: "100%" }}>
        <HomeNav />
        {ssss}
        <Footer />
      </div>
    </div>
  );

  const homeScroll = (window.onscroll = () => {
    if (window.scrollY >= window.innerHeight - 70) {
      console.log(window.innerHeight - 70);
      // setHomepage(<></>);
      setPage(
        <div style={{ height: "100%" }}>
          <Header />
          {ssss}
          <Footer />
        </div>
      );
    }
  });

  return <>{page}</>;
};

export default Home;
