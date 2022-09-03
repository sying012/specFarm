import { createTheme, Grid, TextField, Button, Link } from "@mui/material";
import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
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
      main: "#8cbf75",
      contrastText: "#fff",
    },
  },
});

const FindId = () => {
  const [userName, setUserName] = useState("");
  const [findId, setFindId] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [telError, setTelError] = useState(false);
  const [telErrorText, setTelErrorText] = useState("");
  const [telAuthNumberError, setTelAuthNumberError] = useState(false);
  const [telAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);

  //   const callAxios = () => {
  //     axios({}).then((response) => {
  //       setFindId(response.data);
  //     });
  //   };

  // UserName Null Check
  const nameCheck = useCallback((e) => {
    const userName = e.target.value;
    if (userName === null || userName === "") {
      setNameError(true);
      setNameErrorText("필수 정보입니다.");
    } else {
      setNameError(false);
      setNameErrorText("");
    }
  }, []);

  const nameErrorReset = useCallback((e) => {
    setNameError(false);
    setNameErrorText("");
  });

  // Phone number authentication
  const telAuth = useCallback((e) => {
    const userTel = document.getElementById("findId_userTel").value;

    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("findId_userTel").value = newUserTel;

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

      setTelAuthNumberError(false);
      setTelAuthNumberErrorText("");
    }
  }, []);

  const telErrorReset = useCallback((e) => {
    setTelError(false);
    setTelErrorText("");
  });

  // Phone number authentication Number Check
  const telAuthNumberCheck = useCallback((e) => {
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

  const telAuthNumberErrorReset = useCallback((e) => {
    setTelAuthNumberError(false);
    setTelAuthNumberErrorText("");
  });

  // find id identify check
  const findIdIdentifyCheck = false;
  const findIdSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userName = data.get("userName");
    const userTel = data.get("userTel");
    const userTelAuthNumber = data.get("userTelAuthNumber");

    if (userName === null || userName === "") {
      setNameError(true);
      setNameErrorText("필수 정보입니다.");
    }

    if (userTel === null || userTel === "") {
      setTelError(true);
      setTelErrorText("필수 정보입니다.");
    }

    if (userTelAuthNumber === null || userTelAuthNumber === "") {
      setTelAuthNumberError(true);
      setTelAuthNumberErrorText("인증이 필요합니다.");
    }

    if (
      !nameError &&
      userName !== "" &&
      !telError &&
      userTel !== "" &&
      !telAuthNumberError &&
      userTelAuthNumber !== ""
    ) {
      setUserName(userName);
      setFindId("user1234");
      const id = "user1234";
      const newid = id.replace(/.$/, "*");
      console.log(newid);
    }
  };

  let findIdPage = (
    <form onSubmit={findIdSubmit}>
      <Grid container spacing={3} className={styles.padding}>
        <Grid item xs={12}>
          <TextField
            name="userName"
            variant="outlined"
            id="findId_userName"
            label="이름"
            fullWidth
            onBlur={nameCheck}
            error={nameError}
            helperText={nameErrorText}
            onFocus={nameErrorReset}
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            name="userTel"
            variant="outlined"
            id="findId_userTel"
            label="휴대폰 번호"
            fullWidth
            error={telError}
            helperText={telErrorText}
            onFocus={telErrorReset}
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "10px", paddingTop: "28px" }}>
          <Button
            variant="contained"
            theme={theme}
            color="lightgreen"
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              padding: "14px 10px",
            }}
            onClick={telAuth}
          >
            인증번호 받기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="userTelAuthNumber"
            variant="outlined"
            id="findId_userTelAuthNumber"
            label="인증번호"
            fullWidth
            onBlur={telAuthNumberCheck}
            onFocus={telAuthNumberErrorReset}
            error={telAuthNumberError}
            helperText={telAuthNumberErrorText}
            disabled={telAuthNumberDisabled}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#F5F5F5",
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
    console.log(findId);
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
