import React from "react";
import { Route, Routes } from "react-router";
import AdminBoard from "../components/admin/AdminBoard";
import AdminFaq from "../components/admin/AdminFaq";
import AdminNav from "../components/admin/AdminNav";
import AdminUser from "../components/admin/AdminUser";
import style from "../styles/admin/Admin.module.css";

const Admin = () => {
  return (
    <div className={style.main}>
      <AdminNav />
      <Routes>
        <Route path="/user" element={<AdminUser />}></Route>
        <Route path="/board" element={<AdminBoard />}></Route>
        <Route path="/faq" element={<AdminFaq />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
