import React from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { useParams, NavLink } from "react-router-dom";
import AskDetailReply from "./AskDetailReply";
import Pagenation from "./Pagenation";
import AskReplyRegBox from "./AskReplyRegBox";

const AskDetail = ({ asks }) => {
  const { askId } = useParams();
  const ask = asks[askId - 1];
  return (
    <div id="askDetailContainer">
      <div id="detailContentBox">
        <div className="detailWrite">
          <img
            id="profileImg"
            src={ask.userProfileName || defaultProfile}
            alt="프로필사진"
          />
          {ask.userId}
        </div>
        <div className="detailTitle">{ask.askTitle}</div>
        <div className="detailContent">{ask.askContent}</div>
        <div className="detailRegDate">{ask.askRegDate}</div>
        <div className="detailLink">
          <NavLink to={`/community/ask/edit/${ask.id}`}>수정</NavLink>
          <NavLink to={`/community/ask/${ask.id}`}>삭제</NavLink>
        </div>
      </div>
      <div id="detailReply">
        <AskReplyRegBox />
        <AskDetailReply id={1} ask={ask} />
        <AskDetailReply id={2} ask={ask} />
      </div>
      <Pagenation></Pagenation>
    </div>
  );
};

export default AskDetail;
