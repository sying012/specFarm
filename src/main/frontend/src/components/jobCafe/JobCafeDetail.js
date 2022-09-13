import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/skills/jobCafeDetail.module.css";

function JobCafeDetail({ jobCafeList }) {
  const { index } = useParams();
  const [jobCafeItem, setjobCafeItem] = useState({});
  useEffect(() => {
    setjobCafeItem(jobCafeList[index]);
  }, []);

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.detailHeader}>
          <p className={styles.cafeType}>{jobCafeItem.CAFE_TYPE_NM}</p>
          <h1 className={styles.cafeName}>{jobCafeItem.CAFE_NM}</h1>
        </div>
        <div className={styles.cafeImg}>
          <img src={jobCafeItem.FILE_NM} alt="itemImg" />
        </div>
        <p className={styles.smplIntro}>{jobCafeItem.SMPL_INTRO}</p>
        <div className={styles.detailContent}>
          <div className={styles.contentRow}>
            <div className={styles.spaceInfo}>
              <h4>소개</h4>
              <p>{jobCafeItem.SPACE_INFRO}</p>
            </div>
          </div>
          <div className={styles.contentRow}>
            <h4>이용 시간</h4>
            <p>{jobCafeItem.USE_DT}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>휴무일</h4>
            <p>{jobCafeItem.HOLI_DD}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>주소</h4>
            <p>{jobCafeItem.BASS_ADRES_CN}</p>
          </div>
          <div className={styles.contentRow}>
            <h4></h4>
            <p>{jobCafeItem.ROAD_ADRES2_CN}</p>
          </div>
          <div className={styles.rsrvCard}>
            <h1>일자리 카페 갈까요?</h1>
            <div className={styles.rsrvCardBtn}>
              <a
                href="https://job.seoul.go.kr/www/jobCafe/jobCafe.do?method=getCafeMain"
                target="_blank"
                rel="noreferrer"
              >
                예약하러가기
              </a>
            </div>
          </div>
        </div>
        <Link to="/skills/jobCafe">
          <div className={styles.detailListBtn}>
            <p>목록 보기</p>
          </div>
        </Link>
        <div className={styles.cafeDetails}>
          <div className={styles.cafeDetailCard}>
            <h3>시설안내</h3>
            <p> {jobCafeItem.FACLT_INFO1}</p>
            <p> {jobCafeItem.FACLT_INFO2}</p>
            <p> {jobCafeItem.FACLT_INFO3}</p>
            <p> {jobCafeItem.FACLT_INFO4}</p>
            <p> {jobCafeItem.FACLT_INFO5}</p>
            <p> {jobCafeItem.FACLT_INFO6}</p>
            <p> {jobCafeItem.FACLT_INFO7}</p>
            <p> {jobCafeItem.FACLT_INFO8}</p>
            <p> {jobCafeItem.FACLT_INFO9}</p>
            <p> {jobCafeItem.FACLT_INF10}</p>
          </div>
          <div className={styles.cafeDetailCard}>
            <h3>예약시 주의사항</h3>
            <p> {jobCafeItem.RSRV_SGGST1}</p>
            <p> {jobCafeItem.RSRV_SGGST2}</p>
            <p> {jobCafeItem.RSRV_SGGST3}</p>
            <p> {jobCafeItem.RSRV_SGGST4}</p>
            <p> {jobCafeItem.RSRV_SGGST5}</p>
            <p> {jobCafeItem.RSRV_SGGST6}</p>
            <p> {jobCafeItem.RSRV_SGGST7}</p>
            <p> {jobCafeItem.RSRV_SGGST8}</p>
            <p> {jobCafeItem.RSRV_SGGST9}</p>
            <p> {jobCafeItem.RSRV_SGGST10}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCafeDetail;
