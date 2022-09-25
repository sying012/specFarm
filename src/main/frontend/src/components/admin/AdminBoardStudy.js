import React from "react";
import { useNavigate, useLocation } from "react-router";

const AdminBoardStudy = ({ style, board }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!!board ? (
        <tr
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/community/study/${board.studyIdx}`, {
              state: {
                prevUrl: location.pathname,
              },
            });
          }}
        >
          <td className={style.boardNo}>{board.studyIdx}</td>
          <td className={style.boardTitle}>{board.studyTitle}</td>
          <td className={style.boardWriter}>{board.user.userId}</td>
          <td className={style.boardCount}>{board.studyCount}</td>
          <td className={style.boardRegDate}>{board.studyRegDate}</td>
        </tr>
      ) : null}
    </>
  );
};

export default AdminBoardStudy;
