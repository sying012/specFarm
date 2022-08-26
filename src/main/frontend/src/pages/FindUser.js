import React from "react";
import logo from "../images/logo_green1.png";
import FindId from "../components/findUser/FindId";
import PwReset from "../components/findUser/PwReset";
import styles from "../styles/findUser/findUser.module.css";

const FindUser = () => {
  return (
    <div className={styles.form}>
      <img src={logo} className={styles.logo} alt="specfarm-logo" />
      <FindId />
      <PwReset />
    </div>
  );
};

export default FindUser;
