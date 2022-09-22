import { AddCircle, ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  createTheme,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../app-config";

import styles from "../../styles/mypage/Userinfo.module.css";
import EarnedCert from "./EarnedCert";

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

  const [userInfo, setUserInfo] = useState({
    ...user,
    userEmail: "",
    userId: "",
    userName: "",
    userTel: "",
    favFieldL: "",
    favFieldM: "",
  });
  const [checkedUserInfoChanged, setCheckedUserInfoChanged] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserInfo(user);
    }
  }, [user]);

  const handleInfoChange = (e) => {
    const newUserInfo = {
      ...userInfo,
      [e.target.name]: e.target.value,
    };

    setUserInfo(newUserInfo);
    setCheckedUserInfoChanged(true);
  };

  const [telError, setTelError] = useState(false);
  const [telErrorText, setTelErrorText] = useState("");
  const [telAuthNumber, setTelAuthNumber] = useState("");
  const [telAuthNumberError, setTelAuthNumberError] = useState(false);
  const [telAuthNumberErrorText, setTelAuthNumberErrorText] = useState("");
  const [telAuthNumberDisabled, setTelAuthNumberDisabled] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [certLCat, setCertLCat] = useState([
    { id: 0, name: "사업관리" },
    { id: 1, name: "사업관리1" },
    { id: 2, name: "썸띵스페셜1" },
  ]);
  const [certL, setCertL] = useState("");
  const [certMCat, setCertMCat] = useState([
    { id: 0, name: "사업관리" },
    { id: 1, name: "사업관리2" },
    { id: 2, name: "썸띵스페셜2" },
  ]);
  const [certM, setCertM] = useState("");

  // Phone number authentication
  const telAuth = useCallback(
    (e) => {
      const userTel = document.getElementById("userTel").value;
      // remove Hyphen
      const newUserTel = userTel.replace(/-/g, "");
      document.getElementById("userTel").value = newUserTel;

      const TelRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

      if (user.userTel === userTel) {
        setTelError(true);
        setTelErrorText("변경된 내용이 없습니다.");
      } else if (newUserTel === null || newUserTel === "") {
        setTelError(true);
        setTelErrorText("필수 정보입니다.");
      } else if (!TelRegex.test(newUserTel)) {
        setTelError(true);
        setTelErrorText("형식에 맞지 않는 번호입니다.");
      } else {
        axios({
          method: "post",
          url: API_BASE_URL + "/user/telCheck",
          data: { userTel: newUserTel },
        }).then((response) => {
          if (response.data === "fail") {
          } else if (response.data === "exist") {
            setTelError(true);
            setTelErrorText("이미 사용중인 번호입니다.");
          } else {
            setTelError(false);
            setTelErrorText("");
            setTelAuthNumberDisabled(false);
            // setTelAuthNumberError({ error: false, text: "" });
            setTelAuthNumber(response.data);
            // document.getElementById("authAlert").hidden = false;
          }
        });
      }
    },
    [userInfo]
  );

  // Phone number authentication Number Check
  const telAuthNumberCheck = useCallback(
    (e) => {
      const usertelAuthNumber = e.target.value;
      if (usertelAuthNumber === null || usertelAuthNumber === "") {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증이 필요합니다.");
      } else if (usertelAuthNumber != telAuthNumber) {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증번호가 일치하지 않습니다.");
      } else {
        setTelAuthNumberError(false);
        setTelAuthNumberErrorText("");
      }
    },
    [telAuthNumber]
  );

  // email Validation Check
  const emailCheck = useCallback((e) => {
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

  // Cert Large Category
  const certLCatChange = (e) => {
    setCertL(e.target.value);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setCheckedUserInfoChanged(true);
  };

  // Cert Middle Category
  const certMCatChange = (e) => {
    setCertM(e.target.value);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setCheckedUserInfoChanged(true);
  };

  // 수정된 유저정보 보내기
  const userInfoEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usertelAuthNumber = data.get("usertelAuthNumber");

    if (userInfo.userTel !== user.userTel) {
      if (usertelAuthNumber === null || usertelAuthNumber === "") {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증이 필요합니다.");
      } else if (usertelAuthNumber != telAuthNumber) {
        setTelAuthNumberError(true);
        setTelAuthNumberErrorText("인증번호가 일치하지 않습니다.");
      } else {
        setTelAuthNumberError(false);
        setTelAuthNumberErrorText("");
      }

      if (!telAuthNumberError && usertelAuthNumber == telAuthNumber) {
        axios({
          method: "post",
          url: API_BASE_URL + "/mypage/editUserInfo",
          data: userInfo,
        })
          .then((response) => {
            if (response.data) {
              alert("변경되었습니다.");
              window.location.replace("/mypage");
            }
          })
          .catch((e) => {
            console.log("catch문 " + e);
          });
      }
    } else if (!checkedUserInfoChanged) {
      alert("변경된 정보가 없습니다.");
    } else {
      axios({
        method: "post",
        url: API_BASE_URL + "/mypage/editUserInfo",
        data: userInfo,
      })
        .then((response) => {
          if (response.data) {
            alert("변경되었습니다.");
            window.location.replace("/mypage");
          }
        })
        .catch((e) => {
          console.log("catch문 " + e);
        });
    }
  };

  // 자격증 추가 버튼 클릭시 div 추가
  const [countList, setCountList] = useState([]);

  useEffect(() => {
    if (Object.keys(certs).length !== 0) {
      setCountList(certs);
    }
  }, [certs]);

  const addNewCert = (e) => {
    const addCertCount = [...countList];
    const counter = {
      getCertIdx: countList.length,
      userId: userInfo.userId,
      certName: "",
      getCertDate: "",
    };

    addCertCount.push(counter);
    setCountList(addCertCount);
  };

  // 자격증 삭제 버튼 클릭시 div 삭제
  const deleteCertDiv = useCallback(
    (i) => {
      // 중간번호 삭제시 뒷 인덱스 땡기기
      let newCountList = countList.filter((cert) => cert.getCertIdx !== i);
      if (newCountList.length !== 0) {
        if (newCountList[0].getCertIdx !== 0) {
          newCountList[0].getCertIdx = 0;
        }
        for (let i = 1; i < newCountList.length; i++) {
          if (newCountList[i].getCertIdx !== newCountList[i - 1].getCertIdx) {
            newCountList[i].getCertIdx = i;
          }
        }
      }
      setCountList(newCountList);
    },
    [countList]
  );

  const handleCertSubmit = (e) => {
    e.preventDefault();
    let blankError = false;
    let existedCertName = false;
    for (let i = 0; i < countList.length; i++) {
      if (
        countList[i].certName === null ||
        countList[i].certName === "" ||
        countList[i].getCertDate === null ||
        countList[i].getCertDate === ""
      ) {
        blankError = true;
      }
      for (let j = 0; j < i; j++) {
        if (countList[i].certName === countList[j].certName) {
          existedCertName = true;
        }
      }
    }

    if (!blankError && !existedCertName) {
      axios({
        method: "post",
        url: API_BASE_URL + `/mypage/earnedcert/${user.userId}`,
        data: countList,
      })
        .then((response) => {
          if (response.data) {
            alert("변경되었습니다.");
            window.location.replace("/mypage");
          }
        })
        .catch((e) => {
          console.log("catch문 " + e);
        });
    } else if (blankError) {
      alert("빈 칸을 입력해주세요.");
    } else if (existedCertName) {
      alert("동일한 자격증은 등록 불가합니다.");
    }
  };

  return (
    <div>
      <div className={styles.userinfo}>
        <h1 className={styles.smallTitle}>농부 정보</h1>
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
                value={userInfo.userId}
                onChange={handleInfoChange}
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
                value={userInfo.userName}
                onChange={handleInfoChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                name="userTel"
                variant="outlined"
                id="userTel"
                label="휴대폰 번호"
                value={userInfo.userTel}
                onChange={handleInfoChange}
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
            {!telAuthNumberDisabled && (
              <Grid item xs={12}>
                <TextField
                  name="usertelAuthNumber"
                  variant="outlined"
                  id="usertelAuthNumber"
                  label="인증번호"
                  fullWidth
                  onBlur={telAuthNumberCheck}
                  error={telAuthNumberError}
                  helperText={telAuthNumberErrorText}
                  // disabled={telAuthNumberDisabled}
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
            )}
            <Grid item xs={12}>
              <TextField
                name="userEmail"
                variant="outlined"
                id="userEmail"
                label="이메일(선택)"
                value={userInfo.userEmail}
                fullWidth
                onBlur={emailCheck}
                onChange={handleInfoChange}
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
                  value={userInfo.favFieldL}
                  label="관심분야(대분류)"
                  onChange={certLCatChange}
                  name="favFieldL"
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
                      name="favFieldL"
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                  value={userInfo.favFieldM}
                  label="관심분야(중분류)"
                  onChange={certMCatChange}
                  name="favFieldM"
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
                      name="favFieldM"
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
        <h1 className={styles.smallTitle}>수확한 자격증</h1>

        {countList &&
          countList.map((cert, i) => (
            <EarnedCert
              key={i}
              countList={countList}
              setCountList={setCountList}
              deleteCertDiv={deleteCertDiv}
              cert={cert}
            />
          ))}

        {countList.length < 10 && (
          <Button
            variant="outlined"
            color="secondary"
            component="label"
            id="addCertBtn"
            className={styles.addCert}
            onClick={addNewCert}
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
