import React from "react";
import ShareForm from "./ShareForm";
import styles from "../../styles/share/newShare.module.css";
import { Stack, Button, createTheme } from "@mui/material";

const NewShare = () => {
  // shareData를 백으로 전달
  // function addNewShareHandler(shateData) {
  //   fetch함수를 통해 http request 전달
  //   fetch('url', {
  //    method: 'POST',
  //    body: JSON.stringfy(shateData) JSON으로 변환하여 전달
  //    });
  // }

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
            className={styles.fileInput}
            id="fileInput"
            onChange={(e) => {
              readImage(e.target.files[0]);
            }}
          />
          <div className={styles.uploadBtn}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                style={{
                  backgroundColor: "rgba(187, 205, 110, 0.8)",
                  color: "white",
                }}
                component="label"
              >
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Stack>
          </div>
        </div>
        <ShareForm />
      </div>
    </>
  );
  //<ShareForm addNewShare={addNewShareHandler}/>
};

export default NewShare;
