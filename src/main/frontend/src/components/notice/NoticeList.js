import React from "react";
import { Link } from "react-router-dom";
import { Stack, Pagination, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NoticeList = ({ noticeData }) => {
  return (
    <>
      <div id="noticeSearchBar" className="search">
        <Button
          className="askRegButton"
          variant="outlined"
          onClick={() => (window.location = "./cs/write")}
        >
          글쓰기
        </Button>
        <form id="keywordSearchBar" action="">
          <TextField
            id="outlined-search"
            type="search"
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
              styles: { fontFamily: "Hahmlet" },
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
          {noticeData.map((notice) => (
            <NoticeListItem key={notice.id} notice={notice}></NoticeListItem>
          ))}
        </tbody>
      </table>
      <div className="noticePageNation">
        <Stack spacing={2}>
          <Pagination count={5} />
        </Stack>
      </div>
    </>
  );
};

export default NoticeList;

export const NoticeListItem = ({ notice }) => (
  <tr>
    <td className="noticeNo">{notice.id}</td>
    <td className="noticeTitle">
      <Link to={`/cs/${notice.id}`}>{notice.noticeTitle}</Link>
    </td>
    <td className="noticeDate">{notice.noticeRegDate}</td>
  </tr>
);
