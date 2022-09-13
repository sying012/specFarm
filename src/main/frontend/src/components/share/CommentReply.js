import React from "react";
import styles from "../../styles/share/commentReply.module.css";
import defaultProfile from "../../images/defaultProfile.png";

const CommentReply = () => {
  return (
    <div>
      <div
        style={{
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "40px", paddingRight: "8px" }}
            src={defaultProfile}
            alt="프로필사진"
          />
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            답변자
          </p>
        </div>
        <p
          style={{
            display: "flex",
            fontSize: "0.8rem",
            color: "rgb(100, 100, 100)",
          }}
        >
          2022.08.29 11:34 PM
        </p>
      </div>
      <div>fdnbvn</div>
    </div>
  );
};

export default CommentReply;
