import React, { useRef, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "../styles/join/Join.scss";
import CertMain from "./CertMain";
import HomeHeader from "../components/home/HomeHeader";
import Main from "../components/home/Main";

const Home = () => {
  const body = useRef();
  const ssss = <div style={{ background: "green", height: "739px" }}></div>;
  const [page, setPage] = useState(
    <div className="home-div" ref={body} id="scroll">
      <HomeHeader />
      {ssss}
      <Footer />
    </div>
  );

  let [homepage, setHomepage] = useState(<Main />);

  const homeScroll = (window.onscroll = () => {
    if (window.scrollY >= window.innerHeight - 70) {
      setHomepage(<></>);
      setPage(
        <>
          <Header />
          {ssss}
          <Footer />
        </>
      );
    }
  });

  return (
    <>
      {homepage}
      {page}
    </>
  );
};

export default Home;
