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

import styles from "../../styles/mypage/ProfileMdf.module.css";

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

  const encodeFileToBase64 = (e, file) => {
    e.target.value = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  function profilePicDeleteHandler() {
    setImageSrc(null);
  }

  const [nicknameValue, setNicknameValue] = useState("공부하자");

  function resetNicknameHandler() {
    setNicknameValue("");
  }
  const onChangeNickname = (e) => {
    setNicknameValue(e.target.value);
  };

  return (
    <div>
      <h1 className={styles.mdfTitle}>프로필 수정</h1>
      <Avatar
        alt="profile"
        src={
          imageSrc ||
          "https://as1.ftcdn.net/v2/jpg/03/58/90/78/1000_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
        }
        sx={{ width: 160, height: 160 }}
        className={styles.avatar}
      />

      <div className={styles.profilePicMdfBtns}>
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
                encodeFileToBase64(e, e.target.files[0]);
              }}
            />
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            variant="outlined"
            color="secondary"
            className={styles.profilePicDeleteBtn}
            onClick={profilePicDeleteHandler}
          >
            삭제
          </Button>
        </ThemeProvider>
      </div>

      <div className={styles.nickname}>
        <h2 className={styles.nicknameTitle}>닉네임</h2>
      </div>
      <div className={styles.nicknameContent}>
        <input
          type="text"
          id="nickname"
          value={nicknameValue}
          onChange={onChangeNickname}
          required
          placeholder="닉네임을 입력해주세요."
          className={styles.nicknameInput}
        />
        <IconButton
          aria-label="delete"
          className={styles.nicknameCleanBtn}
          onClick={resetNicknameHandler}
        >
          <Close fontSize="small" />
        </IconButton>
      </div>

      <div className={styles.profileMdfBtns}>
        <Link to="/mypage">
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="secondary"
              className={styles.profileCancelBtn}
            >
              취소
            </Button>
          </ThemeProvider>
        </Link>
        <Link to="/mypage">
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              className={styles.profileApplyBtn}
            >
              수정
            </Button>
          </ThemeProvider>
        </Link>
      </div>
    </div>
  );
}

export default ProfileMdf;
