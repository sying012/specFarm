import React from "react";
import { useParams } from "react-router";
import "../../styles/study/StudyContent.css";
import Avatar from "@mui/material/Avatar";

const StudyContent = ({ studyList }) => {
  const { id } = useParams();
  const study = studyList[id - 1];
  const {
    studyTitle,
    userId,
    regDate,
    contact,
    studyContent,
    studyMemCnt,
    studyImg,
    studyState,
  } = study;

  console.log(study);

  return (
    <div className="studyContent">
      <div className="contentContainer">
        <div className="contentLeft">
          <img className="studyBanner" src={studyImg} alt="스터디 배너"></img>
          <div className="joinListWrapper">
            <div className="listName">
              <p>참가자 목록</p>
              <p className="memberCnt">참여인원: {studyMemCnt}명</p>
            </div>
            <div className="joinList">
              <div className="participant">
                <img
                  src="https://mediahub.seoul.go.kr/wp-content/uploads/2016/06/6dd54989ccc82438d6aaf955c5fa8fbb.jpg"
                  className="partImg"
                  alt="참가자 프로필사진"
                ></img>
                <p className="partId">소방대장</p>
                <button className="byebtn" type="button">
                  잘가
                </button>
              </div>
              <div className="participant">
                <img
                  src="https://mediahub.seoul.go.kr/wp-content/uploads/2016/06/6dd54989ccc82438d6aaf955c5fa8fbb.jpg"
                  className="partImg"
                  alt="참가자 프로필사진"
                ></img>
                <p className="partId">소방대장</p>
                <button className="byebtn" type="button">
                  잘가
                </button>
              </div>
              <div className="participant">
                <img
                  src="https://mediahub.seoul.go.kr/wp-content/uploads/2016/06/6dd54989ccc82438d6aaf955c5fa8fbb.jpg"
                  className="partImg"
                  alt="참가자 프로필사진"
                ></img>
                <p className="partId">소방대장</p>
                <button className="byebtn" type="button">
                  잘가
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="contentRight">
          <div className="titleWrapper">
            <div
              className="studyContentState"
              style={{
                color: "white",
                background: studyState
                  ? "rgba(187, 205, 110, 0.8)"
                  : "rgba(107, 83, 67, 0.8)",
              }}
            >
              {studyState ? "모집" : "완료"}
            </div>
            <p className="studyTitle">{studyTitle}</p>
          </div>
          <div className="makerNdate">
            <div className="maker">
              <img
                src="https://mediahub.seoul.go.kr/wp-content/uploads/2016/06/6dd54989ccc82438d6aaf955c5fa8fbb.jpg"
                className="partImg"
                alt="참가자 프로필사진"
              ></img>
              <p className="studyMaker">{userId}</p>
            </div>
            <p className="studyRegDate">{regDate}</p>
          </div>
          <div className="contentWrapper">
            <pre className="content">{studyContent}</pre>
          </div>
          <div className="contactWrapper">
            <p>연락수단 👉</p>
            <a href="#" className="contact">
              {contact}
            </a>
          </div>
          <div className="btnWrapper">
            {/* <button type="button">신청하기</button> */}
            {/* 여기에 수정이랑 삭제 만들기 */}
            <button type="button">신청/취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyContent;
