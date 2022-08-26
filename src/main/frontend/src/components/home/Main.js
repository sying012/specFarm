import { Container } from "@mui/material";
import React from "react";
import logo from "../../images/logo_white2_ol.png";
import "../../styles/join/Join.scss";

const Main = () => {
  return (
    <div className="homeBackground" id="scroll">
      <Container component="main">
        <div>
          <img src={logo} className="homeLogo" alt="specfarm-logo" />
        </div>
        <div className="tailwrap">
          <div className="loginbtn">
            <a href="/login">로그인</a>
          </div>
          <div className="joinbtn">
            <a href="/join">회원가입</a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Main;
