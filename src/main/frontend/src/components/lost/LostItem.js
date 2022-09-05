import { Button, createTheme } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/lost/Lost.module.css";

const LostItem = ({ losts }) => {
  const { lostsId } = useParams();
  const lost = losts[lostsId - 1];
  const prev = losts[lostsId - 2];
  const next = losts[lostsId];

  return (
    <>
      <div className={styles.itemMainDiv}>
        <div className={styles.itemdiv}>
          <strong>
            [{lost.lostCat}] {lost.lostItem}, {lost.lostLoc}
          </strong>
          <p>{lost.lostDate}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              border: "1px solid lightgray",
              width: "400px",
              height: "300px",
              margin: "auto 0",
              marginLeft: "20px",
            }}
          ></div>
          <table className={styles.itemtable}>
            <tbody>
              <tr>
                <th>지역</th>
                <td>{lost.brchName}</td>
              </tr>
              <tr>
                <th>지사</th>
                <td>{lost.brchTrthNm}</td>
              </tr>
              <tr>
                <th>장소</th>
                <td>{lost.lostLoc}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{lost.brchTel}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{lost.brchAddr}</td>
              </tr>
              <tr>
                <th>분실물</th>
                <td>{lost.lostItem}</td>
              </tr>
              <tr>
                <th>분실일자</th>
                <td>{lost.lostDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.itemDivB}>
          {prev === undefined ? null : (
            <div>
              <p>이전글</p>
              <NavLink to={`/cs/lost/${prev.id}`} className={styles.otherItem}>
                [{prev.lostCat}] {prev.lostItem},&nbsp;
                {prev.lostLoc}
              </NavLink>
            </div>
          )}
          {next === undefined ? null : (
            <div>
              <p>다음글</p>
              <NavLink to={`/cs/lost/${next.id}`} className={styles.otherItem}>
                [{next.lostCat}] {next.lostItem},&nbsp;
                {next.lostLoc}
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/cs/lost" className={styles.detailListBtn}>
          목록 보기
        </Link>
      </div>
    </>
  );
};

export default LostItem;
