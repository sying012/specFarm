import React from "react";
import styles from "../../styles/share/comment.moduel.css";
import { Stack, Button, Avatar } from "@mui/material";

//3. 댓글 출력
const Comment = (props) => {
  let commentArray = props.commentArray;

  return (
    <div>
      <ul>
        {commentArray.map((value, id) => (
          <li key={id} className="commentText">
            <div>
              <span>
                <Stack direction="row" spacing={2}>
                  <div>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <p>writer</p>
                  </div>
                  <div>
                    <p>2022.00.00 10:00 PM</p>
                    <Button
                      style={{
                        border: "2px solid rgba(187, 205, 110, 0.8)",
                        color: "rgba(187, 205, 110, 0.8)",
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
                  </div>
                </Stack>
              </span>
            </div>
            <span className={styles.commentText}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
