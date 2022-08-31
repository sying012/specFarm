import {
  createTheme,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/lost/Lost.module.css";
import SearchIcon from "@mui/icons-material/Search";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "rgb(159, 182, 72)",
      contrastText: "#fff",
    },
    brown: {
      main: "rgb(107, 83, 67)",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Hahmlet",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
});

const goLostItem = (e) => {
  window.location.pathname = "./notice/lost/1";
};

const LostList = ({ searchTypeItem, losts }) => {
  const [searchType, setSearchType] = useState("전체");
  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchType(e.target.value);
  };

  return (
    <div>
      <div className={styles.search}>
        <FormControl sx={{ width: "150px", marginRight: "10px" }} size="small">
          <Select
            displayEmpty
            id="searchTypeSelect"
            value={searchType}
            onChange={handleChange}
          >
            {searchTypeItem.map((item) => (
              <MenuItem key={item.id} value={item.name} theme={theme}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
            styles: { fontFamily: "Hahmlet" },
          }}
          size="small"
        ></TextField>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.brchName}>지사</th>
            <th>분실물 목록</th>
            <th>분실 장소</th>
            <th className={styles.lostDate}>분실 일자</th>
          </tr>
        </thead>
        <tbody>
          {losts.map((lost) => (
            <tr
              key={lost.id}
              onClick={() => {
                window.location = "./lost/1";
              }}
            >
              <td className={styles.brchName}>{lost.brchName}</td>
              <td>
                [{lost.lostCat}] {lost.lostItem}
              </td>
              <td className={styles.lostLoc}>{lost.lostLoc}</td>
              <td className={styles.lostDate}>{lost.lostDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </div>
  );
};

export default LostList;
