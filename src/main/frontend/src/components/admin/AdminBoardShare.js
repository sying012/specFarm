import React from "react";
import { useNavigate, useLocation } from "react-router";

const AdminBoardShare = ({ style, board }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!!board ? (
        <tr
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/community/share/${board.shareIdx}`, {
              state: {
                prevUrl: location.pathname,
              },
            });
          }}
        >
          <td className={style.boardNo}>{board.shareIdx}</td>
          <td className={style.boardTitle}>{board.shareTitle}</td>
          <td className={style.boardWriter}>{board.user.userId}</td>
          <td className={style.boardCount}>{board.shareCount}</td>
          <td className={style.boardRegDate}>{board.shareRegDate}</td>
        </tr>
      ) : null}
    </>
  );
};

export default AdminBoardShare;
