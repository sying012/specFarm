import React, { useState } from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { OutlinedInput, IconButton } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useEffect } from "react";
import { API_BASE_URL } from "../../app-config";
import axios from "axios";

const AskReplyRegBox = ({
  style,
  insertAskReply,
  askIdx,
  askReplyIdx,
  insertAskReReply,
}) => {
  const [user, setUser] = useState({});
  const [askReplyContent, setAskReplyContent] = useState("");

  useEffect(() => {
    //현재 접속 유저정보요청
    axios
      .get(API_BASE_URL + "/community/ask/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  }, [sessionStorage.getItem("ACCESS_TOKEN")]);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!!user) {
      if (!askReplyIdx) {
        let askReply = { askReplyContent: askReplyContent };
        setAskReplyContent("");
        insertAskReply(askReply, askIdx);
      } else {
        let askReReply = {
          askReply: {
            askIdx: askIdx,
            askReplyIdx: askReplyIdx,
          },
          askReReplyContent: askReplyContent,
        };
        setAskReplyContent("");
        insertAskReReply(askReReply);
      }
    } else {
      alert("로그인 후 작성할 수 있습니다.");
    }
  };

  return (
    <div id="askReplyRegBox" className="askReplyBox" style={style}>
      <img
        id="profileImg"
        src={
          !!user
            ? user.userProfileName
              ? "/upload/profile/" + user.userProfileName
              : defaultProfile
            : defaultProfile
        }
        alt="프로필사진"
      />
      <form id="replyRegForm" onSubmit={handleReplySubmit}>
        <OutlinedInput
          name="askReplyContent"
          value={askReplyContent}
          onChange={(e) => setAskReplyContent(e.target.value)}
          multiline={true}
          minRows="1"
          maxRows="5"
          style={{ width: "100%", padding: "10px", fontSize: "0.9rem" }}
        ></OutlinedInput>
        <IconButton
          type="submit"
          style={{
            width: "40px",
            height: "40px",
          }}
        >
          <Send />
        </IconButton>
      </form>
    </div>
  );
};

export default AskReplyRegBox;
