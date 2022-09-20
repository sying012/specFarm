import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../../styles/share/detail.module.css";
import { Button } from "@mui/material";
import defaultProfile from "../../images/defaultProfile.png";
import CommentContainer from "./CommentContainer";
import Comment from "./Comment";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const ShareDetail = () => {
  const [share, setShare] = useState({});
  const [shareIdx] = useParams();
  const [user, setUser] = useState({});

  // const insertShareReply = (shareReply) => {

  // }

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/share/shareDetail?shareIdx=" + shareIdx)
      .then((response) => {
        setShare(response.data);
      });

    axios
      .get(API_BASE_URL + "/community/share/getUser", {
        headers: {
          Authorization: "Bearer" + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        if (response.data.user);
      });
  }, [shareIdx]);

  return (
    <div className={styles.detailBox}>
      <div className={styles.title}>
        <p>{share.shareState ? "나눔" : "완료"}</p>
        <h1>{share.shareTitle}</h1>
        <div className={styles.btns}>
          <Button
            style={{
              border: "1px solid #1d5902",
              color: "#1d5902",
              height: "38px",
            }}
            href="/community/share"
            className={styles.deleteBtn}
            onClick={() => (
              (window.location = "/share"), alert("삭제되었습니다.")
            )}
          >
            삭제
          </Button>
          <Button
            style={{
              backgroundColor: "#1d5902",
            }}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => (
              (window.location = "./detail"), alert("등록되었습니다.")
            )}
            className={styles.mdfBtn}
          >
            수정
          </Button>
        </div>
      </div>
      <div className={styles.detailBoxTop}>
        <div className={styles.contentTop}>
          <img
            className={styles.detailImg}
            src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
            alt="img"
          />
        </div>
        <div id="askDetailContainer">
          <div
            id="detailContentBox"
            style={{
              width: "100%",
              height: "390px",
            }}
          >
            <div>
              <div className={styles.detailWriterTop}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="detailWrite">
                    <img
                      id="profileImg"
                      src={share.userProfileName || defaultProfile}
                      alt="프로필사진"
                    />
                    {share.userId}
                  </div>
                </div>
                <p>{share.regDate}</p>
              </div>
              <div className="detailContent">{share.content}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="detailReply">
        <div
          style={{
            padding: "20px",
            boxShadow: "5px 5px 15px rgb(0 0 0 / 15%)",
            borderRadius: "15px",
            background: "white",
            zIndex: "1",
            borderBottom: "1px solid rgb(230,230,230)",
            borderTopRightRadius: "15px",
            borderTopLeftRadius: "15px",
          }}
        >
          <CommentContainer id={0} />

          {share.shareReply.map((comment) => (
            <Comment key={comment.shareReplyIdx} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareDetail;
