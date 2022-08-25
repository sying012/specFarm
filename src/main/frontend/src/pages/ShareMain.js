import React from "react";
import "../styles/share/share.css";
import ShareList from "../components/share/ShareList";

const ShareMain = () => {
  return (
    <main>
      <h1>마을회관</h1>
      <h3>나눔 장터🤝</h3>
      <ShareList></ShareList>
    </main>
  );
};

export default ShareMain;
