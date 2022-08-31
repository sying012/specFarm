import React from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../images/loupe.png";
import { Pagination } from "@mui/material";
import { Button } from "@mui/material";

const NoticeList = () => {
  const noticeData = [
    {
      id: 1,
      noticeTitle:
        "제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목 제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목 제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목",
      noticeContent:
        "내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:34",
    },
    {
      id: 2,
      noticeTitle: "제목인데 그냥 제목",
      noticeContent:
        "내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:35",
    },
    {
      id: 3,
      noticeTitle: "제목인데 엄청나게 긴 제목이지만 ...은 없을 정도의 제목",
      noticeContent:
        "내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:36",
    },
  ];

  return (
    <>
      <div id="noticeSearchBar">
        <Button
          className="askRegButton"
          variant="outlined"
          onClick={() => (window.location = "./notice/write")}
        >
          글쓰기
        </Button>
        <form id="keywordSearchBar" action="">
          <input
            type="text"
            name="searchKeyword"
            style={{ fontSize: "1.1rem", paddingLeft: "10px" }}
          />
          <button id="search" type="submit">
            <img src={searchIcon} alt="" style={{ width: "100%" }} />
          </button>
        </form>
      </div>
      <table id="noticeTable">
        <thead>
          <tr>
            <th className="noticeNo">번호</th>
            <th className="noticeTitle">이장님 말씀</th>
            <th className="noticeDate">작성일</th>
          </tr>
        </thead>
        <tbody>
          {noticeData.map((notice) => (
            <NoticeListItem key={notice.id} notice={notice}></NoticeListItem>
          ))}
        </tbody>
      </table>
      <div id="noticePagination">
        <Pagination className="noticePagination" count={5} shape="rounded" />
      </div>
    </>
  );
};

export default NoticeList;

export const NoticeListItem = ({ notice }) => (
  <tr>
    <td className="noticeNo">{notice.id}</td>
    <td className="noticeTitle">
      <Link to={"/notice/1"}>{notice.noticeTitle}</Link>
    </td>
    <td className="noticeDate">{notice.noticeRegDate}</td>
  </tr>
);
