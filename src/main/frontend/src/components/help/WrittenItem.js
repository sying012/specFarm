import { createTheme } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "../../styles/help/WrittenItem.module.css";

const WrittenItem = ({ help }) => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Pretendard-Regular",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
      ].join(","),
    },
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.helpListHeader}>
          <div
            theme={theme}
            className={styles.state}
            style={{
              color: "white",
              background: help.reply ? "#1d5902" : "#777",
            }}
          >
            {help.reply ? "답변완료" : "답변대기"}
          </div>
          <div className={styles.helpListHeaderSecond}>
            <h1 className={styles.helpTitle}>[{help.category}] {help.helpTitle}</h1>
            <p className={styles.helpRegDate}>{help.helpRegDate}</p>
          </div>
        </div>
        <p className={styles.helpContent}>{help.helpContent}</p>
      </div>
    </div>
  );
};

export default WrittenItem;
