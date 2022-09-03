import React from "react";
import styles from "../../styles/skills/jobCafeDetail.module.css";
import JobCafeType from "./JobCafeType";

const JobCafeDetail = () => {
  return (
    <div>
      <JobCafeType />
      <div className={styles.containerTop}>
        <p className={styles.jobCafeName}>사랑밭 청년센터</p>
        <button className={styles.delBtn}>삭제</button>
      </div>
      <div className={styles.smplContent}>
        <div className={styles.imgBox}>
          <img
            className={styles.detailImg}
            src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
            alt="img"
          />
        </div>
        <div className={styles.smplIntro}>
          <div className={styles.intro}>
            <p>
              '함께하는 사랑밭'이란 NGO 단체입니다.
              <br></br>
              청년들을 위해서 '사랑밭청년센터'라는 공간을 마련했습니다.
            </p>
          </div>
          <div className={styles.useDate}>
            <p>이용기간 : 2022.9.23 (화) 00:00 ~ 2022.9.19 (금) 12:00</p>
            <p>주소: 서울특별시 중구 삼일대로 363</p>
            <p>문의: 731-9570~9</p>
          </div>
          <div className={styles.rsrveBtn}>
            <a href="/">예약하기</a>
          </div>
        </div>
      </div>
      <div className={styles.cafeInfo}>
        <p className={styles.spaceInfo}>✅ 공간 소개 </p>
        <p className={styles.spaceInfo_P}>
          서울시청년일자리센터 공간이용 안내입니다. 청년 특화공간, 서울시
          청년일자리센터! 청년 취업을 위한 모든 서비스를 제공합니다. 하고싶은
          일도 많고 , 뜨거운 열정을 불태울 준비도 된 당신, 청춘의 한때를
          치열하게 고민하며 길을 찾는 청년의 삶에 함께 하기 위해 서울시가 길을
          나섰습니다. 취업을 위한 준비, 일자리에 관한 정보, 새롭게 열리는 사회
          진출의 길, 그 길을 함께 해줄 선배와 멘토까지 청년의 곁, 가장
          가까이에서 가장 든든한 조력자가 되려 합니다. 도전과 성장으로 활짝 웃는
          청년의 삶, 서울시가 함께 합니다.※ 서울시 청년일자리센터는 청년들이
          취업관련 활동으로 활용하는 공간입니다. 무료 공간은 청년들을 위해서만
          개방되어 있습니다. ※ 쾌적한 공간 운영을 위해 음식 섭취는 불가합니다.※
          주차는 건물 주차장을 유료로 이용가능합니다. 장교빌딩 02-778-4611
        </p>
      </div>
    </div>
  );
};

export default JobCafeDetail;
