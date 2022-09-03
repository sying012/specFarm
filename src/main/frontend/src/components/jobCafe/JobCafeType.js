import React from "react";
import styles from "../../styles/skills/jobCafeType.module.css";

const JobCafeType = () => {
  return (
    <>
      <div className={styles.typeBox}>
        <div className={styles.allTypeBtn}>
          <a href="/">전체</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">공공시설</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">도서관</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">대학교</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">스터디 카페</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">일반 카페</a>
        </div>
        <div className={styles.typeBtns}>
          <a href="/">기타</a>
        </div>
      </div>
    </>
  );
};

export default JobCafeType;
