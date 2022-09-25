import React from "react";

const AdminUserNew = ({ style }) => {
  return (
    <div className={`${style.userBox} ${style.userNew}`}>
      <p className={style.adminTitle}>신규 가입 현황</p>
      <p>09.25 9명</p>
      <p>09.24 6명</p>
      <p>09.23 5명</p>
      <p>09.22 2명</p>
      <p>09.21 5명</p>
      <p>09.20 4명</p>
      <p>09.19 8명</p>
    </div>
  );
};

export default AdminUserNew;
