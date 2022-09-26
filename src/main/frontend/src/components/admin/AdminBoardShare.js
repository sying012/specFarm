import React from "react";
import { useNavigate, useLocation } from "react-router";

const AdminBoardShare = ({
  style,
  board,
  index,
  expanded,
  handleChange,
  Accordion,
  AccordionSummary,
  AccordionDetails,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!!board ? (
        <Accordion
          expanded={expanded === `pane${index}`}
          onChange={handleChange(`pane${index}`)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <table className={style.table} style={{ minHeight: "35px" }}>
              <tbody>
                <tr>
                  <td className={style.boardNo}>{board.shareIdx}</td>
                  <td className={style.boardTitle}>{board.shareTitle}</td>
                  <td className={style.boardWriter}>{board.user.userId}</td>
                  <td className={style.boardCount}>{board.shareCount}</td>
                  <td className={style.boardRegDate}>{board.shareRegDate}</td>
                </tr>
              </tbody>
            </table>
          </AccordionSummary>
          <AccordionDetails>내용</AccordionDetails>
        </Accordion>
      ) : null}
    </>
  );
};

export default AdminBoardShare;
