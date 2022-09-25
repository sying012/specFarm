import { Pagination, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import AdminUserListItem from "./AdminUserListItem";

const AdminUserList = ({ style, count, page, setPage, userList }) => {
  return (
    <div className={`${style.userBox} ${style.userList}`}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p className={style.adminTitle}>전체 회원 조회</p>
        <input type="text" />
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.userListUserId}>아이디</th>
            <th className={style.userListNick}>닉네임</th>
            <th className={style.userListFavL}>관심분야:대</th>
            <th className={style.userListFavM}>관심분야:중</th>
            <th className={style.userListReg}>가입날짜</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <AdminUserListItem key={index} user={user} style={style} />
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

export default AdminUserList;
