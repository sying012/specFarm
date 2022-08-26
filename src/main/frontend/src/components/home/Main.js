import { Container } from "@mui/material";
import React from "react";
import logo from "../../images/logo_white2_ol.png";
import styles from "../../styles/home/home.module.css";

const Main = () => {
  return (
    <div className={styles.homeBackground} id="scroll">
      <Container>
        <a href="/">
          <img src={logo} className={styles.homeLogo} alt="specfarm-logo" />
        </a>

        <div className={styles.tailwrap}>
          <div className="loginbtn">
            <a href="/login">로그인</a>
          </div>
          <div className="joinbtn">
            <a href="/join">회원가입</a>
          </div>
        </div>
        <div>
          <p className={styles.subTitle}>
            'Spec Farm'에서
            <br />
            여러분의 스펙을 수확해보세요!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Main;
