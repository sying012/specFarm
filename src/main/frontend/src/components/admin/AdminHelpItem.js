import { Button, createTheme, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { API_BASE_URL } from "../../app-config";

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
  const theme = createTheme({
    palette: {
      green: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  const submitHelpAnswer = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const answer = data.get("answer");

    axios({
      method: "post",
      url: API_BASE_URL + "/admin/insertAnswer",
      data: {
        ...help,
        reply: answer,
      },
    }).then((response) => {
      if (response.data === "success") {
        alert("등록되었습니다.");
        window.location.replace("/admin/faq");
      }
    });
  };

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
            <form onSubmit={submitHelpAnswer}>
              <div className={style.answerContainer}>
                <TextField
                  style={{ width: "90%", marginRight: "10px" }}
                  multiline
                  rows={3}
                  name="answer"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#8cbf75",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#1d5902",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  theme={theme}
                  color="green"
                  className={style.buttonMiddle}
                  style={{
                    fontSize: "15px",
                    lineHeight: "18px",
                    padding: "14px 16px",
                    height: "40px",
                  }}
                >
                  등록
                </Button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </>
  );
};

export default AdminHelpItem;
