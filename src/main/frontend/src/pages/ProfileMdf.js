import { Close, PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Button,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage/ProfileMdf.css";

function ProfileMdf() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(187, 205, 110)",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
    },
  });

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBade64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <div className="mdfContainer">
        <h1 className="mdfTitle">프로필 수정</h1>
        {imageSrc && (
          <img
            alt="profile"
            src={imageSrc}
            //   sx={{ width: 160, height: 160 }}
            className="avatar"
          />
        )}
        <div className="profilePicMdfBtns">
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              startIcon={<PhotoCamera color="action" />}
            >
              사진 올리기
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  encodeFileToBade64(e.tartget.files[0]);
                }}
              />
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="secondary"
              className="profilePicDeleteBtn"
            >
              삭제
            </Button>
          </ThemeProvider>
        </div>
        <div className="nickname">
          <h2 className="nicknameTitle">닉네임</h2>
        </div>
        <div className="nicknameContent">
          <input type="text" defaultValue="공부하자" />
          <IconButton aria-label="delete" className="nicknameCleanBtn">
            <Close fontSize="small" />
          </IconButton>
        </div>
        <div className="profileMdfBtns">
          <Link to="/mypage">
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="secondary"
                className="profileCancelBtn"
              >
                취소
              </Button>
            </ThemeProvider>
          </Link>
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              className="profileApplyBtn"
            >
              적용
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default ProfileMdf;
