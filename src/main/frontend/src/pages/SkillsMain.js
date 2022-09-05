import { Link } from "react-router-dom";
import styles from "../styles/skills/SkillsMain.module.css";

function SkillsMain() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <Link to="/skills/jobcafe">
            <h1 className={styles.skillsTitle}>일자리 카페</h1>
            <p className={styles.skillsSubTitle}>
              일자리 카페에 대한 다양한 정보를 확인하세요.
            </p>
            <div className={styles.skillsSmallBtn}>
              <div className={styles.skillsBtns}>
                <p>지역별</p>
              </div>
              <div className={styles.skillsBtns}>
                <p>취업 상담</p>
              </div>
              <div className={styles.skillsBtns}>
                <p>AI 모의면접</p>
              </div>
            </div>
            <div className={styles.skillsImgBox1}>
              <img
                src="/upload/skills/improve.png"
                alt="grawth"
                className={styles.growthImg}
              />
            </div>
          </Link>
        </div>
        <div className={styles.subContainer}>
          <Link to="/skills/findcourse">
            <h1 className={styles.skillsTitle}>직업훈련탐색</h1>
            <p className={styles.skillsSubTitle}>
              직업훈련에 대한 다양한 정보를 확인하세요.
            </p>
            <div className={styles.skillsSmallBtn}>
              <div className={styles.skillsBtns}>
                <p>지역별</p>
              </div>
              <div className={styles.skillsBtns}>
                <p>직종별</p>
              </div>
              <div className={styles.skillsBtns}>
                <p>분야별</p>
              </div>
            </div>
            <div className={styles.skillsImgBox2}>
              <img
                src="/upload/skills/growth.png"
                alt="grawth"
                className={styles.growthImg}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SkillsMain;
