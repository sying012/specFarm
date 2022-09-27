import { AttachFile } from "@mui/icons-material";
import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/help/HelpWrite.module.css";

const HelpWrite = () => {
  const theme = createTheme({
    palette: {
      green: {
        main: "#1d5902",
        contrastText: "#fff",
      },
      secondary: {
        main: "#555",
      },
    },
  });

  const category = [
    { id: 0, name: "자격증" },
    { id: 1, name: "일자리카페" },
    { id: 2, name: "직업훈련탐색" },
    { id: 3, name: "지식품앗이" },
    { id: 4, name: "물어방" },
    { id: 5, name: "나눔장터" },
    { id: 6, name: "분실물찾기" },
    { id: 7, name: "기타" },
  ];

  const [categorySelected, setCategorySelected] = useState("");
  const handleCategory = (e) => {
    setCategorySelected(e.target.value);
  };

  const [fileName, setFileName] = useState("파일 올리기");
  // 파일 선택시 버튼 이름 바뀜
  const fileHandler = (file) => {
    console.log(file.name);
    setFileName(file.name);
  };

  const submitHelp = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const cat = data.get("category");
    const title = data.get("helpTitle");
    const content = data.get("helpContent");
    const file = data.get("attached");

    axios({
      method: "post",
      url: API_BASE_URL + "/cs/help/write",
      data: {
        category: cat,
        helpTitle: title,
        helpContent: content,
        attached: file,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((response) => {
      if (response.data === "success") {
        alert("등록되었습니다.");
        window.location.replace("/cs/help");
      }
    });
  };

  return (
    <div>
      <h1 className={styles.helpTitle}>1:1 작성하기</h1>
      <form onSubmit={submitHelp}>
        <div className={styles.mainContainer}>
          <div className={styles.category}>
            <FormControl
              sx={{ minWidth: 120 }}
              style={{
                fontSize: "14px",
              }}
            >
              <InputLabel
                id="category"
                sx={{
                  "&.Mui-focused": {
                    color: "#1d5902",
                  },
                  lineHeight: "100%",
                }}
              >
                카테고리
              </InputLabel>
              <Select
                required
                id="category"
                value={categorySelected}
                label="카테고리"
                onChange={handleCategory}
                name="category"
                style={{ height: "45px" }}
                sx={{
                  "&.MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                }}
              >
                {category &&
                  category.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      value={cat.name}
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
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <TextField
            required
            label="제목"
            variant="outlined"
            name="helpTitle"
            style={{ margin: "15px", width: "80%" }}
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
            required
            label="내용"
            name="helpContent"
            multiline
            rows={10}
            placeholder={`상담 가능한 내용이 아닐 경우, 
답변을 받지 못할 수 있는 점 양해 부탁드립니다.`}
            style={{ width: "80%" }}
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
          <div className={styles.submitBtn}>
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              theme={theme}
              startIcon={<AttachFile color="action" />}
            >
              {fileName}
              <input
                hidden
                id="attached"
                name="attached"
                type="file"
                onChange={(e) => {
                  fileHandler(e.target.files[0]);
                }}
              />
            </Button>
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
              등록하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HelpWrite;
