import React from "react";
import styles from "../../styles/share/comment.module.css";
import CommentContainer from "./CommentContainer";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import CommentReply from "./CommentReply";
import SmallInfo from "../mypage/SmallInfo";

const Comment = ({ comment, user }) => {
  //대댓글 출력
  const [commentReplytList, setCommentReplyList] = useState([]);

  //대댓글(답글) 토글
  function toggleCommentReply() {
    let commentReplyContainer = document.querySelector(
      ".commentReplyContainer" + comment.shareReplyIdx
    );
    if (commentReplyContainer.style.display === "none") {
      axios({
        method: "get",
        url:
          API_BASE_URL +
          "/community/share/" +
          comment.shareIdx +
          "/commentReply",
        params: { commentIdx: comment.shareReplyIdx },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      }).then((response) => {
        setCommentReplyList(response.data.data);
      });
      commentReplyContainer.style.display = "block";
    } else {
      commentReplyContainer.style.display = "none";
    }
  }

  // 대댓글 입력
  const insertShareCommentReply = (commentReply) => {
    axios({
      method: "post",
      url:
        API_BASE_URL +
        `/community/share/${comment.shareIdx}/insertCommentReply`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: commentReply,
    }).then((response) => {
      console.log(response);
      setCommentReplyList(response.data.shareReReplyList);
    });
  };

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
    <>
      <div className={styles.commentReply}>
        <div className={styles.comment}>
          <div className={styles.commentList}>
            <img
              src={`/upload/profile/${
                comment.user && comment.user.userProfileName
              }`}
              alt="프로필사진"
              onClick={(e) => userSmallInfo(e)}
            />
            <div className={styles.commentBox}>
              <span className={styles.commentNick}>
                <p onClick={(e) => userSmallInfo(e)}>
                  {comment.user && comment.user.userNick}
                </p>
                <div
                  onClick={(e) => userSmallInfo(e)}
                  style={{
                    position: "absolute",
                    marginLeft: "105px",
                    marginTop: "-65px",
                  }}
                >
                  {infoVisible && (
                    <SmallInfo user={comment.user} id="smallInfo" />
                  )}
                </div>
                <p className={styles.commentRegDate}>
                  {comment.shareReplyRegDate}
                </p>
              </span>
              <div>{comment.shareReplyContent}</div>
            </div>
          </div>
          <div className={styles.toggleCommentReply}>
            <p onClick={toggleCommentReply}>
              답글{comment.countReReply || null}
            </p>
          </div>
        </div>

        <div
          className={"commentReplyContainer" + comment.shareReplyIdx}
          style={{
            display: "none",
            marginLeft: "50px",
          }}
        >
          <div>
            <CommentContainer
              style={{ width: "100%" }}
              insertShareCommentReply={insertShareCommentReply}
              shareReplyIdx={comment.shareReplyIdx}
              shareIdx={comment.shareIdx}
              user={user}
            />
          </div>
          {commentReplytList.map((commentReply) => (
            <div key={commentReply.shareReReplyIdx}>
              <CommentReply commentReply={commentReply} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
