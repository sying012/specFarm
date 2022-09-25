import React from "react";
import { NavLink } from "react-router-dom";
import profileStyles from "../../styles/mypage/Profile.module.css";
import style from "../../styles/admin/AdminNav.module.css";

const AdminNav = () => {
  const navStyle = ({ isActive }) => ({
    color: isActive ? "white" : "#0d0d0d",
    background: isActive ? "#1d5902" : null,
  });
  return (
    <div className={`${profileStyles.profileContainer} ${style.navBox}`}>
      <ul className={style.navbar}>
        <li>
          <NavLink to="./user" style={navStyle}>
            유저 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="./board" style={navStyle}>
            게시글 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="./faq" style={navStyle}>
            문의 관리
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
