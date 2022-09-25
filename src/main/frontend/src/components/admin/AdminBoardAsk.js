import React from "react";
import { useNavigate, useLocation } from "react-router";

const AdminBoardAsk = ({ style, board }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!!board ? (
        <tr
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/community/ask/${board.askIdx}`, {
              state: {
                prevUrl: location.pathname,
              },
            });
          }}
        >
          <td className={style.boardNo}>{board.askIdx}</td>
          <td className={style.boardTitle}>{board.askTitle}</td>
          <td className={style.boardWriter}>{board.user.userId}</td>
          <td className={style.boardCount}>{board.askCount}</td>
          <td className={style.boardRegDate}>{board.askRegDate}</td>
        </tr>
      ) : null}
    </>
  );
};

export default AdminBoardAsk;
