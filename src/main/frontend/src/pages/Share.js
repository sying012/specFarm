import React from "react";
import "../styles/share/share.css";
import "../styles/share/insertShare.css";
import Carousel from "../components/share/Carousels";
import InsertShare from "../components/share/InsertShare";

const Share = () => {
  return (
    <main>
      <h1>마을회관</h1>
      <h3>나눔 장터🤝</h3>
      <div className="shareBox">
        <div className="carousel">
          <Carousel></Carousel>
        </div>
        <InsertShare></InsertShare>
      </div>
    </main>
  );
};

export default Share;
