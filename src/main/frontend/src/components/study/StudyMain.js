import React, { useCallback } from "react";
import StudyCardList from "./StudyCardList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/study/StudyMain.module.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Pretendard-Regular"],
  },
});

const StudyMain = ({
  studyList,
  getStudyList,
  page,
  setPage,
  count,
  searchKeyword,
  setSearchKeyword,
}) => {
  // const getSearchedStudyList = useCallback(() => {
  //   axios
  //     .get(API_BASE_URL + "/community/study/getSearchedStudyList", {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
  //       },
  //       params: {
  //         page: page - 1,
  //         searchKeyword: searchKeyword,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setStudyList(response.data.studyList.content);
  //       setCount(response.data.studyList.totalPages);
  //     });
  // }, [page, searchKeyword]);

  return (
    <div className={styles.studyMainCard}>
      <div className={styles.searchFieldWrapper}>
        <ThemeProvider theme={theme}>
          <form
            id="keywordSearchBar"
            onSubmit={(e) => {
              e.preventDefault();
              getStudyList();
            }}
          >
            <TextField
              id="studySearch"
              type="search"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
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
          </form>
        </ThemeProvider>
        <Link to={"/community/study/register"} className={styles.studyRegBtn}>
          글쓰기
        </Link>
      </div>
      <StudyCardList studyList={studyList}></StudyCardList>

      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination
            count={count} //총 페이지 수
            size="large"
            page={page} //현재 페이지
            onChange={(e, p) => {
              setPage(p);
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default StudyMain;
