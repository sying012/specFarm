import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/skills/jobCafeDetail.module.css";

function JobCafeDetail({ jobCafeList }) {
  const { index } = useParams();
  const [jobCafeItem, setjobCafeItem] = useState({});
  useEffect(() => {
    //카드 선택시 주소가 jobCafeItem.jobCafeIdx(1)이라 -1
    setjobCafeItem(jobCafeList[index - 1]);
  }, [index, jobCafeList]);

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.detailHeader}>
          <p className={styles.cafeType}>{jobCafeItem.cafeTypeName}</p>
          <h1 className={styles.cafeName}>{jobCafeItem.cafeName}</h1>
        </div>
        <div className={styles.cafeImg}>
          <img src={jobCafeItem.fileName} alt="itemImg" />
        </div>
        <p className={styles.smplIntro}>{jobCafeItem.smplIntro}</p>
        <div className={styles.detailContent}>
          <div className={styles.contentRow}>
            <div className={styles.spaceInfo}>
              <h4>소개</h4>
              <p>{jobCafeItem.spaceInfo}</p>
            </div>
          </div>
          <div className={styles.contentRow}>
            <h4>이용 시간</h4>
            <p>{jobCafeItem.useDate}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>휴무일</h4>
            <p>{jobCafeItem.holiDate}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>주소</h4>
            <p>{jobCafeItem.bassAdresCn}</p>
          </div>
          <div className={styles.contentRow}>
            <h4></h4>
            <p>{jobCafeItem.roadAdresCn}</p>
          </div>
          <div className={styles.rsrvCard}>
            <h1>일자리 카페 갈까요?</h1>
            <div className={styles.rsrvCardBtn}>
              <a
                href="https://job.seoul.go.kr/www/jobCafe/jobCafe.do?method=getCafeView"
                target="_blank"
                rel="noreferrer"
              >
                예약하러가기
              </a>
            </div>
          </div>
        </div>
        <Link to="/skills/jobcafe">
          <div className={styles.detailListBtn}>
            <p>목록 보기</p>
          </div>
        </Link>
        <div className={styles.cafeDetails}>
          <div className={styles.cafeDetailCard}>
            <h3>시설안내</h3>
            <p> {jobCafeItem.facltInfo01}</p>
            <p> {jobCafeItem.facltInfo02}</p>
            <p> {jobCafeItem.facltInfo03}</p>
            <p> {jobCafeItem.facltInfo04}</p>
            <p> {jobCafeItem.facltInfo05}</p>
            <p> {jobCafeItem.facltInfo06}</p>
            <p> {jobCafeItem.facltInfo07}</p>
            <p> {jobCafeItem.facltInfo08}</p>
            <p> {jobCafeItem.facltInfo09}</p>
            <p> {jobCafeItem.facltInfo10}</p>
          </div>
          <div className={styles.cafeDetailCard}>
            <h3>예약시 주의사항</h3>
            <p> {jobCafeItem.rsrvSggst1}</p>
            <p> {jobCafeItem.rsrvSggst2}</p>
            <p> {jobCafeItem.rsrvSggst3}</p>
            <p> {jobCafeItem.rsrvSggst4}</p>
            <p> {jobCafeItem.rsrvSggst5}</p>
            <p> {jobCafeItem.rsrvSggst6}</p>
            <p> {jobCafeItem.rsrvSggst7}</p>
            <p> {jobCafeItem.rsrvSggst8}</p>
            <p> {jobCafeItem.rsrvSggst9}</p>
            <p> {jobCafeItem.rsrvSggst10}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCafeDetail;
