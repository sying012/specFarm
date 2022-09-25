import React, { useEffect, useState } from "react";
import styles from "../../styles/study/StudyJoinMember.module.css";
import SmallInfo from "../mypage/SmallInfo";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const StudyJoinMember = ({
  study,
  studyMember,
  studyJoin,
  cancelJoin,
  loginUserId,
}) => {
  // console.log(loginUserId);

  // 유저 프로필 모달
  const [infoVisible, setInfoVisible] = useState(false);
  const userSmallInfo = (e) => {
    console.log(infoVisible);
    if (!infoVisible) {
      setInfoVisible(true);
    } else {
      setInfoVisible(false);
    }
  };

  return (
    <div className={styles.member}>
      <div className={styles.memberInfo} onClick={(e) => userSmallInfo(e)}>
        <img
          src={
            studyMember.user.userProfileName !== null
              ? "/upload/profile/" + studyMember.user.userProfileName
              : "/upload/profile/farmer.png"
          }
          className={styles.partImg}
          alt="참가자 프로필사진"
        />
        <p className={styles.partId}>{studyMember.user.userNick}</p>
        {study.user.userId === studyMember.user.userId ? (
          // 해당 참가자가 스터디 개설자일 때
          // 스터디 개설자에 왕관 표시
          <img
            className={styles.badge}
            src="/upload/study/crown.png"
            alt="방장표시"
          />
        ) : (
          ""
        )}
      </div>
      <div
        onClick={(e) => userSmallInfo(e)}
        style={{ position: "absolute", marginLeft: "170px", marginTop: "60px" }}
      >
        {infoVisible && <SmallInfo user={studyMember.user} id="smallInfo" />}
      </div>
      {study.user.userId !== studyMember.user.userId &&
      loginUserId === study.user.userId ? (
        // 로그인 유저가 스터디 개설자 일 때
        studyMember.acceptYn === 1 ? (
          // 스터디 참가자에 강퇴버튼 표시
          <button
            className={styles.byebtn}
            type="button"
            onClick={() => {
              cancelJoin(studyMember.user.userId);
            }}
          >
            <ClearIcon />
          </button>
        ) : (
          // 스터디 참가자에 강퇴버튼 표시
          <div>
            <button
              className={styles.welcomebtn}
              type="button"
              onClick={() => {
                studyJoin(studyMember.user.userId, 1);
              }}
            >
              <CheckIcon />
            </button>
            <button
              className={styles.byebtn}
              type="button"
              onClick={() => {
                cancelJoin(studyMember.user.userId);
              }}
            >
              <ClearIcon />
            </button>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default StudyJoinMember;
