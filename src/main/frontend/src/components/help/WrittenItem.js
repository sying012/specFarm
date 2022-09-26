import { createTheme, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import styles from "../../styles/help/WrittenItem.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const WrittenItem = ({ help, expanded, handleChange, setHelpList }) => {
  const deleteHelp = useCallback(() => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      axios({
        method: "delete",
        url: API_BASE_URL + "/cs/help/delete",
        data: help,
      }).then((response) => {
        if (response.data) {
          alert("삭제되었습니다.");
          setHelpList(response.data.helpList);
        } else {
          alert("다시 시도해주세요.");
        }
      });
    }
  }, [help]);

  return (
    <div className={styles.mainContainer}>
      <Accordion
        expanded={expanded === `panel${help.helpIdx}`}
        onChange={handleChange(`panel${help.helpIdx}`)}
        style={{ boxShadow: "none", width: "100%" }}
      >
        <AccordionSummary
          aria-controls={"panel" + help.helpIdx + "bh-content"}
          id={"panel" + help.helpIdx + "bh-header"}
          style={{ margin: "0", padding: "0" }}
        >
          <div className={styles.innerContainer}>
            <div className={styles.helpListHeader}>
              <div
                className={styles.state}
                style={{
                  color: "white",
                  background: help.reply ? "#1d5902" : "#777",
                }}
              >
                {help.reply ? "답변완료" : "답변대기"}
              </div>
              <div className={styles.helpListHeaderSecond}>
                <h1 className={styles.helpTitle}>
                  [{help.category}] {help.helpTitle}
                </h1>
                <p className={styles.helpRegDate}>{help.helpRegDate}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: "0" }}>
          <div className={styles.innerContainer}>
            <div className={styles.contentContainer}>
              <h1 className={styles.helpTitleSec}>{help.helpTitle}</h1>
              <pre className={styles.helpContent}>{help.helpContent}</pre>
              <div className={styles.lowerContainer}>
                <div className={styles.smContainer}>
                  {help.attachedFile ? (
                    <div className={styles.smContainer}>
                      <p className={styles.attachedFile}>첨부 파일</p>
                      <a href={"/upload/cs/help/" + help.attachedFile}>{help.attachedRealName}</a>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {help.reply ? (
                  <></>
                ) : (
                  <IconButton
                    color="error"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={deleteHelp}
                  >
                    <DeleteForever />
                  </IconButton>
                )}
              </div>
            </div>
            {help.reply ? (
              <div className={styles.adminContainer}>
                <p className={styles.adminAnswer}>관리자 답변</p>
                <div className={styles.answerContainer}>
                  <pre className={styles.adminReply}>{help.reply}</pre>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WrittenItem;
