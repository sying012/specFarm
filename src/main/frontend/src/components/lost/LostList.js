import {
  Autocomplete,
  createTheme,
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

const LostList = ({ searchType, changeParentState }) => {
  const [losts, setLots] = useState([]);
  const [lostList, setLostList] = useState([]);
  const [page, setPage] = useState(1); // firstPage = 1
  const [data, setData] = useState(lostList.slice(0, 10)); // firstPage data
  const [brchs, setBrchs] = useState([]);

  // search type select
  const [selectSearchType, setSelectSearchType] = useState("전체");
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/getLosts",
    }).then((response) => {
      setLots(response.data.lostList);
      setBrchs(response.data.brchList);
    });
  }, []);

  const handleChange = (e) => {
    setSelectSearchType(e.target.value);
    setSearchText("");
  };

  // tr click => lostItem
  const navigate = useNavigate();
  const goLostItem = (index) => {
    navigate(`./${index}`);
  };

  useEffect(() => {
    switch (selectSearchType) {
      case "전체":
        setLostList(
          losts.filter((lost) => {
            if (lost.brchName.includes(searchText)) {
              return lost;
            } else if (lost.lostItem.includes(searchText)) {
              return lost;
            } else if (lost.lostLoc.includes(searchText)) {
              return lost;
            } else if (lost.lostDate.includes(searchText)) {
              return lost;
            }
          })
        );
        break;

      case "지사":
        setLostList(
          losts.filter((lost) => {
            return lost.brchName.includes(searchText);
          })
        );
        break;

      case "분실물 목록":
        setLostList(
          losts.filter((lost) => {
            return lost.lostItem.includes(searchText);
          })
        );
        break;

      case "분실 장소":
        setLostList(
          losts.filter((lost) => {
            return lost.lostLoc.includes(searchText);
          })
        );
        break;

      case "분실 일자":
        setLostList(
          losts.filter((lost) => {
            return lost.lostDate.includes(searchText);
          })
        );
        break;
    }
  }, [searchText]);

  const test = (e) => {
    e.preventDefault();
    const dataa = new FormData(e.target);
    const searchsss = dataa.get("searchInput");
    setSearchText(dataa.get("searchInput"));
  };

  // searchBar type Brch => change
  let searchBar =
    selectSearchType !== "지사" ? (
      <form onSubmit={test}>
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
        ></TextField>
      </form>
    ) : (
      <Autocomplete
        freeSolo
        id="searchBrch"
        disableClearable
        options={brchs.map((option) => option.brchName)}
        value={searchText || ""}
        onChange={(e, newText) => {
          setSearchText(newText);
        }}
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
    lostList.length % 10 === 0
      ? parseInt(lostList.length / 10)
      : parseInt(lostList.length / 10) + 1; // lastPage

  useEffect(() => {
    if (lostList.length !== 0) {
      if (page === LAST_PAGE) {
        setData(lostList.slice(10 * (page - 1)));
      } else {
        setData(lostList.slice(10 * (page - 1), 10 * (page - 1) + 10));
      }
    }
  }, [lostList]);

  useEffect(() => {
    setLostList(losts);
    changeParentState(losts, brchs);
  }, [losts]);

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
          {data.map((lost, index) => (
            <tr key={index} onClick={() => goLostItem(index)}>
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
