import React from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { history } from "../../lib/history";

const NoticeDetail = ({ user, deleteNotice }) => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState({});
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { searchKeyword, page } =
    location.state !== null
      ? location.state
      : { searchKeyword: null, page: null };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/cs/${noticeId}`, {
        params: { searchKeyword: searchKeyword },
      })
      .then((response) => {
        setNotice(response.data.notice);
        setPrev(response.data.prev);
        setNext(response.data.next);
        window.scrollTo(0, 0);
      });
  }, [noticeId]);

  //뒤로가기 처리
  useEffect(() => {
    const listenBackEvent = () => {
      navigate("..", {
        state: {
          searchKeyword: searchKeyword,
          page: page,
        },
        replace: true,
      });
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  }, [searchKeyword, page, navigate]);

  return (
    <>
      {Object.keys(notice).length !== 0 ? (
        <div className="noticeDetailMainDiv">
          <div className="noticeDetaildiv">
            <strong>{notice.noticeTitle}</strong>
            <p>{notice.noticeDate}</p>
          </div>
          <div
            className="noticeContent"
            dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
          ></div>
          {user !== null && user.role === "ROLE_ADMIN" ? (
            <div
              style={{
                textAlign: "right",
                display: "block",
                padding: "10px 30px",
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  deleteNotice(noticeId);
                }}
              >
                삭제
              </span>
            </div>
          ) : null}
          <div className="noticeDetailDivB">
            {prev === null ? null : (
              <div>
                <p>이전글</p>
                <Link className="otherNotice" to={`/cs/${prev.noticeIdx}`}>
                  {prev.noticeTitle}
                </Link>
              </div>
            )}
            {next === null ? null : (
              <div>
                <p>다음글</p>
                <Link className="otherNotice" to={`/cs/${next.noticeIdx}`}>
                  {next.noticeTitle}
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div
        className="noticeBottom"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link to="/cs" className="detailListBtn">
          목록 보기
        </Link>
      </div>
    </>
  );
};

export default NoticeDetail;
