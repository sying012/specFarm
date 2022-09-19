import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../styles/study/StudyContent.module.css";
import { API_BASE_URL } from "../../app-config";

const StudyContent = ({ studyList, setStudyList }) => {
  const { id } = useParams();
  const [toggleList, setToggleList] = useState(0);
  const [requestState, setRequestState] = useState(0);
  const [loginUserId, setLoginUserId] = useState("");
  const study = studyList[studyList.length - id];
  // const [studyss, setStudyss] = useState(null);
  // console.log(studyList);

  const {
    studyTitle,
    user,
    regDate,
    contact,
    studyContent,
    studyMemberCnt,
    studyImgName,
    studyYn,
    studyMaxMember,
    studyIdx,
  } = study;

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/study/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLoginUserId(response.data.user.userId);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

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
        console.log(response);
        setStudyList(response.data.studyList.content);
        navigate(`..`);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(API_BASE_URL + "/community/study/getStudy", {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
  //       },
  //       params: { id: id },
  //     })
  //     .then((response) => {
  //       console.log(response.data.study);
  //       setStudyss(response.data.study);
  //       console.log(studyss);
  //     })
  //     .catch((e) => {
  //       console.log(e.data.error);
  //     });
  // }, []);

  return (
    <div className={styles.studyContent}>
      <div className={styles.contentContainer}>
        <div className={styles.contentLeft}>
          <img
            className={styles.studyBanner}
            src={"/upload/study/" + studyImgName}
            alt="스터디 배너"
          ></img>
          <div className={styles.joinListWrapper}>
            <div className={styles.listName}>
              <p>신청자 목록</p>
              <p className={styles.memberCnt}>{studyMemberCnt}명 신청중</p>
            </div>
            <div className={styles.joinList}>
              <div className={styles.participant}>
                <img
                  src="/upload/study/ms.png"
                  className={styles.partImg}
                  alt="참가자 프로필사진"
                ></img>
                <p className={styles.partId}>소방대장</p>
                {user.userId === loginUserId ? (
                  <button className={styles.byebtn} type="button">
                    어서와
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className={styles.joinListToggle}
              style={
                toggleList
                  ? { borderRadius: "0" }
                  : { borderRadius: "0 0 4px 4px" }
              }
              onClick={() => {
                setToggleList(!toggleList);
              }}
            >
              <p>참여자 목록</p>
              <p className={styles.memberCnt}>{studyMemberCnt}명 참여중</p>
            </div>
            {toggleList ? (
              <div className={styles.joinList}>
                <div className={styles.participant}>
                  <img
                    src="/upload/study/ms.png"
                    className={styles.partImg}
                    alt="참가자 프로필사진"
                  ></img>
                  <p className={styles.partId}>{user.userId}</p>
                  <img
                    className={styles.badge}
                    src="/upload/study/crown.png"
                    alt="방장표시"
                  ></img>
                </div>
                <div className={styles.participant}>
                  <img
                    src="/upload/study/ms.png"
                    className={styles.partImg}
                    alt="참가자 프로필사진"
                  ></img>
                  <p className={styles.partId}>소방대장</p>
                  {user.userId === loginUserId ? (
                    <button className={styles.byebtn} type="button">
                      잘가
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.titleWrapper}>
            <div
              className={styles.studyContentState}
              style={{
                color: "white",
                background: studyYn === "Y" ? "#1d5902" : "#8cbf75",
              }}
              onClick={() => {
                // user.userId === loginUserId ?  :
              }}
            >
              {studyYn === "Y" ? "모집" : "완료"}
            </div>
            <p className={styles.studyTitle}>{studyTitle}</p>
          </div>
          <div className={styles.makerNdate}>
            <div className={styles.maker}>
              <img
                src="/upload/study/ms.png"
                className={styles.partImg}
                alt="참가자 프로필사진"
              ></img>
              <p className={styles.studyMaker}>{user.userId}</p>
            </div>

            <p className={styles.studyRegDate}>{regDate}</p>
          </div>
          <div className={styles.contactWrapper}>
            <p>연락수단 👉</p>
            <a href="#" className={styles.contact}>
              {contact}
            </a>
          </div>
          <div className={styles.contentWrapper}>
            <pre className={styles.content}>{studyContent}</pre>
          </div>

          <div className={styles.btnWrapper}>
            {user.userId === loginUserId ? (
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
                    deleteStudy(studyIdx);
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
                  setRequestState(!requestState);
                }}
                className={
                  requestState ? styles.reqBtnStyle : styles.cancelBtnStyle
                }
              >
                {requestState ? "취소" : "신청"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyContent;
