import React, { useState } from "react";
import styles from "../../styles/study/StudyReg.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import defaultStudyImg from "../../images/defalut_study_image.png";
import { useEffect } from "react";

const StudyEdit = ({ setStudyList }) => {
  const { id } = useParams();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.8 + ITEM_PADDING_TOP,
        width: 120,
      },
    },
  };

  const [currentStudy, setCurrentStudy] = useState();
  const [maxMemberCnt, setMaxMemberCnt] = useState();
  const handleChange = (event) => {
    setMaxMemberCnt(event.target.value);
  };

  // 스터디 정보 가져오기
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/study/getStudy", {
        params: { id: id },
      })
      .then((response) => {
        setCurrentStudy(response.data.study);
        setMaxMemberCnt(response.data.study.studyMaxMember);
        // console.log(response.data.study);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [id]);

  const navigate = useNavigate();

  const editStudy = (study) => {
    axios({
      method: "post",
      url: API_BASE_URL + "/community/study/edit",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: study,
    }).then((response) => {
      // console.log(response.data.studyList);
      setStudyList(response.data.studyList.content);
      navigate(-1);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let study = new FormData(e.target);

    study.append("studyIdx", currentStudy.studyIdx);
    study.append("user", currentStudy.user.userId);
    study.append("studyMemberCnt", currentStudy.studyMemberCnt);
    study.append("studyYn", currentStudy.studyYn);
    study.append("studyImgName", currentStudy.studyImgName);

    editStudy(study);
  };

  const menuItemList = () => {
    const result = [];
    for (let index = currentStudy.studyMemberCnt; index < 11; index++) {
      result.push(
        <MenuItem key={index} value={index}>
          {index}명
        </MenuItem>
      );
    }
    return result;
  };

  const readImage = (file) => {
    // 인풋 태그에 파일이 있는 경우
    if (file) {
      // FileReader 인스턴스 생성
      const reader = new FileReader();

      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        const preImg = document.getElementById("studyImgPreview");
        preImg.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    currentStudy && (
      <form onSubmit={handleSubmit} id="regStudyForm">
        <div className={styles.studyRegContainer}>
          <div className={styles.leftContainer}>
            <img
              className={styles.studyImgPreview}
              src={"/upload/study/" + currentStudy.studyImgName}
              alt="미리보기"
              id="studyImgPreview"
              title="사진을 추가하려면 클릭하세요."
              onClick={() => {
                document.getElementById("uploadImg").click();
              }}
              style={{ cursor: "pointer" }}
            ></img>
            <div className={styles.selectorWrapper}>
              <Box
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                }}
              >
                <FormControl fullWidth>
                  <InputLabel
                    id="maxSelectLabel"
                    sx={{
                      "&.MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#8cbf75",
                        },
                      },
                      "&.MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "#1d5902",
                        },
                      },
                    }}
                  >
                    최대인원
                  </InputLabel>
                  <Select
                    labelId="maxSelectLabel"
                    id="maxSelect"
                    name="studyMaxMember"
                    value={maxMemberCnt}
                    label="MaxMemberCnt"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    {menuItemList()}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <input
              hidden
              type="file"
              className={styles.uploadImg}
              id="uploadImg"
              name="imgFile"
              onChange={(e) => {
                readImage(e.target.files[0]);
              }}
            ></input>
          </div>
          <div className={styles.rightContainer}>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "750px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="studyTitleInput"
                // label="제목"
                variant="outlined"
                name="studyTitle"
                required
                defaultValue={currentStudy.studyTitle}
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
            </Box>
            <Box
              // component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "750px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="studyContentInput"
                // label="내용"
                defaultValue={currentStudy.studyContent}
                name="studyContent"
                multiline
                rows={15}
                //   defaultValue={defaultContentValue}
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
            </Box>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "750px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="studyContactInput"
                // label="연락수단"
                defaultValue={currentStudy.studyTel}
                name="studyTel"
                variant="outlined"
                required
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
            </Box>
            <div className={styles.submitBtnWrapper}>
              <button type="submit" className={styles.studyRegBtn}>
                수정
              </button>
              <button
                className={styles.studyRegCancel}
                onClick={() => {
                  navigate("./..");
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  );
};

export default StudyEdit;
