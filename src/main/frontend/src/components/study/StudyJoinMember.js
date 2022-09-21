import React from "react";
import styles from "../../styles/study/StudyJoinMember.module.css";

const StudyJoinMember = ({ study, studyMember, studyJoin, cancelJoin }) => {
  // console.log(studyMember);
  return (
    <div className={styles.member}>
      <img
        src={
          studyMember.user.userProfileName !== null
            ? "/upload/profile/" + studyMember.user.userProfileName
            : "/upload/profile/farmer.png"
        }
        className={styles.partImg}
        alt="참가자 프로필사진"
      ></img>
      <p className={styles.partId}>{studyMember.user.userNick}</p>
      {study.user.userId === studyMember.user.userId ? (
        <img
          className={styles.badge}
          src="/upload/study/crown.png"
          alt="방장표시"
        ></img>
      ) : studyMember.acceptYn === 1 ? (
        <button
          className={styles.byebtn}
          type="button"
          onClick={() => {
            cancelJoin(studyMember.user.userId);
          }}
        >
          잘가
        </button>
      ) : (
        <button
          className={styles.byebtn}
          type="button"
          onClick={() => {
            studyJoin(studyMember.user.userId, 1);
          }}
        >
          어서와
        </button>
      )}
    </div>
  );
};

export default StudyJoinMember;
