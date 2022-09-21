import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Stack, Pagination, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { API_BASE_URL } from "../../app-config";
import axios from "axios";
import { useCallback } from "react";

const NoticeList = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [update, setUpdate] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  const getNoticeList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/cs", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
          searchKeyword: searchKeyword,
        },
      })
      .then((response) => {
        setNoticeList(response.data.noticeList.content);
        setCount(response.data.noticeList.totalPages);
      });
  }, [page, searchKeyword]);

  useEffect(() => {
    if (update === true) getNoticeList();
  }, [page, update]);

  useEffect(() => {
    setUpdate(false);
    if (location.state == null) {
      setSearchKeyword("");
      setPage(1);
    } else {
      setPage(location.state.page);
      setSearchKeyword(location.state.searchKeyword);
      setUpdate(true);
    }
  }, [location.key]);

  useEffect(() => {
    setUpdate(true);
  }, [searchKeyword]);

  return (
    <>
      <div id="noticeSearchBar" className="search">
        {user !== null && user.role === "ROLE_ADMIN" ? (
          <Button
            className="askRegButton"
            variant="contained"
            onClick={() => (window.location = "./cs/write")}
          >
            글쓰기
          </Button>
        ) : null}
        <form
          id="keywordSearchBar"
          onSubmit={(e) => {
            e.preventDefault();
            getNoticeList();
          }}
        >
          <TextField
            name="searchKeyword"
            id="outlined-search"
            type="search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            InputProps={{
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
          ></TextField>
        </form>
      </div>
      <table id="noticeTable" className="table">
        <thead>
          <tr>
            <th className="noticeNo" style={{ borderTopLeftRadius: "10px" }}>
              번호
            </th>
            <th className="noticeTitle">이장님 말씀</th>
            <th className="noticeDate" style={{ borderTopRightRadius: "10px" }}>
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice) => (
            <NoticeListItem
              key={notice.noticeIdx}
              notice={notice}
              onClick={() =>
                navigate(`/cs/${notice.noticeIdx}`, {
                  state: {
                    searchKeyword: searchKeyword,
                    page: page,
                  },
                })
              }
            ></NoticeListItem>
          ))}
        </tbody>
      </table>
      <div className="noticePageNation">
        <Stack spacing={2}>
          <Pagination
            count={count} //총 페이지 수
            page={page} //현재 페이지
            onChange={(e, p) => {
              setPage(p);
              window.scrollTo(0, 0);
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default NoticeList;

export const NoticeListItem = ({ notice, onClick }) => (
  <tr onClick={onClick} style={{ cursor: "pointer" }}>
    <td className="noticeNo">{notice.noticeIdx}</td>
    <td className="noticeTitle">{notice.noticeTitle}</td>
    <td className="noticeDate">{notice.noticeRegDate}</td>
  </tr>
);
