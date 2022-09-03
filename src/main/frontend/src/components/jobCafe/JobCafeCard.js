import React from "react";
import styles from "../../styles/skills/jobCafeCard.module.css";
import { Link } from "react-router-dom";

const JobCafeCard = ({ jobCafeItem }) => {
  const { id, cafeName, smplIntro, useDate, guGun, cafeImg } = jobCafeItem;

  return (
    <>
      <Link to={`/skills/jobCafe/${id}`}>
        <div className={styles.cards}>
          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <p className={styles.cafeName}>{cafeName}</p>
              <p className={styles.smplIntro}>{smplIntro}</p>
              <p className={styles.guGun}>{guGun}</p>
            </div>
            <img src={cafeImg} alt="img" className={styles.cafeImg} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default JobCafeCard;
