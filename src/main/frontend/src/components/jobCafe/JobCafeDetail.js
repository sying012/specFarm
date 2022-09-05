import React from "react";
import JobCafeType from "./JobCafeType";
import { Link } from "react-router-dom";
import styles from "../../styles/skills/jobCafeDetail.module.css";

function JobCafeDetail({ jobCafeList }) {
  const jobCafeItem = {
    id: 1,
    cafeName: "서울시청년일자리센터",
    smplIntro: "청년 특화공간 서울시 청년일자리~~~~~~~~~~~~~",
    spaceInfo:
      "다양한 청년들의 공간이용을 위해 일자리카페를 통한 무료대관은 수요일만 진행합니다**스페이스 클라우드를 통해 대관하시면 스터디룸과 더불어 대규모 회의와 강연 등으로도 이용할 수 있는 세미나실도 대관 가능합니다.(유료)청년들을 위한 다양한 프로그램도 진행하니 무중력지대 양천 홈페이지 및 블로그를 참고해주세요! 만나야지대(회의실), 배워야지대(세미나실), 상담해야지대 대관은 정규 운영시간 내,비무장지대 및 모여야지대(코워킹스페이스) 및 전체 대관은 운영시간 외 가능합니다.",
    useDate: "공간이용 월~금 09~21시/ 토 09~18시 (구직상담 평일 9~18시 가능)",
    holiDD: "공휴일",
    facltInfo01: "일자리카페 키오스크 설치",
    facltInfo02: "일자리카페 키오스크 설치",
    facltInfo03: "일자리카페 키오스크 설치",
    facltInfo04: "일자리카페 키오스크 설치",
    facltInfo05: "일자리카페 키오스크 설치",
    facltInfo06: "일자리카페 키오스크 설치",
    facltInfo07: "일자리카페 키오스크 설치",
    facltInfo08: "일자리카페 키오스크 설치",
    facltInfo09: "일자리카페 키오스크 설치",
    facltInfo10: "일자리카페 키오스크 설치",
    rsrvSggst01:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst02:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst03:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst04:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst05:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst06:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst07:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst08:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst09:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    rsrvSggst10:
      "※ 대학교 일자리카페는 일자리포털을 통하여 별도 공간 예약을 받지 않습니다.",
    bassaAdres: "서울특별시 용산구 청파로47길 100",
    guGun: "용산구",
    roadAdres: "국민대학교 종합복지관 지하1층 잡카페",
    cafeImg:
      "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    cafeType: "공공시설",
  };

  return (
    <>
      <div className={styles.detailContainer}>
        <JobCafeType />
        <div className={styles.detailHeader}>
          <p className={styles.cafeType}>{jobCafeItem.cafeType}</p>
          <h1 className={styles.cafeName}>{jobCafeItem.cafeName}</h1>
        </div>
        <div className={styles.cafeImg}>
          <img src={jobCafeItem.cafeImg} alt="itemImg" />
        </div>
        <p className={styles.smplIntro}>{jobCafeItem.smplIntro}</p>
        <div className={styles.detailContent}>
          <div className={styles.contentRow}>
            <h4>소개</h4>
            <p>{jobCafeItem.facltInfo01}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>이용 시간</h4>
            <p>{jobCafeItem.useDate}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>휴무일</h4>
            <p>{jobCafeItem.holiDD}</p>
          </div>
          <div className={styles.contentRow}>
            <h4>주소</h4>
            <p>{jobCafeItem.bassaAdres}</p>
          </div>
          <div className={styles.contentRow}>
            <h4></h4>
            <p>{jobCafeItem.roadAdres}</p>
          </div>
          <div className={styles.rsrvCard}>
            <h1>일자리 카페 갈까요?</h1>
            <div className={styles.rsrvCardBtn}>
              <a href="/">예약하러가기</a>
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
            <p>- {jobCafeItem.facltInfo01}</p>
            <p>- {jobCafeItem.facltInfo02}</p>
            <p>- {jobCafeItem.facltInfo03}</p>
            <p>- {jobCafeItem.facltInfo04}</p>
            <p>- {jobCafeItem.facltInfo05}</p>
            <p>- {jobCafeItem.facltInfo06}</p>
            <p>- {jobCafeItem.facltInfo07}</p>
            <p>- {jobCafeItem.facltInfo08}</p>
            <p>- {jobCafeItem.facltInfo09}</p>
            <p>- {jobCafeItem.facltInfo10}</p>
          </div>
          <div className={styles.cafeDetailCard}>
            <h3>예약시 주의사항</h3>
            <p>- {jobCafeItem.rsrvSggst01}</p>
            <p>- {jobCafeItem.rsrvSggst02}</p>
            <p>- {jobCafeItem.rsrvSggst03}</p>
            <p>- {jobCafeItem.rsrvSggst04}</p>
            <p>- {jobCafeItem.rsrvSggst05}</p>
            <p>- {jobCafeItem.rsrvSggst06}</p>
            <p>- {jobCafeItem.rsrvSggst07}</p>
            <p>- {jobCafeItem.rsrvSggst08}</p>
            <p>- {jobCafeItem.rsrvSggst09}</p>
            <p>- {jobCafeItem.rsrvSggst10}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCafeDetail;
