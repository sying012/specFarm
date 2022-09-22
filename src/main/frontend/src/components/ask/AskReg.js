import React, { useEffect, useState, useCallback, useRef } from "react";
import askWriteTop from "../../images/askWriteTop.png";
import askWriteBottom from "../../images/askWriteBottom.png";
import { TextField, Button, createTheme } from "@mui/material";
import Editer from "../Editer";
import { useNavigate, useLocation } from "react-router";
const AskReg = ({ certNames, insertAsk }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contentValue, setContentValue] = useState("");
  const [certName, setCertName] = useState("");
  const [askCert, setAskCert] = useState(null);
  const [viewCertNames, setViewCertNames] = useState([]);
  const handleContentValue = (value) => {
    setContentValue(value);
  };

  useEffect(() => {
    if (certName.length >= 1)
      setViewCertNames(
        certNames.filter((cert) => cert.certName.match(certName) !== null)
      );
  }, [certName]);

  const handleCertValue = useCallback(
    (e) => {
      setCertName(e.target.value);
    },
    [certName]
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  const handleSubmit = (e) => {
    let ask = new FormData(e.target);
    insertAsk(ask);

    e.preventDefault();
  };
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
                onClick={() => {
                  setAskCert(cert.certName);
                  document.querySelector(".disabledCertInput").focus();
                }}
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
            <form
              onSubmit={handleSubmit}
              id="regAskForm"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            >
              <TextField
                id="standard-basic"
                label="제목"
                variant="standard"
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

              <TextField
                id="standard-basic"
                label="자격종목"
                variant="standard"
                className="disabledCertInput"
                required
                onClick={() => {
                  document.querySelector("#outlined-search").focus();
                }}
                onFocus={() => {
                  document.querySelector("#outlined-search").focus();
                }}
                value={askCert || ""}
                style={{ width: "100%", marginTop: "10px" }}
                name="askCert"
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
                  onClick={() => {
                    navigate(-1);
                  }}
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
                  등록
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

export default AskReg;
