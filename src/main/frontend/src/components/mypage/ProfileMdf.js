import { Close, PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Button,
  createTheme,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

import styles from "../../styles/mypage/ProfileMdf.module.css";

function ProfileMdf() {
  const [user, setUser] = useState({
    userId: "thisisId",
    userPw: "dd",
    userName: "조유미",
    userTel: "010-0000-0000",
    userEmail: "801@bitcamp.com",
    nickname: "박대리",
    profilePath: "",
  });

  // mui button 테마 지정
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
      lightgreen: {
        main: "#8cbf75",
      },
    },
  });

  const [imageSrc, setImageSrc] = useState("");

  // 프로필 사진 미리보기 띄우기
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

  // 프로필 삭제 버튼 클릭시 avatar src기본값으로 변경
  function profilePicDeleteHandler() {
    setImageSrc(null);
  }

  const [nicknameValue, setNicknameValue] = useState(user.nickname);

  // 닉네임 x버튼 클릭시 입력창 초기화
  function resetNicknameHandler() {
    setNicknameValue("");
  }
  // 닉네임 새로 입력
  const onChangeNickname = (e) => {
    setNicknameValue(e.target.value);
  };

  // form submit 시 닉네임 공란이면 에러 창 띄움
  const [nicknameError, setNicknameError] = useState(false);

  const userProfileEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userNickname = data.get("nickname");
    console.log(userNickname);

    if (userNickname === null || userNickname === "") {
      setNicknameError(true);
    } else {
      alert("변경되었습니다.");
      window.location.replace("/mypage");
    }
  };

  return (
    <div>
      <form onSubmit={userProfileEdit}>
        <div className={styles.mdfContainer}>
          <h1 className={styles.mdfTitle}>프로필 수정</h1>
          <Avatar
            alt="profile"
            src={imageSrc || "/upload/profile/farmer.png"}
            sx={{ width: 160, height: 160 }}
            className={styles.avatar}
          />

          <div className={styles.profilePicMdfBtns}>
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              theme={theme}
              startIcon={<PhotoCamera color="action" />}
            >
              사진 올리기
              <input
                hidden
                id="miribogi"
                accept="image/*"
                type="file"
                onChange={(e) => {
                  encodeFileToBase64(e, e.target.files[0]);
                }}
              />
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              theme={theme}
              className={styles.profilePicDeleteBtn}
              onClick={profilePicDeleteHandler}
            >
              삭제
            </Button>
          </div>

          <div className={styles.nickname}>
            <h2 className={styles.nicknameTitle}>닉네임</h2>
          </div>
          <OutlinedInput
            type="text"
            name="nickname"
            id="nickname"
            theme={theme}
            color="lightgreen"
            value={nicknameValue}
            onChange={onChangeNickname}
            placeholder="닉네임을 입력해주세요."
            className={styles.nicknameInput}
            error={nicknameError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="delete"
                  className={styles.nicknameCleanBtn}
                  onClick={resetNicknameHandler}
                >
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            }
          />

          <div className={styles.profileMdfBtns}>
            <Button
              variant="outlined"
              color="primary"
              href="/mypage"
              theme={theme}
              className={styles.profileCancelBtn}
            >
              취소
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              theme={theme}
              className={styles.profileApplyBtn}
            >
              수정
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileMdf;
