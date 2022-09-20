import { createTheme } from "@mui/material";

import styles from "../../styles/mypage/WrittenShare.module.css";

const WrittenShare = ({ share }) => {
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
    <div>
      <div className={styles.shareList}>
        <img
          src={"/upload/share/" + share.shareImgName}
          alt="나눔이미지 파일"
          className={styles.shareFile}
        />
        <div className={styles.shareContainer}>
          <div className={styles.shareListHeader}>
            <div
              theme={theme}
              className={styles.state}
              style={{
                color: "white",
                background: share.shareYn ? "#1d5902" : "#777",
              }}
            >
              {share.shareYn ? "나눔" : "완료"}
            </div>
            <div className={styles.shareListHeaderSecond}>
              <h1 className={styles.writtenTitle}>{share.shareTitle}</h1>
              <p className={styles.shareRegDate}>{share.shareRegDate}</p>
            </div>
          </div>
          <p className={styles.shareContent}>{share.shareContent}</p>
        </div>
      </div>
    </div>
  );
};

export default WrittenShare;
