import { AddCircle, ArrowForwardIos, HighlightOff } from "@mui/icons-material";
import {
  Button,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/mypage/Userinfo.module.css";

function Userinfo({ certs }) {
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

  const [TelError, setTelError] = useState(false);
  const [TelErrorText, setTelErrorText] = useState("");
  const [TelAuthNumberError, setTelAuthNumberError] = useState(false);
  const [TelAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [TelAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [EmailError, setEmailError] = useState(false);
  const [EmailErrorText, setEmailErrorText] = useState("");

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

  const userInfoEdit = (e) => {};

  // 자격증 추가 버튼 클릭시 div 추가
  const [countList, setCountList] = useState(certs);

  const addCert = () => {
    let addCertCount = [...countList];
    let counter = addCertCount.slice(-1)[0];
    counter += 1;
    addCertCount.push(counter);
    setCountList(addCertCount);
  };

  // 자격증 삭제 버튼 클릭시 div 삭제
  const deleteCertDiv = useCallback((i) => {
    const newCertContainer = document.getElementById("newCertContainer" + i);

    newCertContainer.remove();
  }, []);

  return (
    <div>
      <div className={styles.userinfo}>
        <h1>회원 정보</h1>
        <Link to="/mypage/deactivate">
          <Button
            color="secondary"
            component="label"
            style={{ fontSize: "1em", color: "gray", fontWeight: 600 }}
            endIcon={<ArrowForwardIos color="action" />}
          >
            회원탈퇴
          </Button>
        </Link>
      </div>

      <div className={styles.editInfo}>
        <form onSubmit={userInfoEdit}>
          <Grid container spacing={3} className={styles.padding}>
            <Grid item xs={9}>
              <TextField
                name="userId"
                variant="outlined"
                id="userId"
                value="thisisId"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <Link to="/mypage/resetpassword">
                <Button
                  theme={theme}
                  color="primary"
                  component="label"
                  style={{
                    fontSize: "1.1em",
                    color: "gray",
                    fontWeight: 500,
                    paddingTop: "13px",
                  }}
                >
                  비밀번호 변경
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="userName"
                variant="outlined"
                id="userName"
                value="조유미"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                name="userTel"
                variant="outlined"
                id="userTel"
                label="휴대폰 번호"
                defaultValue="01000000000"
                fullWidth
                error={TelError}
                helperText={TelErrorText}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{ paddingLeft: "10px", paddingTop: "28px" }}
            >
              <Button
                variant="contained"
                theme={theme}
                color="brown"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  padding: "14px 20px",
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
                onBlur={TelAuthNumberCheck}
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
                defaultValue="thisis@email.com"
                fullWidth
                onChange={EmailCheck}
                error={EmailError}
                helperText={EmailErrorText}
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
          <div className={styles.userInfoBtns}>
            <Button
              variant="outlined"
              color="secondary"
              href="/mypage"
              theme={theme}
              className={styles.profileCancelBtn}
            >
              취소
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => {
                alert("반영되었습니다.");
              }}
              theme={theme}
              className={styles.profileApplyBtn}
            >
              수정
            </Button>
          </div>
        </form>
      </div>
      <hr />
      <div className={styles.earnedCert}>
        <h1>취득한 자격증</h1>

        {countList &&
          countList.map((cert, i) => (
            <div
              className={styles.certContainer}
              id={"newCertContainer" + i}
              key={i}
            >
              <TextField
                variant="outlined"
                label="자격증 명"
                defaultValue={cert.certName}
              />
              <TextField
                variant="outlined"
                label="취득 일자"
                defaultValue={cert.earnedDate}
              />
              <IconButton aria-label="details" onClick={() => deleteCertDiv(i)}>
                <HighlightOff fontSize="large" style={{ color: "red" }} />
              </IconButton>
            </div>
          ))}

        <Button
          variant="outlined"
          color="secondary"
          component="label"
          className={styles.addCert}
          onClick={addCert}
          theme={theme}
          style={{ margin: "0 auto" }}
          startIcon={<AddCircle theme={theme} color="primary" />}
        >
          자격증 추가
        </Button>

        <div className={styles.addCertBtns}>
          <Button
            variant="outlined"
            color="secondary"
            href="/mypage"
            theme={theme}
            style={{ margin: "10px", fontWeight: "bold" }}
          >
            취소
          </Button>
          <Button
            color="primary"
            variant="contained"
            href="/mypage"
            theme={theme}
            style={{ margin: "10px", fontWeight: "bold" }}
            onClick={() => {
              alert("반영되었습니다.");
            }}
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Userinfo;
