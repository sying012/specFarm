import {
  Autocomplete,
  createTheme,
  FormControl,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/lost/Lost.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "#8cbf75",
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

const LostList = ({ searchTypeItem, losts, brchNames }) => {
  const [searchType, setSearchType] = useState("전체");
  console.log(searchType);
  // search type select
  const handleChange = (e) => {
    setSearchType(e.target.value);
  };

  // tr click => lostItem
  const navigate = useNavigate();
  const goLostItem = (id) => {
    navigate(`./${id}`);
  };

  let searchBar =
    searchType !== "지사" ? (
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
        style={{ width: "250px" }}
      ></TextField>
    ) : (
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={brchNames.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: <SearchIcon color="action" />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8cbf75",
                },
                "&.MuiInputBase-sizeSmall": {
                  paddingLeft: "14px",
                },
              },
            }}
            size="small"
            style={{ width: "250px" }}
          />
        )}
      />
    );

  return (
    <div>
      <div className={styles.search}>
        <FormControl sx={{ width: "150px", marginRight: "10px" }} size="small">
          <Select
            displayEmpty
            id="searchTypeSelect"
            value={searchType}
            onChange={handleChange}
            sx={{
              "&.MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8cbf75",
                },
              },
            }}
          >
            {searchTypeItem.map((item) => (
              <MenuItem
                key={item.id}
                value={item.name}
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
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {searchBar}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.brchName}
              style={{ borderTopLeftRadius: "10px" }}
            >
              지역
            </th>
            <th>분실물 목록</th>
            <th className={styles.lostLoc}>분실 장소</th>
            <th
              className={styles.lostDate}
              style={{ borderTopRightRadius: "10px" }}
            >
              분실 일자
            </th>
          </tr>
        </thead>
        <tbody>
          {losts.map((lost) => (
            <tr key={lost.id} onClick={() => goLostItem(lost.id)}>
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
