import { Button, createTheme, Grid, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import logo from "../images/logo_green1.png";
import styles from "../styles/login/Login.module.css";

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

const Login = () => {
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  // Id Check
  const idCheck = useCallback((e) => {
    const userId = e.target.value;

    if (userId === null || userId === "") {
      setIdError(true);
    } else {
      setIdError(false);
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
  const pwCheck = useCallback((e) => {
    const userPw = e.target.value;

    if (userPw === null || userPw === "") {
      setPwError(true);
    } else {
      setPwError(false);
    }
  }, []);

  // login submit
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userId = data.get("userId");
    const userPw = data.get("userPw");

    if (userId === null || userId === "") {
      setIdError(true);
    }

    if (userPw === null || userPw === "") {
      setPwError(true);
    }

    if (!idError && userId !== "" && !pwError && userPw !== "") {
      console.log("join success!!");
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.form}>
        <a href="/">
          <img src={logo} className={styles.logo} alt="specfarm-logo" />
        </a>
        <p className={styles.title}>로그인</p>
        <form onSubmit={loginSubmit}>
          <Grid container spacing={3} className={styles.padding}>
            <Grid item xs={12}>
              <TextField
                name="userId"
                variant="outlined"
                id="userId"
                label="아이디"
                fullWidth
                onBlur={idCheck}
                error={idError}
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
                onBlur={pwCheck}
                error={pwError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                theme={theme}
                color="green"
                className={styles.buttonMiddle}
                fullWidth
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: "18px",
                  padding: "18px 16px",
                }}
              >
                로그인
              </Button>
            </Grid>
          </Grid>
          <div className={styles.padding}>
            <div
              className={styles.aTagDiv}
              style={{ textAlign: "center", marginTop: "24px" }}
            >
              <a href="/findUser">계정정보 찾기</a>
              <a href="/join" style={{ marginLeft: "50px" }}>
                회원가입
              </a>
            </div>
            <div className={styles.snsLogin}>
              <p>SNS계정으로 간편 로그인/회원가입</p>
              <div className={styles.snsLoginIcon}>
                <div>
                  <img
                    src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
                    style={{ width: "48px", height: "48px" }}
                  ></img>
                </div>
                <div
                  style={{
                    background: "#f9e000",
                  }}
                >
                  <img
                    src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5f9c58c2017800001.png"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "90px",
                    }}
                  ></img>
                </div>
                <div>
                  <img
                    src="https://lh3.googleusercontent.com/VWRekWMbjk5jyypsXd_V_w2FKlauEWNDh-v-eEIjhHjxtNUoZrRFSQKb1HHIo-77FP8XUcXtdsSKS8V_K-6-1GX0vDni1xexKMaq=w64-l90-sg-rj-c0xffffff"
                    style={{
                      width: "43px",
                      height: "43px",
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
