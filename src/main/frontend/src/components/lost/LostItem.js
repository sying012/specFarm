import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "../../styles/lost/Lost.module.css";

const LostItem = () => {
  const navigate = useNavigate();
  const { rownum } = useParams();
  const { kakao } = window;
  const [losts, setLosts] = useState(useLocation().state.losts);
  const [lost, setLost] = useState({});
  const [prev, setPrev] = useState({});
  const [next, setNext] = useState({});

  useEffect(() => {
    if (losts && rownum) {
      setLost(losts[rownum * 1 - 1]);
      setPrev(losts[rownum * 1 - 2]);
      setNext(losts[rownum * 1]);
    }
  }, [rownum]);

  useEffect(() => {
    kakao.maps.load(() => {
      if (lost) {
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(lost.brchAddr, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${lost.brchTrthName}</div>`,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      }
    });
  }, [rownum, lost]);

  const prevLost = () => {
    navigate(`/cs/lost/${parseInt(rownum) - 1}`, { state: { losts: losts } });
  };

  const nextLost = () => {
    navigate(`/cs/lost/${parseInt(rownum) + 1}`, { state: { losts: losts } });
  };

  return (
    lost && (
      <>
        <div className={styles.itemMainDiv}>
          <div className={styles.itemdiv}>
            <strong>
              [{lost.lostCat}] {lost.lostItem}, {lost.lostLoc}
            </strong>
            <p>
              {lost.lostDate &&
                lost.lostDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}
            </p>
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
              id="map"
            >
              {/* <Map lost={lost} /> */}
            </div>
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
                    {lost.lostDate &&
                      lost.lostDate.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        "$1.$2.$3"
                      )}
                  </td>
                </tr>
                <tr>
                  <th>지사</th>
                  <td>{lost.brchTrthName}</td>
                </tr>
                <tr>
                  <th>지사 전화번호</th>
                  <td>{lost.brchTel}</td>
                </tr>
                <tr>
                  <th>지사 주소</th>
                  <td>{lost.brchAddr}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.itemDivB}>
            {prev === undefined ? null : (
              <div>
                <p>이전글</p>
                <a onClick={prevLost} className={styles.otherItem}>
                  [{prev.lostCat}] {prev.lostItem},&nbsp;
                  {prev.lostLoc}
                </a>
              </div>
            )}
            {next === undefined ? null : (
              <div>
                <p>다음글</p>
                <a onClick={nextLost} className={styles.otherItem}>
                  [{next.lostCat}] {next.lostItem},&nbsp;
                  {next.lostLoc}
                </a>
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
    )
  );
};

export default LostItem;
