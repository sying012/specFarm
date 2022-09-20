import React, { useState } from "react";
import styles from "../../styles/cert/CertFind.module.css";

const TestSchedule = () => {
  const [testSc, setTestSc] = useState([
    {
      test1: "2022년 정기 기사 4회",
      test2: `2022.08.16 
      ~ 2022.08.19`,
      test3: `2022.08.11`,
      test4: `2022.08.12`,
      test5: `2022.08.13`,
      test6: `2022.08.14
      ~ 2022.08.19`,
      test7: `11`,
      id: 1,
    },
    {
      test1: "2022년 정기 기사 3회",
      test2: `2022.08.13 
      ~ 2022.08.19`,
      test3: `2022.08.13`,
      test4: `2022.08.12`,
      test5: `2022.08.15
      ~ 2022.08.15`,
      test6: `2022.08.16
      ~ 2022.08.19`,
      test7: `2022.08.20`,
      id: 2,
    },
  ]);
  return (
    <div>
      <table className={styles.infoTable}>
        <thead className={styles.infoHead}>
          <tr>
            <th style={{ borderTopLeftRadius: "10px" }}>회차</th>
            <th>필기원서 접수</th>
            <th>필기시험</th>
            <th>필기합격 발표</th>
            <th>실기원서 접수</th>
            <th>실기시험</th>
            <th style={{ borderTopRightRadius: "10px" }}>합격자발표</th>
          </tr>
        </thead>
        <tbody className={styles.infoBody}>
          {testSc.map((sc, index) => (
            <tr key={sc.id}>
              <td key={sc.test1 + sc.id}>{sc.test1}</td>
              <td key={sc.test2 + sc.id}>{sc.test2}</td>
              <td key={sc.test3 + sc.id}>{sc.test3}</td>
              <td key={sc.test4 + sc.id}>{sc.test4}</td>
              <td key={sc.test5 + sc.id}>{sc.test5}</td>
              <td key={sc.test6 + sc.id}>{sc.test6}</td>
              <td key={sc.test7 + sc.id}>{sc.test7}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.testInfo}>여기에 시험정보 들어가야함요</div>
      <div>
        <a href="https://www.q-net.or.kr/">
          <button type="button" className={styles.infoButton}>
            원서접수
          </button>
        </a>
      </div>
    </div>
  );
};

export default TestSchedule;
