import { ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  createTheme,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../../styles/mypage/Userinfo.module.css";

function Userinfo() {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      brown: {
        main: "rgb(107, 83, 67)",
        contrastText: "#fff",
      },
      primary: {
        main: "rgb(187, 205, 110)",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
    },
  });

  return (
    <div>
      <div className={styles.userinfo}>
        <h1>회원 정보</h1>
        <Button
          color="secondary"
          component="label"
          style={{ fontSize: "1em", color: "gray", fontWeight: 600 }}
          endIcon={<ArrowForwardIos color="action" />}
        >
          회원탈퇴
        </Button>
      </div>

      <div className={styles.editInfo}>
        <Grid container spacing={3} className="padding">
          <Grid item xs={12}>
            <TextField
              name="userId"
              variant="outlined"
              id="userId"
              label="아이디"
              fullWidth
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
              // onBlur={PwValidationCheck}
              // error={PwValidationError}
              // helperText={PwValidationErrorText}
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
              // onBlur={PwCheck}
              // error={PwError}
              // helperText={PwErrorText}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userName"
              variant="outlined"
              id="userName"
              label="이름"
              fullWidth
              // onBlur={NameCheck}
              // error={NameError}
              // helperText={NameErrorText}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              name="userTel"
              variant="outlined"
              id="userTel"
              label="휴대폰 번호"
              fullWidth
              // error={TelError}
              // helperText={TelErrorText}
            />
          </Grid>
          <Grid item xs={4} style={{ paddingLeft: "10px", paddingTop: "28px" }}>
            <Button
              variant="contained"
              theme={theme}
              color="brown"
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                padding: "14px 20px",
              }}
              // onClick={TelAuth}
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
              // onBlur={TelAuthNumberCheck}
              // error={TelAuthNumberError}
              // helperText={TelAuthNumberErrorText}
              // disabled={TelAuthNumberDisabled}
            />
          </Grid>
          <Grid item xs={5.9}>
            <FormControl
              sx={{ minWidth: 120 }}
              fullWidth
              style={{ fontSize: "14px" }}
            >
              <InputLabel id="demo-select-small">관심분야(대분류)</InputLabel>
              <Select
                labelId="demo-select-small"
                id="certLCat"
                // value={age}
                label="관심분야(대분류)"
                // onBlur={handleChange}
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
          <Grid item xs={5.1} style={{ paddingLeft: "0px" }}>
            <FormControl
              sx={{ minWidth: 120 }}
              fullWidth
              style={{ fontSize: "14px" }}
            >
              <InputLabel id="certMCat">관심분야(중분류)</InputLabel>
              <Select
                labelId="certMCat"
                id="demo-select-small"
                // value={age}
                label="관심분야(중분류)"
                // onBlur={handleChange}
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
        </Grid>
        <div className={styles.profileMdfBtns}>
          <Link to="/mypage">
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="secondary"
                className={styles.profileCancelBtn}
              >
                취소
              </Button>
            </ThemeProvider>
          </Link>
          <Link to="/mypage">
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                variant="contained"
                className={styles.profileApplyBtn}
              >
                수정
              </Button>
            </ThemeProvider>
          </Link>
        </div>
      </div>
      <hr />
      <div className={styles.userinfo}>
        <h1>취득한 자격증</h1>
        <div></div>
      </div>
    </div>
  );
}

export default Userinfo;
