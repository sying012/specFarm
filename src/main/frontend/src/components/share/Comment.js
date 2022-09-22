import React from "react";
import CommentContainer from "./CommentContainer";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import CommentReply from "./CommentReply";

const Comment = ({ comment, user, share }) => {
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

  return (
    <>
      <div style={{ padding: "15px" }}>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img
                  style={{ width: "40px", paddingRight: "8px" }}
                  id="profileImg"
                  src={`/upload/profile/${comment.user.userProfileName}`}
                  alt="프로필사진"
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{comment.user.userNick}</p>
                  <p>{comment.shareRegDate}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.8rem" }}>{comment.shareReplyDate}</p>
            </div>

            <div style={{ padding: "10px 15px" }}>
              {comment.shareReplyContent}
            </div>
            <div style={{ padding: "5px", display: "flex", float: "right" }}>
              <p onClick={toggleCommentReply}>답글</p>
            </div>
          </div>
        </div>
        <div
          className={"commentReplyContainer" + comment.shareReplyIdx}
          style={{ display: "none", marginLeft: "50px" }}
        >
          <div>
            <CommentContainer
              style={{ maxWidth: "100%" }}
              insertShareCommentReply={insertShareCommentReply}
              shareReplyIdx={comment.shareReplyIdx}
              shareIdx={comment.shareIdx}
              user={user}
            />
          </div>
          {commentReplytList.map((commentReply) => (
            <div key={commentReply.shareReReplyIdx} style={{ display: "flex" }}>
              <CommentReply commentReply={commentReply} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
