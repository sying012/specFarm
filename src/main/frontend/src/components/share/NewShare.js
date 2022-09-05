import React from "react";
import styles from "../../styles/share/newShare.module.css";
import { Stack, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";

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
            title="사진을 추가하려면 클릭하세요."
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
          <Box
            component="form"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8cbf75",
                },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="shareTitleInput"
              label="제목"
              variant="outlined"
              style={{ marginLeft: "9px", width: "100%" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#1d5902",
                  },
                },
              }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "750px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="shareContentInput"
              label="내용"
              multiline
              rows={15}
              style={{ marginLeft: "9px", width: "100%" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#1d5902",
                  },
                },
              }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "750px" },
            }}
            noValidate
            autoComplete="off"
          ></Box>

          <div className={styles.shareBtns}>
            <Link to="../share">
              <button className={styles.cancelBtn} type="button">
                취소
              </button>
            </Link>
            <Link to="/:id">
              <button
                className={styles.RegBtn}
                type="submit"
                onClick={() => alert("등록되었습니다.")}
              >
                등록
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  //<ShareForm addNewShare={addNewShareHandler}/>
};

export default NewShare;
