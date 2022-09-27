import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AdminUserTotal = ({ style, totalUser }) => {
  const [newUserW, setNewUserW] = useState(0);
  const [newUserM, setNewUserM] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/newUser`).then((response) => {
      setNewUserW(response.data.newUserW);
      setNewUserM(response.data.newUserM);
    });
  }, []);
  return (
    <div className={`${style.userBox} ${style.userTotal}`}>
      <p>총 회원: {totalUser}</p>
      <p>7일 간 신규가입: {newUserW}</p>
      <p>한달 간 신규가입: {newUserM}</p>
    </div>
  );
};

export default AdminUserTotal;
