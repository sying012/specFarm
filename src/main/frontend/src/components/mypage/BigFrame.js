import ProfileMdf from "./ProfileMdf";
import Deactivate from "./Deactivate";
import CheckPw from "./CheckPw";

import styles from "../../styles/mypage/BigFrame.module.css";

const BigFrame = ({ text }) => {
  let content;
  if (text === "프로필 수정") {
    content = <ProfileMdf />;
  } else if (text === "회원탈퇴") {
    content = <Deactivate />;
  } else {
    content = <CheckPw />;
  }

  return (
    <div className={styles.outsideContainer}>
      <div className={styles.mdfContainer}>{content}</div>
    </div>
  );
};

export default BigFrame;
