import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { API_BASE_URL } from "../../app-config";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLoginUser(response.data.user);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

  const isAdmin = () => {
    !!(loginUser.role === "ROLE_ADMIN") ||
      alert("관리자 계정으로 로그인해주세요.");
    return !!(loginUser.role === "ROLE_ADMIN");
  };
  return isAdmin() ? <Component {...rest} /> : <Navigate replace to="/login" />;
};

export default AdminRoute;
