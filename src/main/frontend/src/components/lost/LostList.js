import {
  Autocomplete,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/lost/Lost.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const LostList = ({ searchType }) => {
  const [losts, setLosts] = useState([]);
  const [brchs, setBrchs] = useState([]);
  const [page, setPage] = useState(1); // firstPage = 1
  const [data, setData] = useState(losts.slice(0, 10)); // firstPage data

  // search type select
  const [selectSearchType, setSelectSearchType] = useState("전체");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/cs/getLosts",
    }).then((response) => {
      setLosts(response.data.lostList);
      setBrchs(response.data.brchList);
    });

    // axios({
    //   method: "get",
    //   url: API_BASE_URL + "/cs/saveLosts",
    // });
  }, []);

  const handleChange = (e) => {
    setSelectSearchType(e.target.value);
    setSearchText("");
  };

  // tr click => lostItem
  const navigate = useNavigate();
  const goLostItem = (rownum) => {
    navigate(`./${rownum}`, { state: losts });
  };

  // search
  const searchSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: API_BASE_URL + "/cs/getLosts/search",
      params: {
        searchType: selectSearchType,
        searchText: searchText,
      },
    }).then((response) => {
      setLosts(response.data);
      setPage(1);
    });
  };

  // brch search
  const brchSearchSubmit = (newText) => {
    axios({
      method: "get",
      url: API_BASE_URL + "/cs/getLosts/search",
      params: {
        searchType: selectSearchType,
        searchText: newText,
      },
    }).then((response) => {
      setLosts(response.data);
      setPage(1);
    });
  };

  // searchBar type Brch => change
  let searchBar =
    selectSearchType !== "지역" ? (
      <form onSubmit={searchSubmit}>
        <TextField
          name="searchInput"
          id="searchInput"
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
          value={searchText || ""}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></TextField>
      </form>
    ) : (
      <Autocomplete
        freeSolo
        id="searchBrch"
        disableClearable
        options={brchs.map((option) => option.brchName)}
        onChange={(e, text) => brchSearchSubmit(text)}
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

  // pagenation
  const LAST_PAGE =
    losts.length % 10 === 0
      ? parseInt(losts.length / 10)
      : parseInt(losts.length / 10) + 1; // lastPage

  useEffect(() => {
    if (losts.length !== 0) {
      setData(losts.slice(10 * (page - 1), 10 * (page - 1) + 10));
    } else {
      setData([]);
    }
  }, [losts, page]);

  return (
    <div>
      <div className={styles.search}>
        <FormControl sx={{ width: "150px", marginRight: "10px" }} size="small">
          <Select
            displayEmpty
            id="searchTypeSelect"
            value={selectSearchType}
            onChange={handleChange}
            sx={{
              "&.MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8cbf75",
                },
              },
            }}
          >
            {searchType.map((item) => (
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
      <div className={styles.tableDiv}>
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
            {data.map((lost) => (
              <tr key={lost.rownum} onClick={() => goLostItem(lost.rownum)}>
                <td className={styles.brchName}>{lost.brchName}</td>
                <td className={styles.lostItem}>
                  [{lost.lostCat}] {lost.lostItem}
                </td>
                <td className={styles.lostLoc}>{lost.lostLoc}</td>
                <td className={styles.lostDate}>
                  {lost.lostDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination
            count={LAST_PAGE}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default LostList;
