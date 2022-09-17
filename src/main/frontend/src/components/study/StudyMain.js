import React from "react";
import StudyCardList from "./StudyCardList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

import styles from "../../styles/study/StudyMain.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ["Pretendard-Regular"],
  },
});

const StudyMain = ({ studyList }) => {
  return (
    <div className={styles.studyMainCard}>
      <div className={styles.searchFieldWrapper}>
        <ThemeProvider theme={theme}>
          <TextField
            id="studySearch"
            type="search"
            InputProps={{
              startAdornment: <SearchIcon color="inherit" />,
            }}
            size="small"
            style={{ width: "280px" }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8cbf75",
                },
              },
            }}
          ></TextField>
        </ThemeProvider>
        <Link to={"/community/study/register"} className={styles.studyRegBtn}>
          글쓰기
        </Link>
      </div>
      <StudyCardList studyList={studyList}></StudyCardList>

      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </div>
  );
};

export default StudyMain;
