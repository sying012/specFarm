import { createTheme, Grid, TextField, Button, styled } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
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

const FindId = () => {
  const [userName, setUserName] = useState("");
  const [findId, setFindId] = useState("");
  const [nameError, setNameError] = useState({ error: false, text: "" });
  const [telError, setTelError] = useState({ error: false, text: "" });
  const [telAuthNumberError, setTelAuthNumberError] = useState({
    error: false,
    text: "",
  });
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [telAuthNumber, setTelAuthNumber] = useState("");

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
  const telAuth = useCallback((e) => {
    const userTel = document.getElementById("findId_userTel").value;
    document.getElementById("findId_authAlert").hidden = false;

    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("findId_userTel").value = newUserTel;

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
      } else if (parseInt(userTelAuthNumber) !== telAuthNumber) {
        setTelAuthNumberError({
          error: true,
          text: "인증번호를 다시 확인해주세요.",
        });
      } else {
        setTelAuthNumberError({ error: false, text: "" });
        document.getElementById("findId_authAlert").hidden = true;
      }
    },
    [telAuthNumber]
  );

  const telAuthNumberErrorReset = useCallback((e) => {
    setTelAuthNumberError({ error: false, text: "" });
  });

  // find id identify check
  const findIdIdentifyCheck = false;
  const findIdSubmit = (e) => {
    e.preventDefault();
    document.getElementById("findIdFailAlert").hidden = true;
    const data = new FormData(e.target);
    const userName = data.get("userName");
    const userTel = data.get("userTel");
    const userTelAuthNumber = data.get("userTelAuthNumber");

    if (userName === null || userName === "") {
      setNameError({ error: true, text: "필수 정보입니다." });
    }

    if (userTel === null || userTel === "") {
      setTelError({ error: true, text: "필수 정보입니다." });
    }

    if (userTelAuthNumber === null || userTelAuthNumber === "") {
      setTelAuthNumberError({
        error: true,
        text: "인증이 필요합니다.",
      });
    } else if (parseInt(userTelAuthNumber) !== telAuthNumber) {
      setTelAuthNumberError({
        error: true,
        text: "인증번호를 다시 확인해주세요.",
      });
    }

    if (
      !nameError.error &&
      userName !== "" &&
      !telError.error &&
      userTel !== "" &&
      !telAuthNumberError.error &&
      userTelAuthNumber !== "" &&
      parseInt(userTelAuthNumber) === telAuthNumber
    ) {
      axios({
        method: "post",
        url: API_BASE_URL + "/user/findUser",
        data: { userName: userName, userTel: userTel },
      }).then((response) => {
        if (response.data === "fail") {
          document.getElementById("findIdFailAlert").hidden = false;
        } else if (response.data !== null || response.data !== "") {
          setUserName(userName);
          setFindId(response.data.userId);
        }
      });
    }
  };

  let findIdPage = (
    <form
      onSubmit={findIdSubmit}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Grid container spacing={3} className={styles.padding}>
        <Grid item xs={12}>
          <CssTextField
            name="userName"
            variant="outlined"
            id="findId_userName"
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
            id="findId_userTel"
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
            id="findId_userTelAuthNumber"
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
            id="findId_authAlert"
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
            id="findIdFailAlert"
            hidden
          >
            일치하는 정보가 없습니다.
          </p>
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
            아이디 찾기
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  let findIdResultPage = (
    <div className={styles.findIdResultDiv}>
      <p className={styles.findIdSubTitle}>
        '{userName}'님의 아이디는 {findId}입니다.
      </p>
      <br />
      <NavLink to="/login" className={styles.goLogin}>
        &nbsp;&nbsp;로그인하러 가기 ▶
      </NavLink>
    </div>
  );

  let content = findIdPage;

  if (findId !== "" && findId !== null) {
    content = findIdResultPage;
  }

  return (
    <div>
      <p className={styles.title}>아이디 찾기</p>
      <div>{content}</div>
    </div>
  );
};

export default FindId;
