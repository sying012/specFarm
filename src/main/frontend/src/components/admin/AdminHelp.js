import React, { useState } from "react";
import { useEffect } from "react";
import adminStyle from "../../styles/admin/Admin.module.css";
import style from "../../styles/admin/AdminHelp.module.css";
import AdminHelpList from "./AdminHelpList";
import AdminHelpReplyList from "./AdminHelpReplyList";

const AdminHelp = () => {
  const [helpReplyList, setHelpReplyList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={adminStyle.container}>
      <AdminHelpList style={style} />
      <AdminHelpReplyList style={style} />
    </div>
  );
};

export default AdminHelp;
