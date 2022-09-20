import React from "react";
import styles from "../../styles/login/Loading.module.css";

const Spinner = () => {
  return (
    <div class={styles.loading__container}>
      <div class={styles.loadingcycle}></div>
    </div>
  );
};

export default Spinner;
