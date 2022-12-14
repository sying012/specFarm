import React, { useEffect, useState } from "react";
import styles from "../../styles/cert/CertFind.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const TestSchedule = ({ testList }) => {
  // const [testSc, setTestSc] = useState([
  //   {
  //     test1: "2022년 정기 기사 4회", //회차
  //     test2: `2022.08.16
  //     ~ 2022.08.19`, //원서접수 시작 종료
  //     test3: `2022.08.11`, //필기시험
  //     test4: `2022.08.12`, //필기합격발표
  //     test5: `2022.08.13`, //실기시험 접수 시작 종료
  //     test6: `2022.08.14
  //     ~ 2022.08.19`, //실기시험 시작 종료
  //     test7: `11`, //합격자발표
  //     id: 1,
  //   },
  //   {
  //     test1: "2022년 정기 기사 3회",
  //     test2: `2022.08.13
  //     ~ 2022.08.19`,
  //     test3: `2022.08.13`,
  //     test4: `2022.08.12`,
  //     test5: `2022.08.15
  //     ~ 2022.08.15`,
  //     test6: `2022.08.16
  //     ~ 2022.08.19`,
  //     test7: `2022.08.20`,
  //     id: 2,
  //   },
  // ]);
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
          {testList.map((sc, index) => (
            <tr key={index}>
              <td>{sc.implplannm}</td>
              <td>{`${sc.docregstartdt} ~ ${sc.docregenddt}`}</td>
              <td>{sc.docexamstartdt}</td>
              <td>{sc.docpassdt}</td>
              <td>{`${sc.pracregstartdt} ~ ${sc.pracregenddt}`}</td>
              <td>{`${sc.pracexamstartdt} ~ ${sc.pracexamenddt}`}</td>
              <td>{sc.pracpassstartdt}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
