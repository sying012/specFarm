import { createTheme, Grid, TextField, Button, Link } from "@mui/material";
import React, { useCallback, useState } from "react";
import styles from "../../styles/findUser/findUser.module.css";

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

const FindId = () => {
  const [findId, setFindId] = useState("");
  const [NameError, setNameError] = useState(false);
  const [NameErrorText, setNameErrorText] = useState("");
  const [TelError, setTelError] = useState(false);
  const [TelErrorText, setTelErrorText] = useState("");
  const [TelAuthNumberError, setTelAuthNumberError] = useState(false);
  const [TelAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [TelAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);

  //   const callAxios = () => {
  //     axios({}).then((response) => {
  //       setFindId(response.data);
  //     });
  //   };

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
    }
  }, []);

  // find id submit
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

    if (!NameError && !TelError && !TelAuthNumberError) {
      setFindId("ABCDEFG");
    }
  };

  let findIdPage = (
    <form onSubmit={findIdSubmit}>
      <Grid container spacing={3} className={styles.padding}>
        <Grid item xs={12}>
          <TextField
            name="userName"
            variant="outlined"
            id="userName"
            label="이름"
            fullWidth
            onBlur={NameCheck}
            error={NameError}
            helperText={NameErrorText}
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            name="userTel"
            variant="outlined"
            id="findId_userTel"
            label="휴대폰 번호"
            fullWidth
            error={TelError}
            helperText={TelErrorText}
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "10px", paddingTop: "28px" }}>
          <Button
            variant="contained"
            theme={theme}
            color="brown"
            className={styles.buttonSmall}
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
            className={styles.buttonMiddle}
          >
            아이디 찾기
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  let findIdResultPage = (
    <div className={styles.findIdResultDiv}>
      <p className={styles.findIdSubTitle}>''님의 아이디는 {findId}입니다.</p>
      <br />
      <Link color="inherit" underline="hover" href="/login">
        &nbsp;&nbsp;로그인하러 가기 ▶
      </Link>
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
