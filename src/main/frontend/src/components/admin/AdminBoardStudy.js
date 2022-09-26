import React from "react";
import { useNavigate, useLocation } from "react-router";

const AdminBoardStudy = ({
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
                  <td className={style.boardNo}>{board.studyIdx}</td>
                  <td className={style.boardTitle}>{board.studyTitle}</td>
                  <td className={style.boardWriter}>{board.user.userId}</td>
                  <td className={style.boardCount}>{board.studyCount}</td>
                  <td className={style.boardRegDate}>{board.studyRegDate}</td>
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

export default AdminBoardStudy;
