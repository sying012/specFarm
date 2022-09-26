import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../app-config";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        console.log(response.data.user);
        setLoginUser(response.data.user);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

  const isAdmin = () => {
    !!(loginUser.role === "ROLE_ADMIN") || alert("접근 불가");
    return !!(loginUser.role === "ROLE_ADMIN");
  };
  return (
    loginUser?.role && (isAdmin() ? <Component {...rest} /> : navigate(-1))
  );
};

export default AdminRoute;
