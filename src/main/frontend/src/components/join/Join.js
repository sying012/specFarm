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
  Link,
  MenuItem,
} from "@mui/material";
import "../../styles/Join.scss";
import { ArrowForwardIos } from "@mui/icons-material";
// import axios from "axios";

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

const Join = () => {
  const [IdError, setIdError] = useState(false);
  const [IdErrorText, setIdErrorText] = useState("");
  const [PwValidationError, setPwValidationError] = useState(false);
  const [PwValidationErrorText, setPwValidationErrorText] = useState("");
  const [PwError, setPwError] = useState(false);
  const [PwErrorText, setPwErrorText] = useState("");
  const [NameError, setNameError] = useState(false);
  const [NameErrorText, setNameErrorText] = useState("");
  const [TelError, setTelError] = useState(false);
  const [TelErrorText, setTelErrorText] = useState("");
  const [TelAuthNumberError, setTelAuthNumberError] = useState(false);
  const [TelAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [TelAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [EmailError, setEmailError] = useState(false);
  const [EmailErrorText, setEmailErrorText] = useState("");

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

  // Email Validation Check
  const EmailCheck = useCallback((e) => {
    const userEmail = e.target.value;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailRegex.test(userEmail)) {
      setEmailError(true);
      setEmailErrorText("이메일 주소를 다시 확인해주세요.");
    } else {
      setEmailError(false);
      setEmailErrorText("");
    }
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

    if (
      !IdError &&
      !PwValidationError &&
      !PwError &&
      !NameError &&
      !TelError &&
      !TelAuthNumberError &&
      !EmailError
    ) {
      console.log("join success!!");
    }
  };

  return (
    <div className="joinForm">
      <form onSubmit={joinSubmit}>
        <img src={logo} className="logo" alt="specfarm-logo" />
        <p className="title">회원가입</p>
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
              onChange={idCheck}
              error={IdError}
              helperText={IdErrorText}
            />
          </Grid>
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
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              onChange={PwCheck}
              error={PwError}
              helperText={PwErrorText}
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
              onChange={NameCheck}
              error={NameError}
              helperText={NameErrorText}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              name="userTel"
              variant="outlined"
              id="userTel"
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
              onChange={TelAuthNumberCheck}
              error={TelAuthNumberError}
              helperText={TelAuthNumberErrorText}
              disabled={TelAuthNumberDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userEmail"
              variant="outlined"
              id="userEmail"
              label="이메일(선택)"
              fullWidth
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              onChange={EmailCheck}
              error={EmailError}
              helperText={EmailErrorText}
            />
          </Grid>
          <Grid item xs={5.5}>
            <FormControl
              sx={{ minWidth: 120 }}
              fullWidth
              style={{ fontSize: "14px" }}
            >
              <InputLabel id="demo-select-small" style={{ fontSize: "14px" }}>
                관심분야(대분류)
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="certLCat"
                // value={age}
                label="관심분야(대분류)"
                // onChange={handleChange}
                style={{ fontSize: "14px" }}
                name="certLCat"
              >
                <MenuItem value="" style={{ fontSize: "14px" }}>
                  대분류
                </MenuItem>
                <MenuItem value={10} style={{ fontSize: "14px" }}>
                  사업관리
                </MenuItem>
                <MenuItem value={20} style={{ fontSize: "14px" }}>
                  경영.회계.세무
                </MenuItem>
                <MenuItem value={30} style={{ fontSize: "14px" }}>
                  금융.보험
                </MenuItem>
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
          <Grid item xs={5.5} style={{ paddingLeft: "0px" }}>
            <FormControl
              sx={{ minWidth: 120 }}
              //   size="small"
              fullWidth
              style={{ fontSize: "14px" }}
            >
              <InputLabel id="certMCat" style={{ fontSize: "14px" }}>
                관심분야(중분류)
              </InputLabel>
              <Select
                labelId="certMCat"
                id="demo-select-small"
                // value={age}
                label="관심분야(중분류)"
                // onChange={handleChange}
                style={{ fontSize: "14px" }}
                name="certMCat"
              >
                <MenuItem value="" style={{ fontSize: "14px" }}>
                  관심분야(중분류)
                </MenuItem>
                <MenuItem value={10} style={{ fontSize: "14px" }}>
                  사업관리
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1.3}>
            <Checkbox size="small" style={{ padding: "0px" }} />
          </Grid>
          <Grid item xs={10.7} style={{ paddingLeft: "2px" }}>
            <Link className="font14" color="inherit" underline="hover">
              [필수] 개인정보 수집 및 이용동의
            </Link>
          </Grid>
          <Grid item xs={1.3} style={{ paddingTop: "3px" }}>
            <Checkbox size="small" style={{ padding: "0px" }} />
          </Grid>
          <Grid item xs={10.7} style={{ padding: "2px" }}>
            <Link className="font14" color="inherit" underline="hover">
              [선택] 새로운 기능 출시안내를 받아보세요. 언제든 취소 할 수
              있어요. (광고 마케팅 수신동의)
            </Link>
          </Grid>
          <Grid item xs={8} style={{ paddingBottom: "15px" }}>
            <p>
              이미 계정이 있으신가요?&nbsp;&nbsp;
              <Link href="/login" color="inherit" underline="hover">
                로그인
              </Link>
            </p>
          </Grid>
          <Grid item xs={4} style={{ paddingBottom: "15px" }}>
            <Button
              variant="contained"
              type="submit"
              theme={theme}
              color="green"
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
  );
};

export default Join;
