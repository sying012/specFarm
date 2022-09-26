import React, { useState, useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import AdminBoardShare from "./AdminBoardShare";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

//아코디언 커스터마이즈
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "none",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    padding: "0",
    backgroundColor: "none",
    "&.MuiAccordionSummary-root": {
      minHeight: "35px",
    },
    "& .MuiAccordionSummary-content": {
      minHeight: "35px",
      margin: "0",
      lineHeight: "1.1",
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
//아코디언 커스터마이즈 끝

const AdminBoardShareList = ({ style, shareTotal }) => {
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/admin/share", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        setBoardList(response.data.shareList.content);
        setCount(response.data.shareList.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);

  //아코디언 핸들러
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //아코디언 핸들러 끝

  return (
    <div className={`${style.boardBox} ${style.boardList}`}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p className={style.adminTitle}>나눔장터</p>
        <div
          style={{
            width: "50%",
            minWidth: "300px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>총 게시글: {shareTotal}</p>
          <p>신규 게시글: 9</p>
          <p>신규 댓글: 53</p>
        </div>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.boardNo}>No</th>
            <th className={style.boardTitle}>제목</th>
            <th className={style.boardWriter}>작성자</th>
            <th className={style.boardCount}>조회수</th>
            <th className={style.boardRegDate}>작성일</th>
          </tr>
        </thead>
      </table>
      <div>
        {boardList.map((board, index) => (
          <AdminBoardShare
            key={index}
            index={index}
            board={board}
            style={style}
            expanded={expanded}
            handleChange={handleChange}
            Accordion={Accordion}
            AccordionSummary={AccordionSummary}
            AccordionDetails={AccordionDetails}
          />
        ))}
      </div>
      <Stack spacing={2} style={{ marginTop: "15px" }}>
        <Pagination
          count={count} //총 페이지 수
          page={page} //현재 페이지
          onChange={(e, p) => {
            setPage(p);
          }}
        />
      </Stack>
    </div>
  );
};

export default AdminBoardShareList;
