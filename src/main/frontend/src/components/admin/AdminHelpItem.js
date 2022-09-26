import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const AdminHelpItem = ({
  style,
  help,
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
      {!!help ? (
        <Accordion
          expanded={expanded === `pane${index}`}
          onChange={handleChange(`pane${index}`)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <table className={style.table} style={{ minHeight: "35px" }}>
              <tbody>
                <tr>
                  <td className={style.helpNo}>{help.helpIdx}</td>
                  <td className={style.helpCategory}>{help.category}</td>
                  <td className={style.helpTitle}>{help.helpTitle}</td>
                  <td className={style.helpWriter}>{help.userId}</td>
                  <td className={style.helpRegDate}>{help.helpRegDate}</td>
                </tr>
              </tbody>
            </table>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ fontWeight: "600", marginBottom: "10px" }}>
              {help.helpTitle}
            </div>
            <div>{help.helpContent}</div>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </>
  );
};

export default AdminHelpItem;
