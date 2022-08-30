import { Button, createTheme, Grid, TextField } from "@mui/material";
import { useState } from "react";
import styles from "../../styles/mypage/CheckPw.module.css";

function CheckPw() {
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

  // Password Validation Check
  const [PwValidationError, setPwValidationError] = useState(false);
  const [PwValidationErrorText, setPwValidationErrorText] = useState("");

  const deactivate = (e) => {
    const userPw = document.getElementById("userPw").value;
    e.preventDefault();
    if (userPw === null || userPw === "") {
      setPwValidationError(true);
      setPwValidationErrorText("필수 정보입니다.");
    } else if (userPw !== "dd") {
      setPwValidationError(true);
      setPwValidationErrorText("비밀번호가 일치하지 않습니다.");
    } else {
      setPwValidationError(false);
      setPwValidationErrorText("");
      alert("탈퇴가 정상적으로 처리되었습니다.");
      window.location.replace("/");
    }
  };

  return (
    <div>
      <div className={styles.mdfContainer}>
        <h1 className={styles.mdfTitle}>비밀번호 재확인</h1>
        <p className={styles.deactivateSub}>
          정말로 회원탈퇴를 하시겠습니까? 비밀번호를 다시 한 번 입력해주세요.
        </p>
        <div className={styles.passwordCheck}>
          <Grid container spacing={3} className={styles.padding}>
            <Grid item xs={12}>
              <TextField
                name="userPw"
                type="password"
                variant="outlined"
                id="userPw"
                label="비밀번호"
                fullWidth
                error={PwValidationError}
                helperText={PwValidationErrorText}
              />
            </Grid>
          </Grid>
        </div>
        <div className={styles.deactivateBtns}>
          <Button
            variant="outlined"
            color="secondary"
            href="/mypage/deactivate"
            theme={theme}
            className={styles.profileCancelBtn}
          >
            취소
          </Button>
          <Button
            color="primary"
            variant="contained"
            theme={theme}
            className={styles.profileApplyBtn}
            onClick={deactivate}
          >
            탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckPw;
