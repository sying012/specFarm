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
  const { id, shareTitle, userId, itemImg, shareState, content } = shareItem;

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Hahmlet",
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
    <Link to={`/community/share/${id}`}>
      <Card theme={theme} className={styles.cardbody} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className={styles.img}
            component="img"
            height="140"
            image={itemImg}
            alt="itemImg"
          />
          <CardContent theme={theme} style={{ paddingTop: 10 }}>
            <Typography theme={theme} gutterBottom variant="h6" component="div">
              {shareTitle}
            </Typography>
            <div className={styles.bottom}>
              <div
                className={styles.state}
                style={{
                  color: "white",
                  background: shareState
                    ? "rgba(187, 205, 110, 0.8)"
                    : "rgba(107, 83, 67, 0.8)",
                  fontFamily: "Hahmlet",
                }}
              >
                {shareState ? "나눔" : "완료"}
              </div>
              <p className={styles.writer} style={{ fontFamily: "Hahmlet" }}>
                {userId}
              </p>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ShareCard;
