import React from "react";
import FindId from "../components/findUser/FindId";
import PwReset from "../components/findUser/PwReset";
import styles from "../styles/findUser/FindUser.module.css";
import { NavLink } from "react-router-dom";

const FindUser = () => {
  return (
    <div className={styles.center} style={{ background: "rgb(250, 250, 250)" }}>
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
