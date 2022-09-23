import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/findcourse/CourseDetail.module.css";

const CourseDetail = ({ searchList }) => {
  const { srchTrprId } = useParams();
  const { srchTrprDegr } = useParams();
  const { srchTorgId } = useParams();
  const [course, setCourse] = useState({});
  const [baseInfo, setBaseInfo] = useState({});
  const [detailInfo, setDetailInfo] = useState({});

  useEffect(() => {
    for (let i = 0; i < searchList.length; i++) {
      if (baseInfo.trprId === searchList[i].trprId) {
        setCourse(searchList[i]);
        // setCourse({...course, realMan: course.realMan.replace(/\B(?=(\d{3})+(?!\d))/g, ","),})
        console.log(course);
      }
    }
  }, [baseInfo.trprId, searchList]);

  useEffect(() => {
    axios({
      method: "get",
      url:
        API_BASE_URL +
        `/skills/findcourse/srchTrprId=${srchTrprId}&srchTrprDegr=${srchTrprDegr}&srchTorgId=${srchTorgId}`,
    })
      .then((response) => {
        console.log(response.data.HRDNet);
        setBaseInfo(response.data.HRDNet.inst_base_info);
        setDetailInfo(response.data.HRDNet.inst_detail_info);
      })
      .catch((e) => {
        console.log("catch문 " + e);
        // window.location.href = "/login";
      });
  }, []);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailTitleBackground}></div>
      <div className={styles.detailHeader}>
        <p className={styles.courseOrgName}>{baseInfo.inoNm}</p>
        <h1 className={styles.courseName}>{baseInfo.trprNm}</h1>
      </div>
      <div className={styles.detailContent}>
        <div className={styles.contentRow}>
          <h4>NCS 직무분류</h4>
          <p>
            {baseInfo.ncsNm || "-"}({baseInfo.ncsCd || "-"})
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기간</h4>
          <p>
            {course.traStartDate || "-"} ~ {course.traEndDate || "-"} (
            {detailInfo.trprDegr || "-"}
            회차)
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련시간</h4>
          <p>
            {detailInfo.totTraingDyct || "-"}일, 총{" "}
            {detailInfo.totTraingTime || "-"}시간
          </p>
        </div>
        {/* <div className={styles.contentRow}>
          <h4>수강생 평균 만족도</h4>
          <p>{course.courseRate || "-"}</p>
        </div> */}
        <div className={styles.contentRow}>
          <h4>훈련유형</h4>
          <p>{detailInfo.govBusiNm || "-"}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>주관부처</h4>
          <p>{course.superViser || "-"}</p>
        </div>

        <div className={styles.contentRow}>
          <h4>훈련비</h4>
          <p>
            {course.courseMan || "-"}원
            <span className={styles.priceDesc}>
              (실제 부담하시게 될 훈련비는 표시된 금액과 다를 수 있습니다.)
            </span>
          </p>
        </div>

        <div className={styles.applyCard}>
          <h1>수업 들으러 갈까요?</h1>
          <div className={styles.applyCardBtn}>
            <a href={course.titleLink}>수강신청 하러가기</a>
          </div>
        </div>

        <div className={styles.contentRow}>
          <h4>훈련기관명</h4>
          <p>{baseInfo.inoNm}</p>
        </div>
        {/* <div className={styles.contentRow}>
          <h4>훈련기관 직종별 취업률</h4>
          <p>{course.orgHireRate || "-"}%</p>
        </div> */}
        <div className={styles.contentRow}>
          <h4>훈련기관주소</h4>
          <p>
            ({baseInfo.zipCd}) {baseInfo.addr1} {baseInfo.addr2}
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관 전화번호</h4>
          <p>{baseInfo.trprChapTel || "-"}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관 이메일</h4>
          <p>{baseInfo.trprChapEmail || "-"}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>홈페이지</h4>
          <a href={baseInfo.hpAddr}>{baseInfo.hpAddr || "-"}</a>
        </div>
      </div>
      <Link to="/skills/findcourse" className={styles.detailListBtn}>
        목록 보기
      </Link>
    </div>
  );
};

export default CourseDetail;
