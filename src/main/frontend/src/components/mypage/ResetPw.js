import { Button, createTheme, Grid, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/mypage/ResetPw.module.css";

function ResetPw() {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
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

  const [pastPwError, setPastPwError] = useState(false);
  const [pastPwErrorText, setPastPwErrorText] = useState("");
  const [PwValidationError, setPwValidationError] = useState(false);
  const [PwValidationErrorText, setPwValidationErrorText] = useState("");
  const [PwError, setPwError] = useState(false);
  const [PwErrorText, setPwErrorText] = useState("");

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
  const PwCheck = useCallback((e) => {
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
  }, []);

  const resetPassword = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const pastPw = data.get("pastUserPw");
    const newPw = data.get("userPw");
    const userPwCheck = data.get("userPwCheck");

    if (pastPw === null || pastPw === "") {
      setPastPwError(true);
      setPastPwErrorText("필수 정보입니다.");
    } else if (pastPw !== "dd") {
      setPastPwError(true);
      setPastPwErrorText("비밀번호가 일치하지 않습니다.");
    } else {
      setPastPwError(false);
      setPastPwErrorText("");
    }

    if (newPw === null || newPw === "") {
      setPwValidationError(true);
      setPwValidationErrorText("필수 정보입니다.");
    } else {
      setPwValidationError(false);
      setPwValidationErrorText("");
    }

    if (userPwCheck === null || userPwCheck === "") {
      setPwError(true);
      setPwErrorText("필수 정보입니다.");
    } else if (newPw !== userPwCheck) {
      setPwError(true);
      setPwErrorText("비밀번호가 일치하지 않습니다.");
    } else {
      setPwError(false);
      setPwErrorText("");
    }

    if (
      !pastPwError &&
      !PwValidationError &&
      !PwErrorText &&
      newPw !== "" &&
      userPwCheck !== "" &&
      pastPw !== "" &&
      pastPw === "dd"
    ) {
      alert("변경되었습니다.");
      window.location.replace("/mypage/userinfo");
    }
  };

  return (
    <div>
      <div className={styles.editInfo}>
        <form onSubmit={resetPassword}>
          <Grid container spacing={3} className="padding">
            <Grid item xs={12}>
              <TextField
                name="pastUserPw"
                type="password"
                variant="outlined"
                id="pastUserPw"
                label="현재 비밀번호"
                fullWidth
                error={pastPwError}
                helperText={pastPwErrorText}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userPwCheck"
                type="password"
                variant="outlined"
                id="userPwCheck"
                label="비밀번호 확인"
                fullWidth
                onChange={PwCheck}
                error={PwError}
                helperText={PwErrorText}
              />
            </Grid>
          </Grid>
          <div className={styles.userInfoBtns}>
            <Link to="/mypage/userinfo">
              <Button
                variant="outlined"
                color="secondary"
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
