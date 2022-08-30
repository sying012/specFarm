import { style } from "@mui/system";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router";
import styles from "../../styles/share/detail.module.css";
import shareForm from "./ShareForm";

const ShareDetail = ({ shareItem }) => {
  //const { id, shareTitle, userId, content, itemImg, shareState, regDate } =
  //shareItem;

  return (
    <div className={styles.detailBox}>
      <div className={styles.detailBoxTop}>
        <div className={styles.contentTop}>
          <img
            className={styles.detailImg}
            src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
            alt="img"
          />
          <div className={styles.detailContent}>
            <div className={styles.contentText}>
              <div className={styles.ccc}>
                <h1>기사 문제집 나눔합니당</h1>
                <div className={styles.bbb}>
                  <p className={styles.state}>state</p>
                </div>
              </div>
              <Stack direction="row" spacing={2} className={styles.writer}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <p>writer</p>
              </Stack>
              <p className={styles.content}>content</p>
            </div>
            <div className={styles.btns}>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <div className={styles.reply}>
          <textarea className={styles.replyText} />
          <div>
            <button className={styles.replyRegBtn}>등록</button>
          </div>
        </div>
      </div>
      <div className={styles.detailBoxBottom}></div>
    </div>
  );
};

export default ShareDetail;
