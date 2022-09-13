import React from "react";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import styles from "../../styles/lost/Lost.module.css";

const LostItem = ({ parentLostList, parentBrchs }) => {
  const { index } = useParams();
  const lost = parentLostList[index];
  const prev = parentLostList[index * 1 - 1];
  const next = parentLostList[index * 1 + 1];
  const brch = parentBrchs.find((b) => b.brchName === lost.brchName);

  return (
    <>
      <div className={styles.itemMainDiv}>
        <div className={styles.itemdiv}>
          <strong>
            [{lost.lostCat}] {lost.lostItem}, {lost.lostLoc}
          </strong>
          <p>{lost.lostDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}</p>
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
                <th>분실 장소</th>
                <td>{lost.lostLoc}</td>
              </tr>
              <tr>
                <th>분실물</th>
                <td>{lost.lostItem}</td>
              </tr>
              <tr>
                <th>분실일자</th>
                <td>
                  {lost.lostDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}
                </td>
              </tr>
              <tr>
                <th>지사</th>
                <td>{brch.brchTrthName}</td>
              </tr>
              <tr>
                <th>지사 전화번호</th>
                <td>{brch.brchTel}</td>
              </tr>
              <tr>
                <th>지사 주소</th>
                <td>{brch.brchAddr}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.itemDivB}>
          {prev === undefined ? null : (
            <div>
              <p>이전글</p>
              <NavLink
                to={`/cs/lost/${index - 1}`}
                className={styles.otherItem}
              >
                [{prev.lostCat}] {prev.lostItem},&nbsp;
                {prev.lostLoc}
              </NavLink>
            </div>
          )}
          {next === undefined ? null : (
            <div>
              <p>다음글</p>
              <NavLink
                to={`/cs/lost/${parseInt(index) + 1}`}
                className={styles.otherItem}
              >
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
