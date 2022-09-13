import { Button, createTheme, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../app-config";

import styles from "../../styles/mypage/ResetPw.module.css";

function ResetPw({ user }) {
  const [userInfo, setUserInfo] = useState({
    ...user,
    pastPw: "",
    newPw: "",
  });

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserInfo(user);
    }
  }, [user]);

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  const [pastPwError, setPastPwError] = useState(false);
  const [pastPwErrorText, setPastPwErrorText] = useState("");
  const [PwValidationError, setPwValidationError] = useState(false);
  const [PwValidationErrorText, setPwValidationErrorText] = useState("");
  const [PwError, setPwError] = useState(false);
  const [PwErrorText, setPwErrorText] = useState("");

  const pastPwCheck = useCallback(
    (e) => {
      const pastPw = e.target.value;
      if (pastPw === null || pastPw === "") {
        setPastPwError(true);
        setPastPwErrorText("필수 정보입니다.");
      } else {
        setPastPwError(false);
        setPastPwErrorText("");
      }
      setUserInfo({ ...userInfo, pastPw: pastPw });
    },
    [userInfo]
  );

  // Password Validation Check
  const PwValidationCheck = useCallback((e) => {
    const userPw = e.target.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,}$/;

    if (userPw === null || userPw === "") {
      setPwValidationError(true);
      setPwValidationErrorText("필수 정보입니다.");
    } else if (!passwordRegex.test(userPw)) {
      setPwValidationError(true);
      setPwValidationErrorText(
        "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
      );
    } else {
      setPwValidationError(false);
      setPwValidationErrorText("");
    }
  }, []);

  // Password Check
  const PwCheck = useCallback(
    (e) => {
      const userPw = document.getElementById("userPw").value;
      const userPwCheck = e.target.value;

      if (userPwCheck === null || userPwCheck === "") {
        setPwError(true);
        setPwErrorText("필수 정보입니다.");
      } else if (userPw !== userPwCheck) {
        setPwError(true);
        setPwErrorText("비밀번호가 일치하지 않습니다.");
      } else {
        setPwError(false);
        setPwErrorText("");
      }
      setUserInfo({ ...userInfo, newPw: userPwCheck });
    },
    [userInfo]
  );

  // 변경된 비밀번호 보내기
  const resetPassword = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const pastPw = data.get("pastPw");
    const newPw = data.get("userPw");
    const userPwCheck = data.get("newPw");

    console.log(userInfo);

    if (pastPw === null || pastPw === "") {
      setPastPwError(true);
      setPastPwErrorText("필수 정보입니다.");
    }
    // else if (pastPw !== "dd") {
    //   setPastPwError(true);
    //   setPastPwErrorText("비밀번호가 일치하지 않습니다.");
    // }
    // else {
    //   setUserInfo({ ...userInfo, pastPw: pastPw });
    // }

    if (newPw === null || newPw === "") {
      setPwValidationError(true);
      setPwValidationErrorText("필수 정보입니다.");
    }

    if (userPwCheck === null || userPwCheck === "") {
      setPwError(true);
      setPwErrorText("필수 정보입니다.");
    } else if (newPw !== userPwCheck) {
      setPwError(true);
      setPwErrorText("비밀번호가 일치하지 않습니다.");
    }

    if (
      !pastPwError &&
      !PwValidationError &&
      !PwErrorText &&
      newPw !== "" &&
      userPwCheck !== "" &&
      pastPw !== ""
    ) {
      axios({
        method: "post",
        url: API_BASE_URL + "/mypage/resetpassword",
        data: [userInfo.userId, userInfo.pastPw, userInfo.newPw],
      })
        .then((response) => {
          if (response.data === "correctPassword") {
            console.log(response);
            alert("변경되었습니다.");
            window.location.replace("/mypage/userinfo");
          } else {
            setPastPwError(true);
            setPastPwErrorText("비밀번호가 일치하지 않습니다.");
          }
        })
        .catch((e) => {
          alert("다시 시도해주세요.");
          console.log("catch문 " + e);
        });
    }
  };

  return (
    <div>
      <div className={styles.editInfo}>
        <form onSubmit={resetPassword}>
          <Grid container spacing={3} className="padding">
            <Grid item xs={12}>
              <TextField
                name="pastPw"
                type="password"
                variant="outlined"
                id="pastPw"
                label="현재 비밀번호"
                fullWidth
                error={pastPwError}
                helperText={pastPwErrorText}
                onChange={pastPwCheck}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userPw"
                type="password"
                variant="outlined"
                id="userPw"
                label="변경할 비밀번호"
                fullWidth
                onChange={PwValidationCheck}
                error={PwValidationError}
                helperText={PwValidationErrorText}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="newPw"
                type="password"
                variant="outlined"
                id="newPw"
                label="비밀번호 확인"
                fullWidth
                onChange={PwCheck}
                error={PwError}
                helperText={PwErrorText}
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
            </Grid>
          </Grid>
          <div className={styles.userInfoBtns}>
            <Link to="/mypage/userinfo">
              <Button
                variant="outlined"
                color="primary"
                theme={theme}
                className={styles.profileCancelBtn}
              >
                취소
              </Button>
            </Link>
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
        </form>
      </div>
    </div>
  );
}

export default ResetPw;
