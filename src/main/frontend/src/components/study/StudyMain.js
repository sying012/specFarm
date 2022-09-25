import React from "react";
import StudyCardList from "./StudyCardList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/study/StudyMain.module.css";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const StudyMain = ({
  studyList,
  getStudyList,
  page,
  setPage,
  count,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <>
      <div className={styles.searchFieldWrapper}>
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
        <Link to="./register">
          <Button className={styles.studyRegBtn} variant="contained">
            글쓰기
          </Button>
        </Link>
      </div>
      <StudyCardList studyList={studyList}></StudyCardList>

      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination
            count={count} //총 페이지 수
            page={page} //현재 페이지
            onChange={(e, p) => {
              setPage(p);
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default StudyMain;
