import React, { useEffect, useState } from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { useParams, NavLink, useLocation, useNavigate } from "react-router-dom";
import AskDetailReply from "./AskDetailReply";
import AskReplyRegBox from "./AskReplyRegBox";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { useCallback } from "react";
import { history } from "../../lib/history";
import SmallInfo from "../mypage/SmallInfo";

const AskDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchType, searchKeyword, page, prevUrl } =
    location.state !== null
      ? location.state
      : { searchType: null, searchKeyword: null, page: null, prevUrl: null };

  const [askReply, setAskReply] = useState([]);
  const [ask, setAsk] = useState({});
  const { askIdx } = useParams();
  const [user, setUser] = useState({});

  //댓글 등록
  const insertAskReply = (askReply, askIdx) => {
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

  //뒤로가기 처리
  useEffect(() => {
    const listenBackEvent = () => {
      if (!prevUrl) {
        navigate("..", {
          state: {
            searchType: searchType,
            searchKeyword: searchKeyword,
            page: page,
          },
          replace: true,
        });
      }
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  }, [searchType, searchKeyword, page, navigate]);

  useEffect(() => {
    //게시글 데이터 불러오기
    axios
      .get(API_BASE_URL + "/community/ask/getAsk?askIdx=" + askIdx)
      .then((response) => {
        setAsk(response.data);
      });

    //댓글 데이터 불러오기
    axios
      .get(API_BASE_URL + "/community/ask/reply/" + askIdx)
      .then((response) => {
        setAskReply(response.data.data);
      });

    //현재 접속 유저정보요청
    axios
      .get(API_BASE_URL + "/user/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        if (response.data.user !== null && response.data.user !== undefined)
          setUser(response.data.user);
      });
  }, [askIdx]);

  //삭제 요청
  const deleteAsk = useCallback(() => {
    if (user.userId === ask.user.userId) {
      axios
        .delete(API_BASE_URL + "/community/ask/delete?askIdx=" + ask.askIdx)
        .then(() => {
          navigate("..", {
            state: {
              searchType: searchType,
              searchKeyword: searchKeyword,
              page: page,
            },
            replace: true,
          });
        });
    } else {
      alert("삭제할 수 없습니다.");
    }
  }, [ask, user]);
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

  // 유저 프로필 모달
  const [infoVisible, setInfoVisible] = useState(false);
  const userSmallInfo = (e) => {
    if (!infoVisible) {
      setInfoVisible(true);
    } else {
      setInfoVisible(false);
    }
  };

  useEffect(() => {
    infoVisible === true
      ? document
          .getElementById("askDetailContainer")
          .addEventListener("click", () => setInfoVisible(false))
      : document
          .getElementById("askDetailContainer")
          .removeEventListener("click", () => setInfoVisible(false));
  }, []);

  return (
    <div id="askDetailContainer">
      <div id="detailContentBox">
        {/* {asks
          .filter((ask) => ask.askIdx === parseInt(askId))
          .map((ask) => (
            <> */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="detailWrite" onClick={(e) => userSmallInfo(e)}>
              {ask.user !== null && typeof ask.user !== "undefined" ? (
                <>
                  <img
                    id="profileImg"
                    src={
                      ask.user.userProfileName
                        ? "/upload/profile/" + ask.user.userProfileName
                        : defaultProfile
                    }
                    alt="프로필사진"
                  />
                  {ask.user.userNick}
                </>
              ) : null}
            </div>
            <div
              onClick={(e) => userSmallInfo(e)}
              style={{
                position: "absolute",
              }}
            >
              {infoVisible && <SmallInfo user={ask.user} id="smallInfo" />}
            </div>
            <div className="detailRegDate">{ask.askRegDate}</div>
          </div>

          <div className="detailTitle">
            [{ask.askCert}]&nbsp;&nbsp;&nbsp;{ask.askTitle}
          </div>
          <div
            className="detailContent"
            dangerouslySetInnerHTML={{ __html: ask.askContent }}
          ></div>
        </div>
        {Object.keys(user).length !== 0 &&
        Object.keys(ask).length !== 0 &&
        (ask.user.userId === user.userId || user.role === "ROLE_ADMIN") ? (
          <div className="detailLink">
            <NavLink to={`/community/ask/${askIdx}/edit`}>수정</NavLink>
            <span onClick={deleteAsk}>삭제</span>
          </div>
        ) : (
          <div className="detailLink"></div>
        )}

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
