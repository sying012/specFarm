import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../styles/study/StudyContent.module.css";
import { API_BASE_URL } from "../../app-config";
import defaultStudyImg from "../../images/defalut_study_image.png";
import StudyJoinList from "./StudyJoinList";

const StudyContent = ({
  setStudyList,
  studyMemberList,
  setStudyMemberList,
}) => {
  const { id } = useParams();

  const [checkedMember, setCheckedMember] = useState();
  const [loginUserId, setLoginUserId] = useState("");
  // const study = studyList[studyList.length - id];
  const [study, setStudy] = useState();

  // console.log(studyMemberList);

  // 최초 렌더링 시 동작
  useEffect(() => {
    // id 값에 해당하는 idx를 가지는 스터디 요청
    axios
      .get(API_BASE_URL + "/community/study/getStudy", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: { id: id },
      })
      .then((response) => {
        // console.log(response.data.study);
        setStudy(response.data.study);
        // console.log(study);
      })
      .catch((e) => {
        console.log(e.data.error);
      });

    // 로그인 중인 유저 요청
    axios
      .get(API_BASE_URL + "/community/study/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLoginUserId(response.data.userId);
      })
      .catch((e) => {
        console.log(e.data.error);
      });

    // 스터디 멤버 리스트 요청
    axios
      .get(API_BASE_URL + "/community/study/getStudyMemberList", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: { id: id },
      })
      .then((response) => {
        // console.log(response.data.studyMemberList);
        setStudyMemberList(response.data.studyMemberList);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

  useEffect(() => {
    // 스터디 멤버 리스트에 있는 유저 중 현재 로그인 된 유저가 있는지 확인
    studyMemberList.forEach((studyMember) => {
      studyMember.user.userId === loginUserId
        ? setCheckedMember(studyMember.user)
        : setCheckedMember();
    });

    console.log(checkedMember);
  }, [checkedMember, loginUserId, studyMemberList]);

  // 스터디 삭제
  const navigate = useNavigate();
  const deleteStudy = (studyIdx) => {
    axios({
      method: "delete",
      url: API_BASE_URL + "/community/study/delete",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      params: { id: studyIdx },
    })
      .then((response) => {
        // console.log(response);
        setStudyList(response.data.studyList.content);
        navigate(`..`);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  };

  // 스터디 참가 신청
  const studyJoin = (userId, acceptYn) => {
    axios({
      method: "get",
      url: API_BASE_URL + "/community/study/studyJoin",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      params: {
        userId: userId,
        studyIdx: id,
        acceptYn: acceptYn,
      },
    })
      .then((response) => {
        console.log(response);
        setStudyMemberList(response.data);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  };

  // 스터디 참가 취소
  const cancelJoin = (userId) => {
    // console.log(userId + "////////////////" + id);
    axios({
      method: "delete",
      url: API_BASE_URL + "/community/study/cancelJoin",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      params: {
        studyIdx: id,
        userId: userId,
      },
    })
      .then((response) => {
        console.log(response);
        setStudyMemberList(response.data);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  };

  const studyJoinHandler = () => {
    // 현재 로그인 된 유저가 리스트에 없을 시 acceptYn 을 0으로 보내 신청 대기 상태
    // 리스트에 있을 시 (참여 돼있거나 대기 상태) 참여 취소
    console.log(checkedMember);
    checkedMember === undefined
      ? studyJoin(loginUserId, 0)
      : cancelJoin(loginUserId);
  };

  return (
    study !== undefined && (
      <div className={styles.studyContent}>
        <div className={styles.contentContainer}>
          <div className={styles.contentLeft}>
            <img
              className={styles.studyBanner}
              src={
                study.studyImgName !== null
                  ? "/upload/study/" + study.studyImgName
                  : defaultStudyImg
              }
              alt="스터디 배너"
            ></img>
            <StudyJoinList
              study={study}
              loginUserId={loginUserId}
              studyJoin={studyJoin}
              cancelJoin={cancelJoin}
              studyMemberList={studyMemberList}
            />
          </div>
          <div className={styles.contentRight}>
            <div className={styles.titleWrapper}>
              <div
                className={styles.studyContentState}
                style={{
                  color: "white",
                  background: study.studyYn === "Y" ? "#1d5902" : "#8cbf75",
                }}
                onClick={() => {
                  // user.userId === loginUserId ?  :
                }}
              >
                {study.studyYn === "Y" ? "모집" : "완료"}
              </div>
              <p className={styles.studyTitle}>{study.studyTitle}</p>
            </div>
            <div className={styles.makerNdate}>
              <div className={styles.maker}>
                <img
                  src={
                    study.user.userProfileName !== null
                      ? "/upload/profile/" + study.user.userProfileName
                      : "/upload/profile/farmer.png"
                  }
                  className={styles.makerImg}
                  alt="참가자 프로필사진"
                ></img>
                <p className={styles.studyMaker}>{study.user.userNick}</p>
              </div>

              <p className={styles.studyRegDate}>{study.studyRegDate}</p>
            </div>
            <div className={styles.contactWrapper}>
              <p>연락수단 👉</p>
              <a href="#" className={styles.contact}>
                {study.contact}
              </a>
            </div>
            <div className={styles.contentWrapper}>
              <pre className={styles.content}>{study.studyContent}</pre>
            </div>

            <div className={styles.btnWrapper}>
              {study.user.userId === loginUserId ? (
                <>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={styles.reqBtnStyle}
                    style={{ marginRight: "10px" }}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteStudy(study.studyIdx);
                    }}
                    className={styles.cancelBtnStyle}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    studyJoinHandler();
                  }}
                  className={
                    checkedMember === undefined
                      ? styles.reqBtnStyle
                      : styles.cancelBtnStyle
                  }
                >
                  {checkedMember === undefined ? "신청" : "취소"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StudyContent;
