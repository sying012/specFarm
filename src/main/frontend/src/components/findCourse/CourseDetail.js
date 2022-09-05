import { Link } from "react-router-dom";
import styles from "../../styles/findcourse/CourseDetail.module.css";

const CourseDetail = ({ courses }) => {
  const course = {
    id: 1,
    orgName: "미래직업전문학교",
    courseName: "(기계설계제작)CAD/CAM 및 CNC가공인력양성(단기과정)(A)",
    courseNCS: "기계요소설계(15010201)",
    courseStartDate: "2022-09-02",
    courseEndDate: "2022-12-01",
    courseRound: "1",
    courseDays: "61",
    courseHours: "450",
    courseRate: null,
    courseType: "국가기간전략산업직종훈련",
    courseCenter: "부산고용센터",
    courseCost: "2,691,000",
    orgHireRate: "74.4",
    orgAddress: "부산광역시 동구 중앙대로286번길 13 미래직업전문학교",
    orgPostCode: "601837",
    orgTel: "052-463-0033",
    orgEmail: "mirae_job@hanmail.net",
    orgLink: "http://www.miraeit.or.kr/",
    courseAim: `1. 기계설계제작 관련 이론 및 기술에 대한 지식을 습득하여 기계장치의 설계,제작에 적합한 규격에 맞도록 검토 및 설계를 할 수 있다.
    2. CAD/CAM시스템을 활용한 형상모델링(CAM), 머시닝센터, CNC 프로그래밍 및 가공 기술을 습득하여 모델링 데이터를 이용한 최적의 가공 조건 설정과 NC데이터 프로그램 생성으로 기계부품 가공과 시제품 제작 등을 할 수 있다.`,
    courseWay: `- 훈련과정 "담임(교무/관리)" 이원화로 훈련생과의 소통강화
    - 교과목별 훈련교사 전담제와 실습실 담임교사 지정제로 학습성취도 향상
    - 매월 출결우수과정 선정과 시상으로 학습분위기 조성과 훈련성과 고취
    - 직업상담사의 취업진로상담 컨설팅
    - 취업전담원의 취업설명회와 업체동행면접 및 기업체 인사담당자 본교방문 면접`,
    coursePreLearning: "기본 수리능력과 공간인지 능력 필요",
    courseQualified: "자격 무관하며, 자격취득이 용이하거나 가능한 자",
    courseApply: `- 훈련과정 특징
    기계설계를 통한 기계가공과 제작을 할 수 있는 단기과정이며, 기계·조선·항공업 등의 직종이 많이 분포하고 있는 지역 특성상 취업유망 직종임. 본교 기계직종 고용노동부 HRD-Net 등록
    평균취업률(기계설계제작 100%)
    - 차별화된 교육훈련
    . 현장실무위주의 맞춤형 교육훈련
    . 최적의 환경과 장비 보유 : 기계설계 및 가공과 제작 전문기술인력 양성을 위한 최적의 환경과 장비 보유
    . 직업훈련교사 자격(스타훈련교사), 현장실무 경력 겸비한
    NCS인증 우수교사 강의
    . 프로젝트 수행을 통한 업무능력 배양
    - 다년간 훈련경험 : (국기)2007년부터 CNC선반(13회), 머시닝센터(13회), 치공구설계와 제작(7회), 기계요소설계및제작(2회), 기계가공및 설계(23회), CAM응용가공(6회), CAM응용기계가공(2회), CAM가공 및 기계요소설계(2회), CAM응용기계(2회), 컴퓨터응용기계(2회),
    (과정평가형)기계설계산업기사(2회), 컴퓨터응용기계산업기사(2회),
    (계좌제) 2009년부터 머시닝센타(19회, 280명), CNC선반(21회, 247명) 등`,
    courseManage: `- 기계ㆍ전기직종과 설비시공 중심의 전문화 및 특화과정 육성
    - 2020년도 부산지방고용센터 '우리동네 훈련맛집 TOP10'(취업률우수기관) 선정
    - 2019년 고용노동부 장관상 수상, 스타훈련교사 선발, 대한민국 신지식인 선정
    - 2015~2022년 고용노동부평가 우수훈련기관 선정 / 3년인증 획득
    - 2018년 이수형평가 전직종 A등급, 평균취업률 80%
    - 2017년 과정형평가자격 기계설계산업기사 A등급(자격취득 : 84.6%) NCS기반 우수직업ㆍ교육훈련 경진대회 금상 수상
    - 2013~2014년 고용노동부 평가 A등급(국가기간 A등급, 내일배움 A등급)
    - ‘토탈관리시스템’으로 훈련지원에서 교육, 취업까지 유기적이고 체계적 직업훈련`,
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailTitleBackground}></div>
      <div className={styles.detailHeader}>
        <p className={styles.courseOrgName}>{course.orgName}</p>
        <h1 className={styles.courseName}>{course.courseName}</h1>
      </div>
      {/* <hr className={styles.detailHr} /> */}
      <div className={styles.detailContent}>
        <div className={styles.contentRow}>
          <h4>NCS 직무분류</h4>
          <p>{course.courseNCS}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기간</h4>
          <p>
            {course.courseStartDate} ~ {course.courseEndDate} (
            {course.courseRound}회차)
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련시간</h4>
          <p>
            {course.courseDays}일, 총 {course.courseHours}시간
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>수강생 평균 만족도</h4>
          <p>{course.courseRate || "-"}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련유형</h4>
          <p>{course.courseType}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>주관부처</h4>
          <p>{course.courseCenter}</p>
        </div>

        <div className={styles.contentRow}>
          <h4>훈련비</h4>
          <p>{course.courseCost}원</p>
        </div>

        <div className={styles.applyCard}>
          <h1>수업 들으러 갈까요?</h1>
          <div className={styles.applyCardBtn}>
            <a>수강신청 하러가기</a>
          </div>
        </div>

        <div className={styles.contentRow}>
          <h4>훈련기관명</h4>
          <p>{course.orgName}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관 직종별 취업률</h4>
          <p>{course.orgHireRate}%</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관주소</h4>
          <p>
            ({course.orgPostCode}) {course.orgAddress}
          </p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관 전화번호</h4>
          <p>{course.orgTel}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>훈련기관 이메일</h4>
          <p>{course.orgEmail}</p>
        </div>
        <div className={styles.contentRow}>
          <h4>홈페이지</h4>
          <a href={course.orgLink}>{course.orgLink}</a>
        </div>
      </div>
      <Link to="/skills/findcourse" className={styles.detailListBtn}>
        목록 보기
      </Link>
      <div className={styles.courseDetails}>
        <div className={styles.courseDetailCard}>
          <h3>훈련목표</h3>
          <p>{course.courseAim}</p>
        </div>
        <div className={styles.courseDetailCard}>
          <h3>훈련방법</h3>
          <p>{course.courseWay}</p>
        </div>

        <div className={styles.courseDetailCard}>
          <h3>훈련대상 요건 선수학습</h3>
          <p>{course.coursePreLearning}</p>
        </div>

        <div className={styles.courseDetailCard}>
          <h3>훈련대상 요건 기취득자격</h3>
          <p>{course.courseQualified}</p>
        </div>
        <div className={styles.courseDetailCard}>
          <h3>신청과정</h3>
          <p>{course.courseApply}</p>
        </div>
        <div className={styles.courseDetailCard}>
          <h3>과정운영</h3>
          <p>{course.courseManage}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
