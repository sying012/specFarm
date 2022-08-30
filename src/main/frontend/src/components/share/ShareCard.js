import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "../../styles/share/list.module.css";

const ShareCard = ({ shareItem }) => {
  const { id, shareTitle, userId, content, itemImg, shareState, regDate } =
    shareItem;

  return (
    <div className={styles.shareCardList}>
      <Card className={styles.cardbody} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className={styles.img}
            component="img"
            height="140"
            image={itemImg}
            alt="itemImg"
          />
          <CardContent style={{ paddingTop: 10 }}>
            <Typography gutterBottom variant="h6" component="div">
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
                }}
              >
                {shareState ? "나눔" : "완료"}
              </div>
              <p className={styles.writer}>{userId}</p>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ShareCard;
