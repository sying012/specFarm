import React from "react";
import "../styles/share/insertShare.css";
import Carousel from "../components/share/Carousels";
import InsertShare from "../components/share/InsertShare";

const Share = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">나눔 장터🤝</div>
      </div>
      <div className="shareBox">
        <div className="carousel">
          <Carousel></Carousel>
        </div>
        <InsertShare></InsertShare>
      </div>
    </div>
  );
};

export default Share;
