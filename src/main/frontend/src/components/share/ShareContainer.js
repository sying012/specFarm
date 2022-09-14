import React from "react";
import { TextField, Stack, Pagination, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/share/container.module.css";
import ShareList from "./ShareList";
import { Link } from "react-router-dom";

const ShareContainer = ({ shareList }) => {
  return (
    <>
      <div className={styles.search}>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8cbf75",
              },
            },
          }}
          style={{ width: "280px" }}
        ></TextField>
        <Link to="./newShare">
          <Button className={styles.newshareBtn} variant="contained">
            글쓰기
          </Button>
        </Link>
      </div>
      <ShareList shareList={shareList}></ShareList>
      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </>
  );
};

export default ShareContainer;
