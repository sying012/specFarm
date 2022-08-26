import React from "react";
import logo from "../images/logo_green1.png";
import "../styles/join/Join.scss";
import FindId from "../components/findUser/FindId";
import PwReset from "../components/findUser/PwReset";

const FindUser = () => {
  return (
    <div className="joinForm">
      <img src={logo} className="logo" alt="specfarm-logo" />
      <FindId />
      <PwReset />
    </div>
  );
};

export default FindUser;
