import { AddCircle, ArrowForwardIos, Close } from "@mui/icons-material";
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

function Userinfo({ certs, user }) {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      brown: {
        main: "#F2C335",
        contrastText: "#fff",
      },
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
    },
  });

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
    }
  }, []);

  // Phone number authentication Number Check
  const telAuthNumberCheck = useCallback((e) => {
    const usertelAuthNumber = e.target.value;
    if (usertelAuthNumber === null || usertelAuthNumber === "") {
      setTelAuthNumberError(true);
      setTelAuthNumberErrorText("인증이 필요합니다.");
    } else {
      setTelAuthNumberError(false);
      setTelAuthNumberErrorText("");
    }
  }, []);

  // email Validation Check
  const emailCheck = useCallback((e) => {
    const useremail = e.target.value;
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailRegex.test(useremail)) {
      setEmailError(true);
      setEmailErrorText("이메일 주소를 다시 확인해주세요.");
    } else {
      setEmailError(false);
      setEmailErrorText("");
    }
  }, []);

  // Cert Large Category
  const certLCatChange = (e) => {
    setCertL(e.target.value);
  };

  // Cert Middle Category
  const certMCatChange = (e) => {
    setCertM(e.target.value);
  };

  const userInfoEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userTel = data.get("userTel");
    const usertelAuthNumber = data.get("usertelAuthNumber");

    if (userTel !== user.userTel) {
      if (usertelAuthNumber === null || usertelAuthNumber === "") {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증이 필요합니다.");
      } else if (usertelAuthNumber !== "0000") {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증번호가 일치하지 않습니다.");
      }

      if (!telAuthNumberError && usertelAuthNumber === "0000") {
        alert("변경되었습니다.");
        window.location = "/mypage";
      }
    } else {
      alert("변경되었습니다.");
      window.location = "/mypage";
    }
  };

  // 자격증 추가 버튼 클릭시 div 추가
  const [countList, setCountList] = useState(certs);
  const [visible, setVisible] = useState(true);
  const [singleCert, setSingleCert] = useState({});

  const addCert = (e) => {
    const addCertCount = [...countList];

    const counter = {
      id: addCertCount.length + 1,
      certName: "",
      earnedDate: "",
    };

    addCertCount.push(counter);
    setCountList(addCertCount);
    setVisible(true);
    if (addCertCount.length > 9) {
      setVisible(false);
    }
  };

  // 자격증 삭제 버튼 클릭시 div 삭제
  const deleteCertDiv = useCallback(
    (i) => {
      setCountList(countList.filter((cert) => cert.id !== i));
      setVisible(true);
    },
    [countList]
  );

  // 취득한 자격증란 onChnage
  const handleChange = (id, e) => {
    const addCert =
      singleCert.id === id
        ? {
            ...singleCert,
            [e.target.name]: e.target.value,
          }
        : {
            id: id,
            [e.target.name]: e.target.value,
          };

    setSingleCert(addCert);

    setCountList(
      countList.map((cer) =>
        cer.id === id
          ? {
              ...cer,
              certName: addCert.certName,
              earnedDate: addCert.earnedDate,
            }
          : cer
      )
    );
  };

  const handleCertSubmit = (e) => {
    e.preventDefault();
    const certNameInput = document.getElementsByName("certName");
    const earnedDateInput = document.getElementsByName("earnedDate");
    let error = false;
    for (let i = 0; i < certNameInput.length; i++) {
      if (
        certNameInput[i].value === null ||
        certNameInput[i].value === "" ||
        earnedDateInput[i].value === null ||
        earnedDateInput[i].value === ""
      ) {
        error = true;
      }
    }

    if (error === true) {
      alert("빈칸을 입력해주세요.");
    } else {
      alert("변경되었습니다.");
      window.location.replace("/mypage/userinfo");
    }
  };

  return (
    <div>
      <div className={styles.userinfo}>
        <h1 className={styles.smallTitle}>회원 정보</h1>
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
                defaultValue={user.userId}
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
                    fontSize: "1em",
                    color: "#1d5902",
                    fontWeight: 700,
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
                defaultValue={user.userName}
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
                defaultValue={user.userTel}
                className={styles.TextField}
                fullWidth
                error={telError}
                helperText={telErrorText}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
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
                onClick={telAuth}
              >
                인증번호 받기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="usertelAuthNumber"
                variant="outlined"
                id="usertelAuthNumber"
                label="인증번호"
                fullWidth
                onChange={telAuthNumberCheck}
                error={telAuthNumberError}
                helperText={telAuthNumberErrorText}
                disabled={telAuthNumberDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#F5F5F5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="useremail"
                variant="outlined"
                id="useremail"
                label="이메일(선택)"
                defaultValue={user.userEmail}
                fullWidth
                onChange={emailCheck}
                error={emailError}
                helperText={emailErrorText}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5.9}>
              <FormControl
                sx={{ minWidth: 120 }}
                fullWidth
                style={{ fontSize: "14px" }}
              >
                <InputLabel
                  id="demo-select-small"
                  sx={{
                    "&.MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#1d5902",
                      },
                    },
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
            <Grid item xs={5.1} style={{ paddingLeft: "0px" }}>
              <FormControl
                sx={{ minWidth: 120 }}
                fullWidth
                style={{ fontSize: "14px" }}
              >
                <InputLabel
                  id="certMCat"
                  sx={{
                    "&.MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#1d5902",
                      },
                    },
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
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#8cbf75",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#1d5902",
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
          </Grid>
          <div className={styles.userInfoBtns}>
            <Button
              variant="outlined"
              color="primary"
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
        <h1 className={styles.smallTitle}>취득한 자격증</h1>

        {countList &&
          countList.map((cert, i) => (
            <div
              className={styles.certContainer}
              id={"newCertContainer" + cert.id}
              key={i}
            >
              <TextField
                variant="outlined"
                label="자격증 명"
                value={cert.certName || ""}
                onChange={(e) => handleChange(cert.id, e)}
                name="certName"
                style={{ marginBottom: "5px" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="취득 일자(YYYY.MM.DD)"
                value={cert.earnedDate || ""}
                onChange={(e) => handleChange(cert.id, e)}
                name="earnedDate"
                style={{ marginLeft: "5px", marginBottom: "5px" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
              />
              <IconButton
                aria-label="details"
                onClick={() => deleteCertDiv(cert.id)}
                style={{ padding: 0, height: "min-content" }}
              >
                <Close fontSize="medium" style={{ color: "#666" }} />
              </IconButton>
            </div>
          ))}

        {visible && (
          <Button
            variant="outlined"
            color="secondary"
            component="label"
            id="addCertBtn"
            className={styles.addCert}
            onClick={addCert}
            theme={theme}
            style={{ margin: "0 auto" }}
            startIcon={<AddCircle theme={theme} color="primary" />}
          >
            자격증 추가
          </Button>
        )}

        <div className={styles.addCertBtns}>
          <Button
            variant="outlined"
            color="primary"
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
            onClick={(e) => handleCertSubmit(e)}
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Userinfo;
