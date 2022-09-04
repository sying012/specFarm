import React from "react";
import AskListItem from "./AskListItem";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  FormControl,
  Select,
  Stack,
  Pagination,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/lost/Lost.module.css";

const AskContent = ({ asks, certNames }) => {
  const certList = useRef();
  const [searchType, setSearchType] = useState("자격증");
  const handleChange = (e) => {
    setSearchType(e.target.value);
  };

  const [searchTypeItem, setSearchTypeItem] = useState([
    {
      id: 1,
      name: "자격증",
    },
    {
      id: 2,
      name: "제목",
    },
    {
      id: 3,
      name: "내용",
    },
    {
      id: 4,
      name: "제목+내용",
    },
  ]);

  let searchBar =
    searchType !== "자격증" ? (
      <TextField
        name="searchKeyword"
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
        options={certNames.map((option) => option.certName)}
        renderInput={(params) => (
          <TextField
            name="searchKeyword"
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
    <div id="container">
      <div id="boardTop">
        <div id="searchBar">
          <div className={styles.search}>
            <FormControl
              sx={{ width: "150px", marginRight: "10px" }}
              size="small"
            >
              <Select
                displayEmpty
                id="searchTypeSelect"
                name="searchType"
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
        </div>
        <Button
          className="askRegButton"
          variant="contained"
          onClick={() => (window.location = "./ask/write")}
        >
          글쓰기
        </Button>
      </div>
      <div id="askList" style={{ marginTop: "20px" }}>
        {asks.map((ask) => (
          <NavLink key={ask.id} to={`/community/ask/${ask.id}`}>
            <AskListItem ask={ask}></AskListItem>
          </NavLink>
        ))}
      </div>
      <div className="noticePageNation">
        <Stack spacing={2}>
          <Pagination count={5} />
        </Stack>
      </div>
    </div>
  );
};

export default AskContent;
