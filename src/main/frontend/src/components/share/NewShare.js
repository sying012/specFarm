import React from "react";
import styles from "../../styles/share/newShare.module.css";
import { Stack, Button, createTheme, Box } from "@mui/material";

const NewShare = () => {
  // shareData를 백으로 전달
  // function addNewShareHandler(shateData) {
  //   fetch함수를 통해 http request 전달
  //   fetch('url', {
  //    method: 'POST',
  //    body: JSON.stringfy(shateData) JSON으로 변환하여 전달
  //    });
  // }

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

  const theme = createTheme({
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
    typography: {
      fontFamily: [
        "Hahmlet",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
      ].join(","),
    },
  });

  const readImage = (file) => {
    // 인풋 태그에 파일이 있는 경우
    if (file) {
      // FileReader 인스턴스 생성
      const reader = new FileReader();

      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        const preImg = document.getElementById("shareImgPreview");
        preImg.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    document.getElementById("uploadFileName").value = e.target.value;
  };

  return (
    <>
      <div className={styles.regBox}>
        <div className={styles.imgBox}>
          <img
            style={{ cursor: "pointer" }}
            className={styles.itemImg}
            src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
            alt="img"
            id="shareImgPreview"
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
          />
          <input
            hidden
            type="file"
            id="fileInput"
            onChange={(e) => {
              readImage(e.target.files[0]);
            }}
          />
          <div className={styles.fileloadBtn}>
            <div className={styles.regBoxBottom}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <input
                  className={styles.uploadFileName}
                  value="첨부파일"
                  placeholder="첨부파일"
                  id="uploadFileName"
                />

                <label for="fileUpload" style={{ marginLeft: "0px" }}>
                  파일첨부
                </label>
                <input
                  type="file"
                  multiple={true}
                  onChange={handleFileChange}
                  id="fileUpload"
                />
              </Stack>
            </div>
          </div>
        </div>

        <div className={styles.shareForm}>
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
                // /:id로 변경 예정
                onClick={() => (
                  (window.location = "./"), alert("등록되었습니다.")
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
      </div>
    </>
  );
  //<ShareForm addNewShare={addNewShareHandler}/>
};

export default NewShare;
