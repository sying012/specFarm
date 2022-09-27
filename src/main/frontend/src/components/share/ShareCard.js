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
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const ShareCard = ({ shareItem }) => {
  const [user, setUser] = useState({});
  const [share, setShare] = useState({});
  const [shareYn, setShareYn] = useState("");
  const [shareYnStyle, setShareYnStyle] = useState({});

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

  //share 나눔 상태
  const shareState = () => {
    if (share.shareYn === "Y") {
      share.shareYn = "N";
    } else {
      share.shareYn = "Y";
    }

    if (share.user.userId === user.userId) {
      axios({
        method: "post",
        url: API_BASE_URL + "/community/share/shareYn",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        data: share,
      })
        .then((response) => {
          setShareYn(response.data.shareYn);
        })
        .catch((e) => {
          console.log(e.data.error);
        });
    } else {
      return;
    }
  };

  //share 나눔 상태 스타일
  useEffect(() => {
    setShareYnStyle(
      shareYn && shareYn === "Y"
        ? { background: "#1d5902" }
        : { background: "rgb(100, 100, 100)" }
    );
  }, [shareYn]);

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
              <div theme={theme}>
                <p
                  className={styles.state}
                  value={shareYn}
                  style={{
                    color: "white",
                    background: share.shareYn === "Y" ? "#1d5902" : "#777",
                  }}
                >
                  {shareYn
                    ? shareYn === "Y"
                      ? "나눔"
                      : "완료"
                    : share.shareYn === "Y"
                    ? "나눔"
                    : "완료"}
                </p>
              </div>
              <div className={styles.cardBottomRight}>
                <p className={styles.writer} theme={theme}>
                  {share.user && share.user.userNick}
                </p>
                <p className={styles.countReply}>{share.countReply}</p>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ShareCard;
