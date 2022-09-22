import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/study/StudyJoinList.module.css";
import StudyJoinMember from "./StudyJoinMember";

const StudyJoinList = ({
  study,
  loginUserId,
  studyMemberList,
  studyJoin,
  cancelJoin,
}) => {
  const [toggleList, setToggleList] = useState(0);

  let [reqMemberCnt, setReqMemberCnt] = useState(0);
  let [joinMemberCnt, setJoinMemberCnt] = useState(0);

  let reqCnt = 0;
  let joinCnt = 0;

  useEffect(() => {
    studyMemberList.forEach((member) => {
      if (member.acceptYn === 0) {
        reqCnt++;
      } else if (member.acceptYn === 1) {
        joinCnt++;
      }

      setReqMemberCnt(reqCnt);
      setJoinMemberCnt(joinCnt);
    });
  }, [joinCnt, joinMemberCnt, reqCnt, reqMemberCnt, studyMemberList]);

  return (
    <div className={styles.joinListWrapper}>
      {study.user.userId === loginUserId ? (
        // 로그인 유저가 스터디 개설자인 경우
        <>
          <div className={styles.listName}>
            <p>신청자 목록</p>
            <p className={styles.memberCnt}>{reqMemberCnt}명 신청중</p>
          </div>
          <div className={styles.joinList}>
            {studyMemberList.map((studyMember, index) => {
              return (
                // 스터디 멤버 상태가 0인 경우 신청자 목록에 표시
                studyMember.acceptYn === 0 && (
                  <StudyJoinMember
                    key={index}
                    study={study}
                    studyJoin={studyJoin}
                    cancelJoin={cancelJoin}
                    studyMember={studyMember}
                    loginUserId={loginUserId}
                  />
                )
              );
            })}
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
            <p className={styles.memberCnt}>{joinMemberCnt}명 참여중</p>
          </div>
          {toggleList ? (
            <div className={styles.joinList}>
              {studyMemberList.map((studyMember, index) => {
                return (
                  // 스터디 멤버 상태가 1인 경우 참여자 목록에 표시
                  studyMember.acceptYn === 1 && (
                    <StudyJoinMember
                      key={index}
                      study={study}
                      studyJoin={studyJoin}
                      cancelJoin={cancelJoin}
                      studyMember={studyMember}
                      loginUserId={loginUserId}
                    />
                  )
                );
              })}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        // 로그인 유저가 스터디 개설자가 아닌 경우 참여자 목록만 표시
        <>
          <div
            className={styles.joinListToggle}
            style={{ borderRadius: "4px 4px 0 0" }}
          >
            <p>참여자 목록</p>
            <p className={styles.memberCnt}>{joinMemberCnt}명 참여중</p>
          </div>
          <div className={styles.joinList}>
            {studyMemberList.map((studyMember, index) => {
              return (
                studyMember.acceptYn === 1 && (
                  <StudyJoinMember
                    key={index}
                    study={study}
                    studyJoin={studyJoin}
                    cancelJoin={cancelJoin}
                    studyMember={studyMember}
                  />
                )
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default StudyJoinList;
