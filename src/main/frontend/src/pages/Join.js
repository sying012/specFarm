import React, { useCallback, useEffect, useState } from "react";
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
  FormControlLabel,
} from "@mui/material";
import styles from "../styles/join/Join.module.css";
import { ArrowForwardIos } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useBeforeRender } from "../utils";

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
  // typography: {
  //   fontFamily: [
  //     "Hahmlet",
  //     "Segoe UI",
  //     "Roboto",
  //     "Oxygen",
  //     "Ubuntu",
  //     "Cantarell",
  //     "Fira Sans",
  //     "Droid Sans",
  //     "Helvetica Neue",
  //   ].join(","),
  // },
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

const Join = () => {
  useBeforeRender(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }, []);

  const navigate = useNavigate();
  const [idError, setIdError] = useState({ error: false, text: "" });
  const [pwValidationError, setPwValidationError] = useState({
    error: false,
    text: "",
  });
  const [pwError, setPwError] = useState({ error: false, text: "" });
  const [nameError, setNameError] = useState({ error: false, text: "" });
  const [telError, setTelError] = useState({ error: false, text: "" });
  const [telAuthNumberError, setTelAuthNumberError] = useState({
    error: false,
    text: "",
  });
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [telAuthNumber, setTelAuthNumber] = useState("");
  const [emailError, setEmailError] = useState({ error: false, text: "" });

  // cert category
  const [certLList, setCertLList] = useState([]);
  const [certL, setCertL] = useState("");
  const [certMList, setCertMList] = useState([]);
  const [certM, setCertM] = useState("");

  const [checked, setChecked] = useState(false);

  // telAuthNumber timer 3min
  useEffect(() => {
    let timer = setTimeout(() => {
      setTelAuthNumber(null);
    }, 300000);
    return () => {
      clearTimeout(timer);
    };
  }, [telAuthNumber]);

  // Id Check
  const idCheck = useCallback((e) => {
    const userId = e.target.value;

    const idRegex = /^[a-z0-9_-]{4,20}$/;

    if (!idRegex.test(userId)) {
      setIdError({
        error: true,
        text: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
      });
    } else if (userId === null || userId === "") {
      setIdError({ error: true, text: "필수 정보입니다." });
    } else {
      axios({
        method: "post",
        url: API_BASE_URL + "/user/idCheck",
        data: { userId: userId },
      }).then((response) => {
        if (response.data === "success") {
          setIdError({ error: false, text: "" });
        } else {
          setIdError({
            error: true,
            text: "이미 사용중이거나 탈퇴한 아이디입니다.",
          });
        }
      });
    }
  }, []);

  const idErrorReset = useCallback((e) => {
    setIdError({ error: false, text: "" });
  });

  // Password Validation Check
  const pwValidationCheck = useCallback((e) => {
    const userPw = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;

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
    const userPw = document.getElementById("userPw").value;
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
    const userTel = document.getElementById("userTel").value;

    // remove Hyphen
    const newUserTel = userTel.replace(/-/g, "");
    document.getElementById("userTel").value = newUserTel;

    const telRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (newUserTel === null || newUserTel === "") {
      setTelError({ error: true, text: "필수 정보입니다." });
    } else if (!telRegex.test(newUserTel)) {
      setTelError({ error: true, text: "형식에 맞지 않는 번호입니다." });
    } else {
      axios({
        method: "post",
        url: API_BASE_URL + "/user/telCheck",
        data: { userTel: newUserTel },
      }).then((response) => {
        if (response.data === "fail") {
        } else if (response.data == "exist") {
          setTelError({ error: true, text: "이미 사용중인 전화번호입니다." });
        } else {
          setTelError({ error: false, text: "" });
          setTelAuthNumberDisabled(false);
          setTelAuthNumberError({ error: false, text: "" });
          setTelAuthNumber(response.data);
          document.getElementById("authAlert").hidden = false;
        }
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
        document.getElementById("authAlert").hidden = true;
      }
    },
    [telAuthNumber]
  );

  const telAuthNumberErrorReset = useCallback((e) => {
    setTelAuthNumberError({ error: false, text: "" });
  });

  // Email Validation Check
  const emailCheck = useCallback((e) => {
    const userEmail = e.target.value;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (userEmail === null || userEmail === "") {
      setEmailError({ error: false, text: "" });
    } else if (!emailRegex.test(userEmail)) {
      setEmailError({ error: true, text: "이메일 주소를 다시 확인해주세요." });
    } else {
      setEmailError({ error: false, text: "" });
    }
  }, []);

  const emailErrorReset = useCallback((e) => {
    setEmailError({ error: false, text: "" });
  });

  // Cert Large Category
  useEffect(() => {
    axios({
      url: API_BASE_URL + "/cert/getCertLList",
      method: "get",
    }).then((response) => {
      setCertLList(response.data.certLList);
    });
  }, []);

  // Cert Middle Category
  useEffect(() => {
    if (certL !== "" && typeof certL !== "undefined") {
      axios({
        url: API_BASE_URL + "/cert/getCertMList",
        method: "get",
        params: { obligfldnm: certL },
      }).then((response) => {
        setCertMList(response.data.certMList);
        console.log(response.data.certMList);
      });
    }
  }, [certL]);

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
    const userEmail = data.get("userEmail");

    if (userId === null || userId === "") {
      setIdError({ error: true, text: "필수 정보입니다." });
    }

    if (userPw === null || userPw === "") {
      setPwValidationError({ error: true, text: "필수 정보입니다." });
    }

    if (userPwCheck === null || userPwCheck === "") {
      setPwError({ error: true, text: "필수 정보입니다." });
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

    if (!checked) {
      document.getElementById("checkedAlert").hidden = false;
    } else {
      document.getElementById("checkedAlert").hidden = true;
    }

    if (
      !idError.error &&
      userId !== "" &&
      !pwValidationError.error &&
      userPw !== "" &&
      !pwError.error &&
      userPwCheck !== "" &&
      !nameError.error &&
      userName !== "" &&
      !telError.error &&
      userTel !== "" &&
      !telAuthNumberError.error &&
      userTelAuthNumber !== "" &&
      !emailError.error &&
      checked &&
      parseInt(userTelAuthNumber) === telAuthNumber
    ) {
      const userInfo = {
        userId: userId,
        userPw: userPw,
        userName: userName,
        userTel: userTel,
        userEmail: userEmail,
        favFieldL: certL,
        favFieldM: certM,
        userNick: userId,
      };

      axios({
        method: "post",
        url: API_BASE_URL + "/user/join",
        data: userInfo,
      }).then((response) => {
        if (response.data === "success") {
          navigate("/login", { replace: true });
        } else {
          console.log(response.data);
        }
      });
    }
  };

  return (
    <div className={styles.center} style={{ background: "rgb(250, 250, 250)" }}>
      <div className={styles.form}>
        <form
          onSubmit={joinSubmit}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
            }
          }}
        >
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
                name="userPw"
                type="password"
                variant="outlined"
                id="userPw"
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
                id="userPwCheck"
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
              <CssTextField
                name="userName"
                variant="outlined"
                id="userName"
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
                id="userTel"
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
                  maxLength: 4,
                }}
                InputLabelProps={{
                  style: {
                    lineHeight: "100%",
                  },
                }}
              />
              <p
                id="authAlert"
                style={{
                  fontSize: "14px",
                  lineHeight: "120%",
                  color: "rgb(9, 9, 9)",
                  padding: "3px 14px 0px 14px",
                }}
                hidden
              >
                인증번호를 발송했습니다. (유효시간 3분)
                <br />
                인증번호가 오지않으면 입력하신 정보가 정확한지 확인하여 주세요.
              </p>
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                name="userEmail"
                variant="outlined"
                id="userEmail"
                label="이메일(선택)"
                fullWidth
                onBlur={emailCheck}
                error={emailError.error}
                helperText={emailError.text}
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
                  onChange={(e) => {
                    setCertL((prev) => e.target.value);
                  }}
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
                  {certLList &&
                    certLList.map((certL) => (
                      <MenuItem
                        key={certL.obligfldcd}
                        value={certL.obligfldnm}
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
                        {certL.obligfldnm}
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
                  onChange={(e) => {
                    setCertM(e.target.value);
                  }}
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
                  {certMList &&
                    certMList.map((certM) => (
                      <MenuItem
                        key={certM.obligfldcd}
                        value={certM.mdobligfldnm}
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
                        {certM.mdobligfldnm}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                onChange={checkedCheck}
                control={
                  <Checkbox
                    size="small"
                    style={{ paddingTop: "4px", paddingBottom: "4px" }}
                    icon={
                      <CheckCircleOutlineIcon
                        color="disabled"
                        fontSize="medium"
                      />
                    }
                    checkedIcon={
                      <CheckCircleIcon color="success" fontSize="medium" />
                    }
                  />
                }
                label="[필수] 개인정보 수집 및 이용동의"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
              <FormControlLabel
                onChange={checkedCheck}
                control={
                  <Checkbox
                    size="small"
                    style={{ paddingTop: "4px", paddingBottom: "4px" }}
                    icon={
                      <CheckCircleOutlineIcon
                        color="disabled"
                        fontSize="medium"
                      />
                    }
                    checkedIcon={
                      <CheckCircleIcon color="success" fontSize="medium" />
                    }
                  />
                }
                label="[선택] 새로운 기능 출시안내 (광고 마케팅 수신동의)"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid>
            {/* <Grid item xs={10.7} style={{ paddingLeft: "2px" }}>
              <NavLink to="/a" className={styles.navLink}></NavLink>
            </Grid> */}
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
                <NavLink to="/login" replace className={styles.navLink}>
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

export default Join;
