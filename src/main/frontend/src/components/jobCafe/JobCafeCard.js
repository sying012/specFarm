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
              <p className={styles.cafeName}>{jobCafeItem.cafeName}</p>
              <p className={styles.smplIntro}>{jobCafeItem.smplIntro}</p>
              <p className={styles.useDate}>이용시간: {jobCafeItem.useDate}</p>
              <p className={styles.holiDate}>휴무일: {jobCafeItem.holiDate}</p>
              <p className={styles.guGun}>서울시 {jobCafeItem.guGun}</p>
            </div>
            <img
              src={jobCafeItem.fileName}
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
