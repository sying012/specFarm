import styles from "../styles/skills/SkillsMain.module.css";

function SkillsMain() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <a href="/skills/jobcafe">
            <h1 className={styles.skillsTitle}>일자리 카페</h1>
          </a>
          <p className={styles.skillsSubTitle}>
            일자리 카페에 대한 다양한 정보를 확인하세요.
          </p>
          <div className={styles.skillsSmallBtn}>
            <div className={styles.skillsBtns}>
              <a href="/skills/jobcafe">지역별</a>
            </div>
            <div className={styles.skillsBtns}>
              <a href="/skills/jobcafe">취업 상담</a>
            </div>
            <div className={styles.skillsBtns}>
              <a href="/skills/jobcafe">AI 모의면접</a>
            </div>
          </div>
          <div className={styles.skillsImgBox1}>
            <img
              src="/upload/skills/improve.png"
              alt="grawth"
              className={styles.growthImg}
            />
          </div>
        </div>
        <div className={styles.subContainer}>
          <a href="/skills/findcourse">
            <h1 className={styles.skillsTitle}>직업훈련탐색</h1>
          </a>
          <p className={styles.skillsSubTitle}>
            직업훈련에 대한 다양한 정보를 확인하세요.
          </p>
          <div className={styles.skillsSmallBtn}>
            <div className={styles.skillsBtns}>
              <a href="/skills/findcourse">지역별</a>
            </div>
            <div className={styles.skillsBtns}>
              <a href="/skills/findcourse">직종별</a>
            </div>
            <div className={styles.skillsBtns}>
              <a href="/skills/findcourse">분야별</a>
            </div>
          </div>
          <div className={styles.skillsImgBox2}>
            <img
              src="/upload/skills/growth.png"
              alt="grawth"
              className={styles.growthImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsMain;
