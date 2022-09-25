import React, { useState, useEffect } from "react";
import adminStyle from "../../styles/admin/Admin.module.css";
import style from "../../styles/admin/AdminUser.module.css";
import AdminUserList from "./AdminUserList";
import AdminUserNew from "./AdminUserNew";
import AdminUserTotal from "./AdminUserTotal";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AdminUser = () => {
  const [userList, setUserList] = useState([]);
  const [totalUser, setTotalUser] = useState();
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/admin/user", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        setUserList(response.data.userList.content);
        setCount(response.data.userList.totalPages);
        setTotalUser(response.data.totalUser);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);
  return (
    <div className={adminStyle.container}>
      <AdminUserTotal style={style} totalUser={totalUser} />
      <AdminUserNew style={style} />
      <AdminUserList
        style={style}
        count={count}
        page={page}
        setPage={setPage}
        userList={userList}
      />
    </div>
  );
};

export default AdminUser;
