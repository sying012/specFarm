import * as React from "react";
import { useParams } from "react-router";
import styles from "../../styles/share/detail.module.css";
import { Stack, Button, Avatar } from "@mui/material";
import Comment from "./Comment";
import CommentContainer from "./CommentContainer";

const ShareDetail = ({ shareList }) => {
  const { id } = useParams();
  const { shareTitle, userId, content, itemImg, shareState, regDate } =
    shareList[id - 1];

  //2. 댓글 입력 값 저장되는 곳 지정
  const [commentArray, setCommentArray] = React.useState([]);

  const addCommentArray = (array) => {
    setCommentArray(array);
  };

  return (
    <div className={styles.detailBox}>
      <div className={styles.title}>
        <p>나눔 </p>
        <h1>기사 문제집 나눔합니당</h1>

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
                <p>writer</p>
                <div>2022.00.00</div>
              </Stack>
              <p className={styles.content}>content</p>
            </div>
          </div>
        </div>
        <div className={styles.detailBoxBottom}>
          <div className={styles.reply}>
            <CommentContainer
              addCommentArray={addCommentArray}
              commentArray={commentArray}
            />
            <hr className={styles.shareDetailHr}></hr>
            <div>
              <Comment commentArray={commentArray} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDetail;
