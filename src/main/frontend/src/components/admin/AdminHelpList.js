import React, { useState, useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import AdminHelpItem from "./AdminHelpItem";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AdminHelpList = ({ style }) => {
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
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
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page]);

  return (
    <div className={`${style.helpBox} ${style.helpList}`}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p className={style.adminTitle}>미답변 문의</p>
        <div
          style={{
            width: "50%",
            minWidth: "300px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>총 게시글: 1</p>
          <p>신규 게시글: 3</p>
          <p>신규 댓글: 13</p>
        </div>
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
        <tbody>
          {helpList.map((help, index) => (
            <AdminHelpItem key={index} help={help} style={style} />
          ))}
        </tbody>
      </table>
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
  );
};

export default AdminHelpList;
