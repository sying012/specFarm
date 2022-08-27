import { Container, Grid } from "@mui/material";
import React from "react";
import logo from "../../images/logo_green1.png";
import styles from "../../styles/home/home.module.css";

const Main = () => {
  return (
    <div className={styles.homeBackground} id="scroll">
      <Container>
        <div
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <a href="/">
            <img src={logo} className={styles.homeLogo} alt="specfarm-logo" />
          </a>
          <div className={styles.tailwrap}>
            <div className="loginbtn">
              <a href="/login" style={{ color: "black" }}>
                로그인
              </a>
            </div>
            <div className="joinbtn">
              <a href="/join" style={{ color: "black" }}>
                회원가입
              </a>
            </div>
          </div>
        </div>
        <div className={styles.homeContent}>
          <div>
            <p className={styles.subTitle}>
              'Spec Farm'에서
              <br />
              여러분의 스펙을 수확해보세요!
            </p>
          </div>
          <div className={styles.certPlan}>
            <p>로그인창???</p>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            hello
          </Grid>
          <Grid item xs={6}>
            hello
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
