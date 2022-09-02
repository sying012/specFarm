import { Link } from "react-router-dom";
import styles from "../styles/skills/SkillsMain.module.css";

function SkillsMain() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <Link to="/skills/jobcafe">일자리 카페 바로가기</Link>
        <br />
        <Link to="/skills/findcourse">직업훈련탐색 바로가기</Link>
      </div>
    </div>
  );
}

export default SkillsMain;
