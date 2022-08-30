import { useRef, useState } from "react";
import styles from "../../styles/share/form.module.css";
import { Button, createTheme, Box, TextField } from "@mui/material";

const shareForm = () => {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      brown: {
        main: "rgb(107, 83, 67)",
        contrastText: "#fff",
      },
      primary: {
        main: "rgb(187, 205, 110)",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
    },
  });

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
    <div>
      <form
        className={styles.shareForm}
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
          <Button
            variant="outlined"
            color="secondary"
            href="/community/share"
            theme={theme}
            className={styles.cancelBtn}
          >
            취소
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => (
              (window.location = "./detail"), alert("등록되었습니다.")
            )}
            theme={theme}
            className={styles.RegBtn}
          >
            등록
          </Button>
        </div>
      </form>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>
    </div>
  );
};

export default shareForm;
