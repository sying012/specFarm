import React, { useCallback, useState } from "react";
import logo from "../../images/logo_green1.png";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  createTheme,
  Checkbox,
  MenuItem,
  styled,
} from "@mui/material";
import styles from "../../styles/join/Join.module.css";
import { ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
// import axios from "axios";

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
  typography: {
    fontFamily: [
      "Hahmlet",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1d5902",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#8cbf75",
    },
  },
});

const JoinPage = () => {
  const [idError, setIdError] = useState(false);
  const [idErrorText, setIdErrorText] = useState("");
  const [pwValidationError, setPwValidationError] = useState(false);
  const [pwValidationErrorText, setPwValidationErrorText] = useState("");
  const [pwError, setPwError] = useState(false);
  const [pwErrorText, setPwErrorText] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [telError, setTelError] = useState(false);
  const [telErrorText, setTelErrorText] = useState("");
  const [telAuthNumberError, setTelAuthNumberError] = useState(false);
  const [telAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [certLCat, setCertLCat] = useState([{ id: 1, name: "사업관리" }]);
  const [certL, setCertL] = useState("");
  const [certMCat, setCertMCat] = useState([{ id: 1, name: "사업관리" }]);
  const [certM, setCertM] = useState("");
  const [checked, setChecked] = useState(false);

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

  const idErrorReset = useCallback((e) => {
    setIdError(false);
    setIdErrorText("");
  });

  // Password Validation Check
  const pwValidationCheck = useCallback((e) => {
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

  const pwValidationErrorReset = useCallback((e) => {
    setPwValidationError(false);
    setPwValidationErrorText("");
  });

  // Password Check
  const pwCheck = useCallback((e) => {
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

  const pwErrorReset = useCallback((e) => {
    setPwError(false);
    setPwErrorText("");
  });

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
    const userTel = document.getElementById("userTel").value;
    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("userTel").value = newUserTel;

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

  // Email Validation Check
  const emailCheck = useCallback((e) => {
    const userEmail = e.target.value;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (userEmail === null || userEmail === "") {
      setEmailError(false);
      setEmailErrorText("");
    } else if (!emailRegex.test(userEmail)) {
      setEmailError(true);
      setEmailErrorText("이메일 주소를 다시 확인해주세요.");
    } else {
      setEmailError(false);
      setEmailErrorText("");
    }
  }, []);

  const emailErrorReset = useCallback((e) => {
    setEmailError(false);
    setEmailErrorText("");
  });

  // Cert Large Category
  const certLCatChange = (e) => {
    console.log(e.target.value);
    setCertL(e.target.value);
  };

  // Cert Middle Category
  const certMCatChange = (e) => {
    console.log(e.target.value);
    setCertM(e.target.value);
  };

  // checked
  const checkedCheck = useCallback((e) => {
    setChecked(e.target.checked);
  }, []);

  // join submit
  const joinSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userId = data.get("userId");
    const userPw = data.get("userPw");
    const userPwCheck = data.get("userPwCheck");
    const userName = data.get("userName");
    const userTel = data.get("userTel");
    const userTelAuthNumber = data.get("userTelAuthNumber");
    console.log(checked);
    if (userId === null || userId === "") {
      setIdError(true);
      setIdErrorText("필수 정보입니다.");
    }

    if (userPw === null || userPw === "") {
      setPwValidationError(true);
      setPwValidationErrorText("필수 정보입니다.");
    }

    if (userPwCheck === null || userPwCheck === "") {
      setPwError(true);
      setPwErrorText("필수 정보입니다.");
    }

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

    if (!checked) {
      document.getElementById("checkedAlert").hidden = false;
    } else {
      document.getElementById("checkedAlert").hidden = true;
    }

    if (
      !idError &&
      userId !== "" &&
      !pwValidationError &&
      userPw !== "" &&
      !pwError &&
      userPwCheck !== "" &&
      !nameError &&
      userName !== "" &&
      !telError &&
      userTel !== "" &&
      !telAuthNumberError &&
      userTelAuthNumber !== "" &&
      !emailError &&
      checked
    ) {
      console.log("join success!!");
      window.location.replace("/");
    }
  };

  return (
    <div className={styles.margin15}>
      <div className={styles.form}>
        <form onSubmit={joinSubmit}>
          <div className={styles.logo}>
            <NavLink to="/">specFarm</NavLink>
          </div>
          <p className={styles.title}>회원가입</p>
          <Grid container spacing={3} className={styles.padding}>
            <Grid item xs={12}>
              <CssTextField
                name="userId"
                variant="outlined"
                id="userId"
                label="아이디"
                fullWidth
                onBlur={idCheck}
                error={idError}
                helperText={idErrorText}
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
                name="userPw"
                type="password"
                variant="outlined"
                id="userPw"
                label="비밀번호"
                fullWidth
                onBlur={pwValidationCheck}
                error={pwValidationError}
                helperText={pwValidationErrorText}
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
                id="userPwCheck"
                label="비밀번호 확인"
                fullWidth
                onBlur={pwCheck}
                error={pwError}
                helperText={pwErrorText}
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
              <CssTextField
                name="userName"
                variant="outlined"
                id="userName"
                label="이름"
                fullWidth
                onBlur={nameCheck}
                error={nameError}
                helperText={nameErrorText}
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
                id="userTel"
                label="휴대폰 번호"
                fullWidth
                error={telError}
                helperText={telErrorText}
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
                  padding: "8px",
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
                id="userTelAuthNumber"
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
                name="userEmail"
                variant="outlined"
                id="userEmail"
                label="이메일(선택)"
                fullWidth
                onBlur={emailCheck}
                error={emailError}
                helperText={emailErrorText}
                onFocus={emailErrorReset}
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
            <Grid item xs={5.8}>
              <FormControl
                sx={{ minWidth: 120 }}
                fullWidth
                style={{
                  fontSize: "14px",
                }}
              >
                <InputLabel
                  id="certLCat"
                  sx={{
                    "&.Mui-focused": {
                      color: "#8cbf75",
                    },
                    lineHeight: "100%",
                  }}
                >
                  관심분야(대분류)
                </InputLabel>
                <Select
                  labelId="certLCat"
                  id="certLCatSelect"
                  value={certL}
                  label="관심분야(대분류)"
                  onChange={certLCatChange}
                  name="certLCat"
                  style={{ height: "45px" }}
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#8cbf75",
                      },
                    },
                  }}
                >
                  {certLCat.map((certL) => (
                    <MenuItem
                      key={certL.id}
                      value={certL.name}
                      sx={{
                        "&.MuiMenuItem-root": {
                          "&.Mui-selected": {
                            backgroundColor: "rgba(140, 191, 117, 0.2)",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "rgba(140, 191, 117, 0.3)",
                          },
                        },
                      }}
                    >
                      {certL.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                paddingLeft: "0px",
                paddingTop: "35px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrowForwardIos color="action" />
            </Grid>
            <Grid item xs={5.2} style={{ paddingLeft: "0px" }}>
              <FormControl
                sx={{ minWidth: 120 }}
                //   size="small"
                fullWidth
                style={{ fontSize: "14px" }}
              >
                <InputLabel
                  id="certMCat"
                  sx={{
                    "&.Mui-focused": {
                      color: "#8cbf75",
                    },
                    lineHeight: "100%",
                  }}
                >
                  관심분야(중분류)
                </InputLabel>
                <Select
                  labelId="certMCat"
                  id="certMCatSelect"
                  value={certM}
                  label="관심분야(중분류)"
                  onChange={certMCatChange}
                  name="certMCat"
                  style={{ height: "45px" }}
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#8cbf75",
                      },
                    },
                  }}
                >
                  {certMCat.map((certM) => (
                    <MenuItem
                      key={certM.id}
                      value={certM.name}
                      sx={{
                        "&.MuiMenuItem-root": {
                          "&.Mui-selected": {
                            backgroundColor: "rgba(140, 191, 117, 0.2)",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "rgba(140, 191, 117, 0.3)",
                          },
                        },
                      }}
                    >
                      {certM.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.3}>
              <Checkbox
                size="small"
                style={{ padding: "0px" }}
                onChange={checkedCheck}
              />
            </Grid>
            <Grid item xs={10.7} style={{ paddingLeft: "2px" }}>
              <NavLink to="/a" className={styles.navLink}>
                [필수] 개인정보 수집 및 이용동의
              </NavLink>
            </Grid>
            <Grid item xs={1.3} style={{ paddingTop: "10px" }}>
              <Checkbox size="small" style={{ padding: "0px" }} />
            </Grid>
            <Grid item xs={10.7} style={{ padding: "10px 2px" }}>
              <NavLink to="/a" className={styles.navLink}>
                [선택] 새로운 기능 출시안내 (광고 마케팅 수신동의)
              </NavLink>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <p
                className={styles.font15}
                style={{
                  color: "#e53e3e",
                  // border: "1px solid #e53e3e",
                  background: "rgba(229, 62, 62, 0.1)",
                  padding: "10px",
                }}
                id="checkedAlert"
                hidden
              >
                개인정보 수집 및 이용에 대한 안내를 동의해주세요.
              </p>
            </Grid>
            <Grid item xs={7.5} style={{ paddingBottom: "30px" }}>
              <p>
                이미 계정이 있으신가요?&nbsp;&nbsp;
                <NavLink to="/login" className={styles.navLink}>
                  로그인
                </NavLink>
              </p>
            </Grid>
            <Grid item xs={4.5} style={{ paddingBottom: "30px" }}>
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
                계정 만들기
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
