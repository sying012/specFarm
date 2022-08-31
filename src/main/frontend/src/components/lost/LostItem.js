import React from "react";
import styles from "../../styles/lost/Lost.module.css";

const LostItem = () => {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>지사</th>
          </tr>
        </thead>
        <tbody>
          <table className={styles.table} style={{ maxWidth: "90%" }}>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>서울</td>
            </tr>
          </table>
          {/* {losts.map((lost) => (
            <tr
              key={lost.id}
              onClick={() => {
                window.location = "./lost/1";
              }}
            >
              <td className={styles.brchName}>{lost.brchName}</td>
              <td>
                [{lost.lostCat}] {lost.lostItem}
              </td>
              <td className={styles.lostLoc}>{lost.lostLoc}</td>
              <td className={styles.lostDate}>{lost.lostDate}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default LostItem;
