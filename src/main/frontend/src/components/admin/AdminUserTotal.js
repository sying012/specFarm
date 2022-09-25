import React from "react";

const AdminUserTotal = ({ style, totalUser }) => {
  return (
    <div className={`${style.userBox} ${style.userTotal}`}>
      <p>총 회원: {totalUser}</p>
      <p>금일 신규가입: 9</p>
      <p>7일간 신규가입: 53</p>
    </div>
  );
};

export default AdminUserTotal;
