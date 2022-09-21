import React from "react";
import {
  CardActionArea,
  createTheme,
  Typography,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import styles from "../../styles/share/shareCard.module.css";
import { Link } from "react-router-dom";

const ShareCard = ({ shareItem }) => {
  const {
    shareIdx,
    shareTitle,
    user: { userNick },
    shareImgName,
    shareYn,
  } = shareItem;

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
      // fontSize: "15px",
    },
  });

  return (
    <Link to={`/community/share/${shareIdx}`}>
      <Card theme={theme} className={styles.cardbody} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className={styles.img}
            component="img"
            height="140"
            image={
              shareImgName
                ? `/upload/share/${shareImgName}`
                : "/upload/share/shareImg.png"
            }
            alt="itemImg"
          />
          <CardContent theme={theme} style={{ paddingTop: 10 }}>
            <Typography
              theme={theme}
              gutterBottom
              variant="h6"
              component="div"
              style={{
                width: "220px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {shareTitle}
            </Typography>
            <div className={styles.bottom}>
              <div
                theme={theme}
                className={styles.state}
                style={{
                  color: "white",
                  background: shareYn ? "#1d5902" : "#777",
                }}
              >
                {shareYn ? "나눔" : "완료"}
              </div>
              <p className={styles.writer} theme={theme}>
                {userNick}
              </p>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ShareCard;
