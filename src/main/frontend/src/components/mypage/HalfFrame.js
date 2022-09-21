import { West } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import styles from "../../styles/mypage/HalfFrame.module.css";
import ResetPw from "./ResetPw";
import Userinfo from "./Userinfo";
import Written from "./Written";

function HalfFrame({ text, certs, asks, shares, user }) {
  let content;

  if (text === "농부 정보 수정") {
    content = <Userinfo certs={certs} user={user} />;
  } else if (text === "내가 쓴 글") {
    content = <Written asks={asks} shares={shares} user={user} />;
  } else {
    content = <ResetPw user={user} />;
  }

  return (
    <div className={styles.mypageInnerContainer}>
      <div className={styles.frameTitle}>
        <IconButton aria-label="main" href="/mypage">
          <West className={styles.backBtn} />
        </IconButton>
        <h2>{text}</h2>
      </div>
      <div className={styles.frameContent}>
        <div className={styles.innerContainer}>{content}</div>
      </div>
    </div>
  );
}

export default HalfFrame;
