import React, { useState } from "react";
import styles from "../../styles/study/StudyReg.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import defaultStudyImg from "../../images/defalut_study_image.png";

const StudyReg = ({ setStudyList, setStudyMemberList }) => {
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

  const File = defaultStudyImg;

  console.log(File);

  const navigate = useNavigate();

  const insertStudy = (study) => {
    axios({
      method: "post",
      url: API_BASE_URL + "/community/study/register",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: study,
    }).then((response) => {
      // console.log(response.data.studyMemberList);
      setStudyList(response.data.studyList.content);
      setStudyMemberList(response.data.studyMemberList);
      navigate(`../${response.data.studyIdx}`);
    });
  };

  const handleSubmit = (e) => {
    let study = new FormData(e.target);
    console.log(study.get("studyTitle"));
    console.log(study.get("studyContent"));
    console.log(study.get("studyMaxMember"));
    console.log(study.get("studyTel"));
    console.log(study.get("imgFile"));

    insertStudy(study);

    e.preventDefault();
  };

  const [maxMemberCnt, setMaxMemberCnt] = useState(4);

  const handleChange = (event) => {
    setMaxMemberCnt(event.target.value);
  };

  const menuItemList = () => {
    const result = [];
    for (let index = 2; index < 11; index++) {
      result.push(
        <MenuItem key={index} value={index}>
          {index}???
        </MenuItem>
      );
    }
    return result;
  };

  const defaultContentValue = `  ????????? ???????????? ?????? ????????? ????????? ??????????????????. 
  ????????? ???????????? ?????? ????????? ????????? ????????? ??? ???????????????. 
  
  [????????? ?????? ?????? ??????]
  
  ????????? ?????? :
  ????????? ?????? : 
  ?????? ????????? ??????(??????) :
  ?????? ???????????? ????????? :
  ?????? ???????????? :
  ????????? ?????? : 
  ????????? ???????????? : 
  ???????????? ????????? ??? ?????? ????????? ???????????????. (?????????, ????????? ???????????????, ????????? ???.)`;

  const readImage = (file) => {
    // ?????? ????????? ????????? ?????? ??????
    if (file) {
      // FileReader ???????????? ??????
      const reader = new FileReader();

      // ???????????? ????????? ??? ??????
      reader.onload = (e) => {
        const preImg = document.getElementById("studyImgPreview");
        preImg.src = e.target.result;
      };

      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="regStudyForm">
      <div className={styles.studyRegContainer}>
        <div className={styles.leftContainer}>
          <img
            className={styles.studyImgPreview}
            src="https://cdn.emetro.co.kr/data2/content/image/2020/01/23/0540/20200123000058.jpg"
            alt="????????????"
            id="studyImgPreview"
            title="????????? ??????????????? ???????????????."
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
                  ????????????
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
              label="??????"
              variant="outlined"
              name="studyTitle"
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
              label="??????"
              name="studyContent"
              multiline
              rows={15}
              defaultValue={defaultContentValue}
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
              label="????????????"
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
              ??????
            </button>
            <Link to={".."}>
              <button className={styles.studyRegCancel}>??????</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StudyReg;
