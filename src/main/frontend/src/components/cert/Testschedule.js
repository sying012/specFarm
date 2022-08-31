import React from "react";
import styles from "../../styles/cert/CertFind.module.css";

const TestSchedule = () => {
  return (
    <div>
      <table className={styles.infoTable}>
        <thead>
          <tr>
            <th className={styles.infoHead}>회차</th>
            <th>필기원서 접수</th>
            <th>필기시험</th>
            <th>필기합격 발표</th>
            <th>실기원서 접수</th>
            <th>실기시험</th>
            <th>합격자발표</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.infoBody}>
            <td>2022년 정기 기사 4회</td>
            <td>
              2022.08.16
              <br />~ 2022.08.19
            </td>
            <td>2022.08.16</td>
            <td>2022.08.16</td>
            <td>
              2022.08.16
              <br />~ 2022.08.19
            </td>
            <td>2022.08.16</td>
            <td>
              2022.08.16
              <br /> ~2022.08.16
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.infoButton}>
        <a href="https://www.q-net.or.kr/">
          <button type="button">원서접수</button>
        </a>
      </div>
    </div>
  );
};

export default TestSchedule;
