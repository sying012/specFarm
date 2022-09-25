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
import { useState } from "react";
import { useEffect } from "react";

const ShareCard = ({ shareItem }) => {
  const [share, setShare] = useState({});

  useEffect(() => {
    setShare(shareItem);
  }, [shareItem]);

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
    <>
      <Card theme={theme} className={styles.cardbody} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className={styles.img}
            component="img"
            height="140"
            image={
              share.shareImgName ? `/upload/share/${share.shareImgName}` : null
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
              {share.shareTitle}
            </Typography>
            <div className={styles.bottom}>
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
              <p className={styles.writer} theme={theme}>
                {share.user && share.user.userNick}
              </p>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ShareCard;
