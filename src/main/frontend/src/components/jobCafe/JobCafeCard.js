import React, { useEffect } from "react";
import styles from "../../styles/skills/jobCafeCard.module.css";
import { Link } from "react-router-dom";

const JobCafeCard = ({ index, jobCafeItem }) => {
  return (
    <>
      <Link to={`/skills/jobCafe/${index}`}>
        <div className={styles.cards}>
          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <p className={styles.cafeName}>{jobCafeItem.CAFE_NM}</p>
              <p className={styles.smplIntro}>{jobCafeItem.SMPL_INTRO}</p>
              <p className={styles.useDate}>이용시간: {jobCafeItem.USE_DT}</p>
              <p className={styles.holiDate}>휴무일: {jobCafeItem.HOLI_DD}</p>
              <p className={styles.guGun}>서울시 {jobCafeItem.GUGUN}</p>
            </div>
            <img
              src={jobCafeItem.FILE_NM}
              alt="img"
              className={styles.cafeImg}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default JobCafeCard;
