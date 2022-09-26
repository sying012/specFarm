import React, { useState, useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import AdminHelpItem from "./AdminHelpItem";
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

const AdminHelpList = ({ style }) => {
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [helpList, setHelpList] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/admin/help", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        setHelpList(response.data.helpList.content);
        setCount(response.data.helpList.totalPages);
        setTotal(response.data.helpList.totalElements);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page]);

  //아코디언 핸들러
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //아코디언 핸들러 끝

  return (
    <div
      className={`${style.helpBox} ${style.helpList}`}
      style={{ marginTop: "0" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p className={style.adminTitle}>미답변 문의</p>

        <p style={{ marginRight: "20px" }}>Count: {total}</p>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.helpNo}>No</th>
            <th className={style.helpCategory}>카테고리</th>
            <th className={style.helpTitle}>제목</th>
            <th className={style.helpWriter}>작성자</th>
            <th className={style.helpRegDate}>접수일</th>
          </tr>
        </thead>
      </table>
      <div>
        {helpList.map((help, index) => (
          <AdminHelpItem
            key={index}
            index={index}
            help={help}
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

export default AdminHelpList;
