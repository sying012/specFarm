import React from "react";
import styles from "../styles/cert/CertFind.module.css";

const CertFind = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">자격증 찾기</div>
      </div>
      <div className={styles.certContainer}></div>
    </div>
  );
};

export default CertFind;
