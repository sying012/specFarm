import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, createTheme } from "@mui/material";

const NoticeDetail = ({ noticeData }) => {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      green: {
        main: "#8cbf75",
        contrastText: "#fff",
      },
      brown: {
        main: "rgb(107, 83, 67)",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: [
        "Hahmlet",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
      ].join(","),
    },
  });

  const { noticeId } = useParams();
  const notice = noticeData[noticeId - 1];
  const prev = noticeData[noticeId - 2];
  const next = noticeData[noticeId];

  return (
    <>
      <div className="noticeDetailMainDiv">
        <div className="noticeDetaildiv">
          <strong>{notice.noticeTitle}</strong>
          <p>{notice.noticeDate}</p>
        </div>
        <div
          className="noticeContent"
          dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
        ></div>
        <div className="noticeDetailDivB">
          {prev === undefined ? null : (
            <div>
              <p>이전글</p>
              <Link className="otherNotice" to={`/cs/${prev.id}`}>
                {prev.noticeTitle}
              </Link>
            </div>
          )}
          {next === undefined ? null : (
            <div>
              <p>다음글</p>
              <Link className="otherNotice" to={`/cs/${next.id}`}>
                {next.noticeTitle}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/cs">
          <Button
            variant="contained"
            theme={theme}
            color="green"
            style={{
              fontSize: "16px",
              lineHeight: "18px",
              padding: "14px 16px",
              width: "100px",
              marginTop: "30px",
            }}
            sx={{ borderRadius: "25px" }}
          >
            목록
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NoticeDetail;
