import { useRef } from "react";
import React from "react";
import styles from "../../styles/share/form.module.css";

const shareForm = () => {
  // //useRef - ref 연결
  // const imageInputRef = useRef();
  // const titleInputRef = useRef();
  // const contentInputRef = useRef();

  // function submitHandler(event) {
  //   event.preventDefault();

  //   //사용자 입력값 받아옴
  //   const enteredTitle = titleInputRef.current.value;
  //   const enteredImage = imageInputRef.current.value;
  //   const enteredContent = contentInputRef.current.value;

  //   const shareData = {
  //     image: enteredImage,
  //     title: enteredTitle,
  //     content: enteredContent,
  //   };

  //   this.props.addNewShare(shareData);
  // }

  return (
    <div className={styles.shareBody}>
      <form
      //onSubmit={submitHandler}
      >
        <input
          className={styles.title}
          placeholder="제목"
          //id="title"
          required
          //ref={titleInputRef}
        ></input>
        <textarea
          className={styles.content}
          placeholder="무엇을 나눔하고 싶으신가요?"
          style={{ fontSize: 15 }}
          // id="content"
          required
          // ref={contentInputRef}
        ></textarea>
        <div className={styles.shareBtn}>
          <button className={styles.cancelBtn}>취소</button>
          <button
            className={styles.RegBtn}
            type="button"
            onClick={() => (window.location = "./detail")}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default shareForm;
