import { West } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "../../styles/mypage/Frame.module.css";
import Userinfo from "./Userinfo";
import Written from "./Written";

function Frame(props) {
  let content;

  if(props.text === "회원정보 수정") {
    content = <Userinfo />
  } else {
    content = <Written />
  }

  return (
    <div className={styles.mypageInnerContainer}>
      <div className={styles.frameTitle}>
        <Link to="/mypage">
          <IconButton aria-label="main">
            <West className={styles.backBtn} />
          </IconButton>
        </Link>
        <h2>{props.text}</h2>
      </div>
      <div className={styles.frameContent}>
        <div className={styles.innerContainer}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Frame;
