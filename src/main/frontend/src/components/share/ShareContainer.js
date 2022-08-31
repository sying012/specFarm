import React from "react";
import { createTheme, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/share/container.module.css";
import ShareList from "./ShareList";

const ShareContainer = ({ shareList }) => {
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
  return (
    <>
      <div className={styles.search}>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="inherit" />,
          }}
          size="small"
        ></TextField>
        <button
          theme={theme}
          type="button"
          className={styles.newshareBtn}
          onClick={() => {
            window.location = "./share/newShare";
          }}
        >
          글쓰기
        </button>
      </div>
      <ShareList shareList={shareList}></ShareList>
    </>
  );
};

export default ShareContainer;
