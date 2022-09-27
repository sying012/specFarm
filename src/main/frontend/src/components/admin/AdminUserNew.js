import React, { useEffect, useState } from "react";
import NivoLineChart from "./NivoLineChart";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AdminUserNew = ({ style }) => {
  const [data, setData] = useState([
    { id: "7일간신규가입", color: "hsl(89, 70%, 50%)", data: [] },
  ]);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/chartUser`).then((response) => {
      setData((data) => {
        return data.map((newUser) => ({
          ...newUser,
          data: response.data.userList,
        }));
      });
    });
  }, []);

  console.log(data);

  return (
    <div className={`${style.userBox} ${style.userNew}`}>
      <p className={style.adminTitle}>신규 가입 현황</p>
      <NivoLineChart data={data} />
    </div>
  );
};

export default AdminUserNew;
