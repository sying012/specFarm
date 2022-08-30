import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/lost/Lost.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { NearMeSharp } from "@mui/icons-material";

const LostList = () => {
  const [losts, setLosts] = useState([
    {
      id: 1,
      brchName: "서울",
      lostCat: "MP3/전자제품/게임기 등",
      lostItem: "USB",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 2,
      brchName: "대전",
      lostCat: "기타",
      lostItem: "주민등록증",
      lostLoc: "청운중학교",
      lostDate: "2022.00.00",
    },
    {
      id: 3,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 3,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
    },
  ]);

  const [searchTypeItem, setSearchTypeItem] = useState([
    {
      id: 1,
      name: "전체",
    },
    {
      id: 2,
      name: "지사",
    },
    {
      id: 3,
      name: "분실물 목록",
    },
    {
      id: 4,
      name: "분실 장소",
    },
    {
      id: 5,
      name: "분실 일자",
    },
  ]);

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
            {searchTypeItem.map((st) => (
              <MenuItem key={st.name} value={st.name}>
                {st.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="inherit" />,
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
            <tr>
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
