import React from "react";
import ShareList from "../components/share/ShareList";

const ShareMain = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">나눔 장터🤝</div>
      </div>
      <ShareList></ShareList>
    </div>
  );
};

export default ShareMain;
