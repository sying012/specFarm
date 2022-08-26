import { ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import styles from "../../styles/mypage/Userinfo.module.css";

function Userinfo() {
  return (
    <div>
      <div className={styles.userinfo}>
        <h1>회원 정보</h1>
        <Button
          color="secondary"
          component="label"
          style={{ fontSize: "1em", color: "gray", fontWeight: 600 }}
          endIcon={<ArrowForwardIos color="action" />}
        >
          회원탈퇴
        </Button>
      </div>
      <div className={styles.editInfo}></div>
      <hr />
      <div className={styles.userinfo}>
        <h1>취득한 자격증</h1>
        <div></div>
      </div>
    </div>
  );
}

export default Userinfo;
