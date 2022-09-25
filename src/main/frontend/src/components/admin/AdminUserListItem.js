import React from "react";

const AdminUserListItem = ({ style, user }) => {
  return (
    <tr style={{ cursor: "pointer" }}>
      <td className={style.userListUserId}>{user.userId}</td>
      <td className={style.userListNick}>{user.userNick}</td>
      <td className={style.userListFavL}>{user.favFieldL}</td>
      <td className={style.userListFavM}>{user.favFieldM}</td>
      <td className={style.userListReg}>{user.userRegDate}</td>
    </tr>
  );
};

export default AdminUserListItem;
