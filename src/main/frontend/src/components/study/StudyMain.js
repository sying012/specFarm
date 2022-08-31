import React from "react";
import StudyContainerList from "./StudyContainerList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

import "../../styles/study/StudyMain.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";

const StudyMain = ({ studyList }) => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Hahmlet"],
    },
  });

  return (
    <div className="studyMainContainer">
      <div className="searchFieldWrapper">
        <ThemeProvider theme={theme}>
          <TextField
            id="studySearch"
            type="search"
            InputProps={{
              startAdornment: <SearchIcon color="inherit" />,
            }}
            size="small"
            style={{ width: "300px" }}
          ></TextField>
        </ThemeProvider>
        <button
          className="studyRegBtn"
          type="button"
          onClick={() => {
            window.location = "/community/study/register";
          }}
        >
          글쓰기
        </button>
      </div>
      <StudyContainerList studyList={studyList}></StudyContainerList>

      <div className="pageBtnContainer">
        <Stack spacing={2}>
          <Pagination
            count={30}
            variant="outlined"
            shape="rounded"
            siblingCount={3}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </div>
  );
};

export default StudyMain;
