import React, { useState, useEffect } from "react";
import AskListItem from "./AskListItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

const AskContent = ({ certNames }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState("자격증");
  const [asks, setAsks] = useState([]);
  const handleChange = (e) => {
    setSearchType(e.target.value);
  };

  // 리스폰스롤 받아온 데이터를 사용하기위한 state, ask엔티티가 아닌 받변개수가 추가된 DTO로 응답

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/ask", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        console.log(response.data.askList);
        setAsks(response.data.askList.content);
        setCount(response.data.askList.totalPages);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page]);

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
        <Link to="./write">
          <Button className="askRegButton" variant="contained">
            글쓰기
          </Button>
        </Link>
      </div>
      <div id="askList" style={{ marginTop: "20px" }}>
        {asks.map((ask) => (
          <NavLink key={ask.askIdx} to={`/community/ask/${ask.askIdx}`}>
            <AskListItem ask={ask}></AskListItem>
          </NavLink>
        ))}
      </div>
      <div className="noticePageNation">
        <Stack spacing={2}>
          <Pagination
            count={count} //총 페이지 수
            size="large"
            page={page} //현재 페이지
            variant="outlined"
            shape="rounded"
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
