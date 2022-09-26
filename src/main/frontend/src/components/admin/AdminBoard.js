import React, { useState, useEffect } from "react";
import adminStyle from "../../styles/admin/Admin.module.css";
import style from "../../styles/admin/AdminBoard.module.css";
import AdminBoardAskList from "./AdminBoardAskList";
import AdminBoardShareList from "./AdminBoardShareList";
import AdminBoardTotal from "./AdminBoardTotal";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import AdminBoardStudyList from "./AdminBoardStudyList";

const AdminBoard = () => {
  const [boardTotal, setBoardTotal] = useState(0);
  const [studyTotal, setStudyTotal] = useState(0);
  const [askTotal, setAskTotal] = useState(0);
  const [shareTotal, setShareTotal] = useState(0);
  const [newBoard, setNewBoard] = useState(0);
  const [newReply, setNewReply] = useState(0);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/boardTotal`).then((response) => {
      setStudyTotal(response.data.studyTotal);
      setAskTotal(response.data.askTotal);
      setShareTotal(response.data.shareTotal);
      setBoardTotal(
        response.data.studyTotal +
          response.data.askTotal +
          response.data.shareTotal
      );
      // setNewBoard(response.data.newBoard);
      // setNewReply(response.data.newReply);
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={adminStyle.container}>
      <AdminBoardTotal
        style={style}
        boardTotal={boardTotal}
        newBoard={newBoard}
        newReply={newReply}
      />
      <AdminBoardStudyList style={style} studyTotal={studyTotal} />
      <AdminBoardAskList style={style} askTotal={askTotal} />
      <AdminBoardShareList style={style} shareTotal={shareTotal} />
    </div>
  );
};

export default AdminBoard;
