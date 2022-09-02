import React from "react";
import logo from "../images/logo_green1.png";
import FindId from "../components/findUser/FindId";
import PwReset from "../components/findUser/PwReset";
import styles from "../styles/findUser/findUser.module.css";
import { NavLink } from "react-router-dom";

const FindUser = () => {
  return (
    <div className={styles.margin15}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <NavLink to="/">specFarm</NavLink>
        </div>
        <FindId />
        <PwReset />
      </div>
    </div>
  );
};

export default FindUser;
