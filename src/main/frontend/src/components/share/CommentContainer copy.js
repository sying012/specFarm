import React, { useState } from "react";
import styles from "../../styles/share/commentContainer.module.css";

//1. 댓글 입력값 State에 저장
const CommentContainer = ({ commentArray, addCommentArray }) => {
  const [comment, setComment] = useState(""); //comment(state)의 setState로 state값을 변화시키는 함수
  const onChange = (event) => setComment(event.target.value); //이걸로 댓글 입력값을 state에 저장

  const onSubmit = (event) => {
    event.preventDefault(); // 이벤트 발생해도 새로고침x
    if (comment === "") {
      return;
    }
    //빈 배열안에 댓글 입력 값 넣기
    addCommentArray(commentArray.concat(comment));
    setComment(""); //setComment 댓글의 setState값을 공백으로 주어 submit을 하게되면 댓글의 값은 공백으로
  };

  return (
    <>
      <div className={styles.inputContainer} onSubmit={onSubmit}>
        <form className={styles.inputForm}>
          <input
            type="text"
            placeholder="내용을 입력해주세요"
            value={comment}
            onChange={onChange}
          />
          <button className={styles.commentRegBtn}>등록</button>
        </form>
      </div>
    </>
  );
};

export default CommentContainer;
