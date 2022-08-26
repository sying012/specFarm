import { Button, createTheme, Grid, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "rgb(159, 182, 72)",
      contrastText: "#fff",
    },
    brown: {
      main: "rgb(107, 83, 67)",
      contrastText: "#fff",
    },
  },
});

const PwReset = () => {
  const [IdError, setIdError] = useState(false);
  const [IdErrorText, setIdErrorText] = useState("");
  const [NameError, setNameError] = useState(false);
  const [NameErrorText, setNameErrorText] = useState("");
  const [TelError, setTelError] = useState(false);
  const [TelErrorText, setTelErrorText] = useState("");
  const [TelAuthNumberError, setTelAuthNumberError] = useState(false);
  const [TelAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [TelAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [PwValidationError, setPwValidationError] = useState(false);
  const [PwValidationErrorText, setPwValidationErrorText] = useState("");
  const [PwError, setPwError] = useState(false);
  const [PwErrorText, setPwErrorText] = useState("");

  // Id Check
  const idCheck = useCallback((e) => {
    const userId = e.target.value;

    if (userId === null || userId === "") {
      setIdError(true);
      setIdErrorText("필수 정보입니다.");
    } else if (userId === "jkj2564") {
      setIdError(true);
      setIdErrorText("이미 사용중이거나 탈퇴한 아이디입니다.");
    } else {
      setIdError(false);
      setIdErrorText("");
    }

    // axios({
    //   method: "post",
    //   url: "/user/join",
    //   data: userId,
    // }).then((response) => {
    //   if (response) {
    //   }
    // });
  }, []);

  // UserName Null Check
  const NameCheck = useCallback((e) => {
    const userName = e.target.value;
    if (userName === null || userName === "") {
      setNameError(true);
      setNameErrorText("필수 정보입니다.");
    } else {
      setNameError(false);
      setNameErrorText("");
    }
  }, []);

  // Phone number authentication
  const TelAuth = useCallback((e) => {
    const userTel = document.getElementById("pwReset_userTel").value;

    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("pwReset_userTel").value = newUserTel;

    const TelRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (newUserTel === null || newUserTel === "") {
      setTelError(true);
      setTelErrorText("필수 정보입니다.");
    } else if (!TelRegex.test(newUserTel)) {
      setTelError(true);
      setTelErrorText("형식에 맞지 않는 번호입니다.");
    } else {
      setTelError(false);
      setTelErrorText("");
      setTelAuthNumberDisabled(false);
    }
  }, []);

  // Phone number authentication Number Check
  const TelAuthNumberCheck = useCallback((e) => {
    const userTelAuthNumber = e.target.value;
    if (userTelAuthNumber === null || userTelAuthNumber === "") {
      setTelAuthNumberError(true);
      setTelAuthNumberErrorText("인증이 필요합니다.");
    } else {
      setTelAuthNumberError(false);
      setTelAuthNumberErrorText("");
    }
    // 인증번호 비교 후 인증 성공 실패 관련
  }, []);

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

  const PwResetSubmit = (e) => {};

  let PwResetPage = (
    <form onSubmit={PwResetSubmit}>
      <Grid container spacing={3} className="padding">
        <Grid item xs={12}>
          <TextField
            name="userId"
            variant="outlined"
            id="userId"
            label="아이디"
            fullWidth
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            onBlur={idCheck}
            error={IdError}
            helperText={IdErrorText}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="userName"
            variant="outlined"
            id="userName"
            label="이름"
            //   size="small"
            fullWidth
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            onBlur={NameCheck}
            error={NameError}
            helperText={NameErrorText}
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            name="userTel"
            variant="outlined"
            id="pwReset_userTel"
            label="휴대폰 번호"
            fullWidth
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            error={TelError}
            helperText={TelErrorText}
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "10px", paddingTop: "28px" }}>
          <Button
            variant="contained"
            theme={theme}
            color="brown"
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              padding: "14px 10px",
            }}
            onClick={TelAuth}
          >
            인증번호 받기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="userTelAuthNumber"
            variant="outlined"
            id="userTelAuthNumber"
            label="인증번호"
            fullWidth
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            onBlur={TelAuthNumberCheck}
            error={TelAuthNumberError}
            helperText={TelAuthNumberErrorText}
            disabled={TelAuthNumberDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            theme={theme}
            color="green"
            style={{
              fontSize: "15px",
              lineHeight: "18px",
              padding: "14px 16px",
              marginBottom: "20px",
            }}
          >
            비밀번호 재설정
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  let PwResetResultPage = (
    <form className="pwResetResultDiv">
      <Grid container spacing={3} className="padding">
        <Grid item xs={12}>
          <TextField
            name="userPw"
            type="password"
            variant="outlined"
            id="userPw"
            label="비밀번호"
            fullWidth
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            onBlur={PwValidationCheck}
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
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
            onBlur={PwCheck}
            error={PwError}
            helperText={PwErrorText}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            theme={theme}
            color="green"
            style={{
              fontSize: "15px",
              lineHeight: "18px",
              padding: "14px 16px",
              marginBottom: "20px",
            }}
          >
            비밀번호 재설정
          </Button>
        </Grid>
      </Grid>
    </form>
  );
  let content = PwResetPage;

  return (
    <div>
      <p className="title">비밀번호 재설정</p>
      <div>{PwResetResultPage}</div>
    </div>
  );
};

export default PwReset;
