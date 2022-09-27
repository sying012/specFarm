import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AdminBoardTotal = ({ style, boardTotal, newBoard, newReply }) => {
  return (
    <div className={`${style.boardBox} ${style.boardTotal}`}>
      <p>총 게시글: {boardTotal}</p>
      <p>7일간 신규 게시글: {newBoard}</p>
      <p>7일간 신규 댓글: {newReply}</p>
    </div>
  );
};

export default AdminBoardTotal;
