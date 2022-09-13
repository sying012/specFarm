import React, { useEffect, useState, useLayoutEffect } from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { useParams, NavLink } from "react-router-dom";
import AskDetailReply from "./AskDetailReply";
import AskReplyRegBox from "./AskReplyRegBox";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AskDetail = () => {
  const [askReply, setAskReply] = useState([]);
  const [ask, setAsk] = useState([]);
  const { askIdx } = useParams();

  const insertAskReply = (askReply) => {
    console.log(askReply);
    axios({
      method: "post",
      url: API_BASE_URL + `/community/ask/${askIdx}/insertReply`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: askReply,
    }).then((response) => {
      setAskReply(response.data.askReplyList);
    });
  };

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/ask/getAsk?askIdx=" + askIdx)
      .then((response) => {
        console.log(response);
        setAsk(response.data);
      });
    axios
      .get(API_BASE_URL + "/community/ask/reply/" + askIdx)
      .then((response) => setAskReply(response.data.data));
  }, [askIdx]);

  // useEffect(() => {
  //   if (asks.length !== 0) {
  //     setAsk(asks.filter((ask) => ask.askIdx === parseInt(askId))[0]);
  //   }
  // }, [asks]);

  // useEffect(() => {
  //   if (Object.keys(ask).length !== 0) {
  //     console.log(ask);
  //   }
  // }, [ask]);

  return (
    <div id="askDetailContainer">
      <div id="detailContentBox">
        {/* {asks
          .filter((ask) => ask.askIdx === parseInt(askId))
          .map((ask) => (
            <> */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="detailWrite">
              {ask.user !== null && typeof ask.user !== "undefined" ? (
                <>
                  <img
                    id="profileImg"
                    src={ask.user.userProfileName || defaultProfile}
                    alt="프로필사진"
                  />
                  {ask.user.userNick}
                </>
              ) : null}
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
          <NavLink to={`/community/ask/${askIdx}/edit`}>수정</NavLink>
          <NavLink to={`/community/ask/${askIdx}`}>삭제</NavLink>
        </div>
        {/* </>
          ))} */}
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
          <AskReplyRegBox
            id={0}
            insertAskReply={insertAskReply}
            askIdx={askIdx}
            setAskReply={setAskReply}
          />
        </div>
        {askReply.map((reply) => (
          <AskDetailReply key={reply.askReplyIdx} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default AskDetail;
