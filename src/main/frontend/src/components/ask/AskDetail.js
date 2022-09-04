import React from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { useParams, NavLink } from "react-router-dom";
import AskDetailReply from "./AskDetailReply";
import AskReplyRegBox from "./AskReplyRegBox";

const AskDetail = ({ asks }) => {
  const { askId } = useParams();
  const ask = asks[askId - 1];
  return (
    <div id="askDetailContainer">
      <div id="detailContentBox">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="detailWrite">
              <img
                id="profileImg"
                src={ask.userProfileName || defaultProfile}
                alt="프로필사진"
              />
              {ask.userId}
            </div>
            <div className="detailRegDate">{ask.askRegDate}</div>
          </div>

          <div className="detailTitle">{ask.askTitle}</div>
          <div
            className="detailContent"
            dangerouslySetInnerHTML={{ __html: ask.askContent }}
          ></div>
        </div>

        <div className="detailLink">
          <NavLink to={`/community/ask/edit/${ask.id}`}>수정</NavLink>
          <NavLink to={`/community/ask/${ask.id}`}>삭제</NavLink>
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
          <AskReplyRegBox id={0} />
        </div>
        {ask.askReply.map((reply) => (
          <AskDetailReply key={reply.askReplyIdx} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default AskDetail;
