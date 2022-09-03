import React, { useState } from "react";
import askWriteTop from "../../images/askWriteTop.png";
import askWriteBottom from "../../images/askWriteBottom.png";
import { TextField } from "@mui/material";
import Editer from "../Editer";

const AskReg = () => {
  const [contentValue, setContentValue] = useState("");
  const handleContentValue = (value) => {
    setContentValue(value);
  };
  return (
    <div id="container">
      <div id="RegContainer">
        <div id="certContainer">
          <form action="" id="searchCertForm">
            <TextField
              id="outlined-search"
              label="자격증 검색"
              type="search"
              style={{ width: "80%" }}
            />
          </form>
          <div id="certResultContainer">
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
            <div className="certItem">용접기능사</div>
            <div className="certItem">기계기사</div>
            <div className="certItem">정보처리기사</div>
            <div className="certItem">도로및공항기술사</div>
          </div>
        </div>
        <div id="writeContaner">
          <img
            src={askWriteTop}
            alt=""
            style={{ display: "block", maxWidth: "800px", width: "100%" }}
          />
          <div id="writeContent">
            <form action="#" id="regAskForm" method="post">
              <p style={{ fontSize: "1.5rem" }}>질문작성</p>
              <br />
              <TextField
                id="standard-basic"
                label="제목"
                variant="standard"
                required={true}
                style={{ width: "100%" }}
                name="askTitle"
                autoComplete="off"
              />
              {/* <TextField
                id="standard-basic"
                label="내용"
                variant="standard"
                required={true}
                multiline={true}
                minRows="5"
                style={{ width: "100%" }}
              /> */}
              <input
                type="hidden"
                id="askContent"
                name="askContent"
                value={contentValue}
                required={true}
              />
              <Editer
                placeholder="내용을 입력하세요"
                value={contentValue}
                onChange={handleContentValue}
              ></Editer>
              <button>글쓰기</button>
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
