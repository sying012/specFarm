import { Button, createTheme, Grid, styled, TextField } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/findUser/FindUser.module.css";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "#1d5902",
      contrastText: "#fff",
    },
    lightgreen: {
      main: "#F2C335",
      contrastText: "#fff",
    },
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#8cbf75",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#8cbf75",
    },
  },
});

const PwReset = () => {
  const navigate = useNavigate();
  const [idError, setIdError] = useState({ error: false, text: "" });
  const [nameError, setNameError] = useState({ error: false, text: "" });
  const [telError, setTelError] = useState({ error: false, text: "" });
  const [telAuthNumberError, setTelAuthNumberError] = useState({
    error: false,
    text: "",
  });
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [telAuthNumber, setTelAuthNumber] = useState("");
  const [pwValidationError, setPwValidationError] = useState({
    error: false,
    text: "",
  });
  const [pwError, setPwError] = useState({ error: false, text: "" });
  const [identifyCheck, setIdentifyCheck] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  // Id Check
  const idCheck = useCallback((e) => {
    const userId = e.target.value;

    if (userId === null || userId === "") {
      setIdError({ error: true, text: "필수 정보입니다." });
    } else {
      setIdError({
        error: false,
        text: "",
      });
    }
  }, []);

  const idErrorReset = useCallback((e) => {
    // setIdError({
    //   ...idError,
    //   text: "aaa",
    // });
    setIdError({
      error: false,
      text: "",
    });
  });

  // UserName Null Check
  const nameCheck = useCallback((e) => {
    const userName = e.target.value;
    const nameRegex = /[a-z0-9]|[ []{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

    if (nameRegex.test(userName)) {
      setNameError({ error: true, text: "한글만 사용하세요." });
    } else if (userName === null || userName === "") {
      setNameError({ error: true, text: "필수 정보입니다." });
    } else {
      setNameError({ error: false, text: "" });
    }
  }, []);

  const nameErrorReset = useCallback((e) => {
    setNameError({ error: false, text: "" });
  });

  // Phone number authentication
  // let telAuthNumberDisabled = true;
  const telAuth = useCallback((e) => {
    const userTel = document.getElementById("pwReset_userTel").value;
    document.getElementById("pwReset_authAlert").hidden = false;

    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("pwReset_userTel").value = newUserTel;

    const TelRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (newUserTel === null || newUserTel === "") {
      setTelError({ error: true, text: "필수 정보입니다." });
    } else if (!TelRegex.test(newUserTel)) {
      setTelError({ error: true, text: "형식에 맞지 않는 번호입니다." });
    } else {
      setTelError({ error: false, text: "" });
      setTelAuthNumberDisabled(false);
      setTelAuthNumberError({ error: false, text: "" });

      axios({
        method: "post",
        url: API_BASE_URL + "/user/check/sendSMS",
        data: { userTel: newUserTel },
      }).then((response) => {
        setTelAuthNumber(response.data);
      });
    }
  }, []);

  const telErrorReset = useCallback((e) => {
    setTelError({ error: false, text: "" });
  });

  // Phone number authentication Number Check
  const telAuthNumberCheck = useCallback(
    (e) => {
      const userTelAuthNumber = e.target.value;
      if (userTelAuthNumber === null || userTelAuthNumber === "") {
        setTelAuthNumberError({ error: true, text: "인증이 필요합니다." });
      } else if (parseInt(userTelAuthNumber) != telAuthNumber) {
        setTelAuthNumberError({
          error: true,
          text: "인증번호를 다시 확인해주세요.",
        });
      } else {
        setTelAuthNumberError({ error: false, text: "" });
        document.getElementById("pwReset_authAlert").hidden = true;
      }
    },
    [telAuthNumber]
  );

  const telAuthNumberErrorReset = useCallback((e) => {
    setTelAuthNumberError({ error: false, text: "" });
  });

  // Password Validation Check
  const pwValidationCheck = useCallback((e) => {
    const userPw = e.target.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,}$/;
    if (userPw === null || userPw === "") {
      setPwValidationError({ error: true, text: "필수 정보입니다." });
    } else if (!passwordRegex.test(userPw)) {
      setPwValidationError({
        error: true,
        text: "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
      });
    } else {
      setPwValidationError({ error: false, text: "" });
    }
  }, []);

  const pwValidationErrorReset = useCallback((e) => {
    setPwValidationError({ error: false, text: "" });
  });

  // Password Check
  const pwCheck = useCallback((e) => {
    const userPw = document.getElementById("pwReset_userPw").value;
    const userPwCheck = e.target.value;

    if (userPwCheck === null || userPwCheck === "") {
      setPwError({ error: true, text: "필수 정보입니다." });
    } else if (userPw !== userPwCheck) {
      setPwError({ error: true, text: "비밀번호가 일치하지 않습니다." });
    } else {
      setPwError({ error: false, text: "" });
    }
  }, []);

  const pwErrorReset = useCallback((e) => {
    setPwError({ error: false, text: "" });
  });

  // find user => next step
  const PwResetNext = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const userId = data.get("userId");
    const userName = data.get("userName");
    const userTel = data.get("userTel");
    const userTelAuthNumber = data.get("userTelAuthNumber");

    if (userId === null || userId === "") {
      setIdError({ error: true, text: "필수 정보입니다." });
    }

    if (userName === null || userName === "") {
      setNameError({ error: true, text: "필수 정보입니다." });
    }

    if (userTel === null || userTel === "") {
      setTelError({ error: true, text: "필수 정보입니다." });
    }

    if (userTelAuthNumber === null || userTelAuthNumber === "") {
      setTelAuthNumberError({ error: true, text: "인증이 필요합니다." });
    } else if (parseInt(userTelAuthNumber) != telAuthNumber) {
      setTelAuthNumberError({
        error: true,
        text: "인증번호를 다시 확인해주세요.",
      });
    }

    if (
      !idError.error &&
      userId !== "" &&
      !nameError.error &&
      userName !== "" &&
      !telError.error &&
      userTel !== "" &&
      !telAuthNumberError.error &&
      userTelAuthNumber !== "" &&
      parseInt(userTelAuthNumber) === telAuthNumber
    ) {
      const userInfo = {
        userId: userId,
        userName: userName,
        userTel: userTel,
      };

      axios({
        method: "post",
        url: API_BASE_URL + "/user/findUser",
        data: userInfo,
      }).then((response) => {
        if (response.data === "fail") {
          document.getElementById("findPwFailAlert").hidden = false;
        } else if (response.data !== null || response.data !== "") {
          e.target.reset();
          setIdentifyCheck(true);
          setUserInfo(response.data);
        }
      });
    }
  };

  // password reset
  const pwResetSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const userPw = data.get("userPw");
    const userPwCheck = data.get("userPwCheck");

    if (userPw === null || userPw === "") {
      setPwValidationError({ error: true, text: "필수 정보입니다." });
    }

    if (userPwCheck === null || userPwCheck === "") {
      setPwError({ error: true, text: "필수 정보입니다." });
    }

    if (
      !pwValidationError.error &&
      userPw !== "" &&
      !pwError.error &&
      userPwCheck !== ""
    ) {
      axios({
        method: "post",
        url: API_BASE_URL + "/user/pwReset",
        data: { ...userInfo, userPw: userPw },
      }).then((response) => {
        if (response.data === "success") {
          navigate("/login");
        }
      });
    }
  };

  let pwResetPage = (
    <form
      onSubmit={PwResetNext}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Grid container spacing={3} className={styles.padding}>
        <Grid item xs={12}>
          <CssTextField
            name="userId"
            variant="outlined"
            id="pwReset_userId"
            label="아이디"
            fullWidth
            onBlur={idCheck}
            error={idError.error}
            helperText={idError.text}
            onFocus={idErrorReset}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            name="userName"
            variant="outlined"
            id="pwReset_userName"
            label="이름"
            fullWidth
            onBlur={nameCheck}
            error={nameError.error}
            helperText={nameError.text}
            onFocus={nameErrorReset}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <CssTextField
            name="userTel"
            variant="outlined"
            id="pwReset_userTel"
            label="휴대폰 번호"
            fullWidth
            error={telError.error}
            helperText={telError.text}
            onFocus={telErrorReset}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "14px" }}>
          <Button
            variant="contained"
            theme={theme}
            color="lightgreen"
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              height: "45px",
              padding: "7px",
            }}
            // className={styles.buttonSmall}
            onClick={telAuth}
          >
            인증번호 받기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            name="userTelAuthNumber"
            variant="outlined"
            id="pwReset_userTelAuthNumber"
            label="인증번호"
            fullWidth
            onBlur={telAuthNumberCheck}
            onFocus={telAuthNumberErrorReset}
            error={telAuthNumberError.error}
            helperText={telAuthNumberError.text}
            disabled={telAuthNumberDisabled}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#F5F5F5",
              },
            }}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
          <p
            id="pwReset_authAlert"
            style={{
              fontSize: "14px",
              lineHeight: "120%",
              color: "rgb(9, 9, 9)",
              padding: "3px 14px 0px 14px",
            }}
            hidden
          >
            인증번호를 발송했습니다. (유효시간 30분)
            <br />
            인증번호가 오지않으면 입력하신 정보가 정확한지 확인하여 주세요.
          </p>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: "0" }}>
          <p
            className={styles.font15}
            style={{
              color: "#e53e3e",
              background: "rgba(229, 62, 62, 0.1)",
              padding: "10px",
              marginTop: "24px",
            }}
            id="findPwFailAlert"
            hidden
          >
            일치하는 정보가 없습니다.
          </p>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "30px" }}>
          <Button
            variant="contained"
            type="submit"
            theme={theme}
            color="green"
            className={styles.buttonMiddle}
            style={{
              fontSize: "15px",
              lineHeight: "18px",
              padding: "14px 16px",
            }}
          >
            비밀번호 재설정
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  let pwResetResultPage = (
    <form
      className={styles.pwResetResultDiv}
      onSubmit={pwResetSubmit}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Grid container spacing={3} className={styles.padding}>
        <Grid item xs={12}>
          <CssTextField
            name="userPw"
            type="password"
            variant="outlined"
            id="pwReset_userPw"
            label="비밀번호"
            fullWidth
            onBlur={pwValidationCheck}
            error={pwValidationError.error}
            helperText={pwValidationError.text}
            onFocus={pwValidationErrorReset}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            name="userPwCheck"
            type="password"
            variant="outlined"
            id="pwReset_userPwCheck"
            label="비밀번호 확인"
            fullWidth
            onBlur={pwCheck}
            error={pwError.error}
            helperText={pwError.text}
            onFocus={pwErrorReset}
            inputProps={{
              style: {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
            InputLabelProps={{
              style: {
                lineHeight: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            theme={theme}
            color="green"
            className={styles.buttonMiddle}
            style={{
              fontSize: "15px",
              lineHeight: "18px",
              padding: "14px 16px",
            }}
          >
            비밀번호 재설정
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <div>
      <p className={styles.title}>비밀번호 재설정</p>
      {identifyCheck ? pwResetResultPage : pwResetPage}
    </div>
  );
};

export default PwReset;
