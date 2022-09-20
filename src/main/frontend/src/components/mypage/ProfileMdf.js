import { Close, PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Button,
  createTheme,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../app-config";

import styles from "../../styles/mypage/ProfileMdf.module.css";

function ProfileMdf() {
  const [user, setUser] = useState({});
  const [checkChange, setCheckChange] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/mypage/modify",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        }
      })
      .catch((e) => {
        console.log("catch문" + e);
        window.location.href = "/login";
      });
  }, []);

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

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setImageSrc(user.userProfileName);
    }
  }, []);

  const [imageSrc, setImageSrc] = useState(
    !user.userProfileName ? "/upload/profile/farmer.png" : null
  );
  // 프로필 사진 미리보기 띄우기
  const encodeFileToBase64 = (e, file) => {
    // e.target.value = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
      setCheckChange(true);
    });
  };

  // 프로필 삭제 버튼 클릭시 avatar src기본값으로 변경
  function profilePicDeleteHandler() {
    setImageSrc("/upload/profile/farmer.png");
    setCheckChange(true);
  }

  const [nicknameValue, setNicknameValue] = useState("");
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setNicknameValue(user.userNick);
    }
  }, [user]);

  useEffect(() => {
    setUser({
      ...user,
      userNick: nicknameValue,
    });
  }, [nicknameValue]);

  // form submit 시 닉네임 공란이면 에러 창 띄움
  const [nicknameError, setNicknameError] = useState(false);
  const userProfileEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userNickname = data.get("nickname");
    let userProfileName = data.get("userProfileName");

    if (user.userNickname !== nicknameValue) {
      setCheckChange(true);
    }

    if (userNickname === null || userNickname === "") {
      setNicknameError(true);
    } else {
      if (!checkChange) {
        alert("변경사항이 없습니다.");
      } else {
        handleSubmit({
          ...user,
          userProfileName:
            imageSrc === "/upload/profile/farmer.png"
              ? null
              : user.userProfileName,
          profileImage: userProfileName,
          checkChange: checkChange,
        });
      }
    }
  };

  const handleSubmit = (user) => {
    setUser(user);
    console.log(user);
    axios({
      method: "post",
      url: API_BASE_URL + "/mypage/modify",
      data: user,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data) {
          console.log(response);
          alert("변경되었습니다.");
          window.location.replace("/mypage");
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
      });
  };

  return (
    <div>
      <form onSubmit={userProfileEdit}>
        <div className={styles.mdfContainer}>
          <h1 className={styles.mdfTitle}>프로필 수정</h1>
          <Avatar
            alt="profile"
            src={
              imageSrc ||
              "/upload/profile/" + user.userProfileName ||
              "/upload/profile/farmer.png"
            }
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
                id="userProfileName"
                name="userProfileName"
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
            inputProps={{ maxLength: 7 }}
            onChange={(e) => {
              setNicknameValue(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요."
            className={styles.nicknameInput}
            error={nicknameError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="delete"
                  className={styles.nicknameCleanBtn}
                  onClick={() => {
                    setNicknameValue("");
                  }}
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
