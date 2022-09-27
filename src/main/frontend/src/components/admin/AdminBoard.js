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
  const [newBoard, setNewBoard] = useState(0);
  const [newReply, setNewReply] = useState(0);
  const [newStudy, setNewStudy] = useState(0);
  const [newAsk, setNewAsk] = useState(0);
  const [newAskReply, setNewAskReply] = useState(0);
  const [newShare, setNewShare] = useState(0);
  const [newShareReply, setNewShareReply] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/boardTotal`).then((response) => {
      setBoardTotal(response.data.boardTotal);
      setNewBoard(response.data.newTotal);
      setNewStudy(response.data.newStudy);
      setNewAsk(response.data.newAsk);
      setNewShare(response.data.newShare);
      setNewReply(response.data.newReply);
      setNewAskReply(response.data.newReplyAsk);
      setNewShareReply(response.data.newReplyShare);
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
      <AdminBoardStudyList style={style} newStudy={newStudy} />
      <AdminBoardAskList
        style={style}
        newAsk={newAsk}
        newAskReply={newAskReply}
      />
      <AdminBoardShareList
        style={style}
        newShare={newShare}
        newShareReply={newShareReply}
      />
    </div>
  );
};

export default AdminBoard;
