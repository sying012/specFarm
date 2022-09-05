import * as React from "react";
import { useParams, NavLink } from "react-router";
import styles from "../../styles/share/detail.module.css";
import { Stack, Button, Avatar } from "@mui/material";
import defaultProfile from "../../images/defaultProfile.png";
import CommentContainer from "./CommentContainer";
import Comment from "./CommentContainer";

const ShareDetail = ({ shareList }) => {
  const { id } = useParams();
  const share = shareList[id - 1];

  return (
    <div className={styles.detailBox}>
      <div className={styles.title}>
        <p>{share.shareState} </p>
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
          <div className={styles.detailContent}>
            <div className={styles.contentText}>
              <Stack direction="row" spacing={2} className={styles.writer}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <p>{share.userId}</p>
                <div>{share.regDate}</div>
              </Stack>
              <p className={styles.content}>content</p>
            </div>
          </div>
        </div>
        <div id="askDetailContainer">
          <div id="detailContentBox">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="detailWrite">
                  <img
                    id="profileImg"
                    src={share.userProfileName || defaultProfile}
                    alt="프로필사진"
                  />
                  {share.userId}
                </div>
              </div>

              <div
                className="detailContent"
                dangerouslySetInnerHTML={{ __html: share.shareContent }}
              ></div>
            </div>

            <div className="detailLink">
              <NavLink to={`/community/ask/edit/${share.id}`}>수정</NavLink>
              <NavLink to={`/community/ask/${share.id}`}>삭제</NavLink>
            </div>
          </div>
          <div id="detailReply">
            <div
              style={{
                position: "sticky",
                top: "0",
                background: "white",
                zIndex: "1",
                borderBottom: "1px solid rgb(230,230,230)",
                borderTopRightRadius: "15px",
                borderTopLeftRadius: "15px",
              }}
            >
              <CommentContainer id={0} />
            </div>
            {share.shareReply.map((reply) => (
              <Comment key={reply.shareReplyIdx} reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDetail;
