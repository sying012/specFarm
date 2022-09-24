import React, { useState, useEffect } from "react";
import AskListItem from "./AskListItem";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { useCallback } from "react";

const AskContent = ({ certNames }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(0);
  const [searchType, setSearchType] = useState("자격증");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [asks, setAsks] = useState([]);
  const handleSearchType = (e) => {
    setSearchType(e.target.value);
    setSearchKeyword("");
    // sessionStorage.setItem("searchType", e.target.value);
  };

  const handleSearchKeyword = (e, text) => {
    searchType === "자격증"
      ? setSearchKeyword(text)
      : setSearchKeyword(e.target.value);

    // sessionStorage.setItem("searchKeyword", e.target.value);
  };

  const getAksList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/community/ask", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
          searchKeyword: searchKeyword,
          searchType: searchType,
        },
      })
      .then((response) => {
        setAsks(response.data.askList.content);
        setCount(response.data.askList.totalPages);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page, searchKeyword, searchType]);

  useEffect(() => {
    if (update === true) getAksList();
  }, [page, update]);

  useEffect(() => {
    setUpdate(false);
    if (
      location.state == null ||
      location.state.searchType == null ||
      location.state.page == null
    ) {
      setSearchType("자격증");
      setSearchKeyword("");
      setPage(1);
    } else {
      setPage(location.state.page);
      setSearchType(location.state.searchType);
      setSearchKeyword(location.state.searchKeyword);
      setUpdate(true);
    }
  }, [location.key]);

  useEffect(() => {
    setUpdate(true);
  }, [searchKeyword]);

  const submitSearch = (e) => {
    setPage(1);
    e.preventDefault();
    getAksList();
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
      <form onSubmit={submitSearch}>
        <TextField
          name="searchKeyword"
          id="outlined-search"
          type="search"
          value={searchKeyword || ""}
          onChange={handleSearchKeyword}
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
      </form>
    ) : (
      <form onSubmit={submitSearch}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={certNames.map((option) => option.certName)}
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
          name="searchKeyword"
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
      </form>
    );

  return (
    <div id="container">
      <div id="boardTop">
        <div id="searchBar">
          <div className={styles.search} onSubmit={submitSearch}>
            <FormControl
              sx={{ width: "150px", marginRight: "10px" }}
              size="small"
            >
              <Select
                displayEmpty
                id="searchTypeSelect"
                name="searchType"
                value={searchType}
                onChange={handleSearchType}
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
        <Link to="./write">
          <Button className="askRegButton" variant="contained">
            글쓰기
          </Button>
        </Link>
      </div>
      <div id="askList" style={{ marginTop: "20px" }}>
        {asks.map((ask) => (
          <div
            key={ask.askIdx}
            onClick={() =>
              navigate(`/community/ask/${ask.askIdx}`, {
                state: {
                  searchType: searchType,
                  searchKeyword: searchKeyword,
                  page: page,
                },
              })
            }
          >
            <AskListItem ask={ask}></AskListItem>
          </div>
        ))}
      </div>
      <div className="noticePageNation">
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
    </div>
  );
};

export default AskContent;
