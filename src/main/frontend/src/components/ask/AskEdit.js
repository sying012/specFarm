import React, { useState, useEffect } from "react";
import askWriteTop from "../../images/askWriteTop.png";
import askWriteBottom from "../../images/askWriteBottom.png";
import { TextField, Button, createTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import Editer from "../Editer";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const AskEdit = ({ certNames, insertAsk }) => {
  const navigate = useNavigate();
  const { askIdx } = useParams();
  const [ask, setAsk] = useState({});
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [certName, setCertName] = useState("");
  const [viewCertNames, setViewCertNames] = useState([]);

  useEffect(() => {
    //ask 데이터요청
    axios
      .get(API_BASE_URL + "/community/ask/getAsk?askIdx=" + askIdx)
      .then((responseAsk) => {
        setAsk(responseAsk.data);
      });
  }, [askIdx]);

  useEffect(() => {
    if (Object.keys(ask).length !== 0) {
      setContentValue(ask.askContent);
      setTitleValue(ask.askTitle);
      setCertName(ask.askCert);

      //현재 접속 유저정보요청
      axios
        .get(API_BASE_URL + "/community/ask/getUser", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          if (response.data.user === null) {
            alert("로그인 후 수정할 수 있습니다.");
            navigate("/login");
          } else if (response.data.user.userId !== ask.user.userId) {
            alert("본인이 작성한 글만 수정할 수 있습니다.");
            navigate(-1);
          }
        });
    }
  }, [ask]);

  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentValue = (value) => {
    setContentValue(value);
  };

  useEffect(() => {
    if (certName.length >= 1)
      setViewCertNames(
        certNames.filter((cert) => cert.certName.match(certName) !== null)
      );
  }, [certName, certNames]);

  const handleCertValue = (e) => {
    setCertName(e.target.value);
  };

  const handleSubmit = (e) => {
    let askForm = new FormData(e.target);
    e.preventDefault();
    askForm.set("askCert", certName);
    askForm.set("askIdx", ask.askIdx);
    askForm.set("askRegDate", ask.askRegDate);

    insertAsk(askForm);
    alert("수정을 완료했습니다.");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div id="container">
      <div id="RegContainer">
        <div id="certContainer">
          <div id="searchCertForm">
            <TextField
              id="outlined-search"
              label="자격증 검색"
              name="certName"
              value={certName || ""}
              onChange={handleCertValue}
              type="search"
              style={{
                width: "80%",
                borderRadius: "30px",
              }}
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#1d5902",
                  },
                },
              }}
            />
          </div>
          <div id="certResultContainer">
            {viewCertNames.map((cert) => (
              <div
                key={cert.certIdx}
                className="certItem"
                onClick={() => setCertName(cert.certName)}
              >
                {cert.certName}
              </div>
            ))}
          </div>
        </div>
        <div id="writeContainer">
          <img
            src={askWriteTop}
            alt=""
            style={{ display: "block", maxWidth: "800px", width: "100%" }}
          />
          <div id="writeContent">
            <form id="regAskForm" onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="제목"
                variant="standard"
                value={titleValue || ""}
                onChange={handleTitleValue}
                required={true}
                style={{ width: "100%" }}
                name="askTitle"
                autoComplete="off"
                sx={{
                  "& .MuiInput-root": {
                    "&:after": {
                      borderColor: "#8cbf75",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#1d5902",
                    },
                  },
                }}
              />

              <input
                type="hidden"
                id="askContent"
                name="askContent"
                value={contentValue || ""}
                required={true}
              />
              <Editer
                placeholder="내용을 입력하세요"
                place="community/ask"
                value={contentValue || ""}
                onChange={handleContentValue}
              ></Editer>
              <div className="askbtnBox">
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  href="/community/ask"
                  theme={theme}
                  className="askInRegButton"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  theme={theme}
                  className="askInRegButton"
                >
                  수정
                </Button>
              </div>
            </form>
          </div>
          <img
            src={askWriteBottom}
            alt=""
            style={{ display: "block", maxWidth: "800px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AskEdit;
