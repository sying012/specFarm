import React, { useState, useLayoutEffect } from "react";
import "../styles/ask/ask.css";
import AskContent from "../components/ask/AskContent";
import AskReg from "../components/ask/AskReg";
import AskDetail from "../components/ask/AskDetail";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import AskEdit from "../components/ask/AskEdit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import PrivateRoute from "../lib/PrivateRoute";

const Ask = () => {
  const navigate = useNavigate();

  const insertAsk = (ask) => {
    console.log(ask, "dfsf");
    axios({
      method: "post",
      url: API_BASE_URL + "/community/ask/write",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: ask,
    }).then((response) => {
      navigate(`${response.data.askIdx}`);
    });
  };

  const [certNames, setcertNames] = useState([
    { certIdx: 1, certName: "화공기사" },
    { certIdx: 2, certName: "화공기술사" },
    { certIdx: 3, certName: "정밀화학기사" },
    { certIdx: 4, certName: "화학분석기사" },
    { certIdx: 5, certName: "화학분석기능사" },
    { certIdx: 6, certName: "화약류제조기사" },
    { certIdx: 7, certName: "화약류제조산업기사" },
    { certIdx: 8, certName: "바이오화학제품제조기사" },
    { certIdx: 9, certName: "바이오화학제품제조산업기사" },
    { certIdx: 10, certName: "정보처리기사" },
    { certIdx: 11, certName: "화공기사" },
    { certIdx: 12, certName: "화공기술사" },
    { certIdx: 13, certName: "정밀화학기사" },
    { certIdx: 14, certName: "화학분석기사" },
    { certIdx: 15, certName: "화학분석기능사" },
    { certIdx: 16, certName: "화약류제조기사" },
    { certIdx: 17, certName: "화약류제조산업기사" },
    { certIdx: 18, certName: "바이오화학제품제조기사" },
    { certIdx: 19, certName: "바이오화학제품제조산업기사" },
  ]);

  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/ask">
          <div className="subtitlewrap">무엇이든 물어방</div>
        </NavLink>
      </div>
      <Routes>
        {/* <AskContext.Provider> */}
        <Route
          path="/"
          element={<AskContent certNames={certNames}></AskContent>}
        ></Route>
        {/* </AskContext.Provider> */}
        <Route path="/:askIdx" element={<AskDetail></AskDetail>}></Route>
        <Route
          path="/:askIdx/edit"
          element={
            <AskEdit certNames={certNames} insertAsk={insertAsk}></AskEdit>
          }
        ></Route>

        <Route
          path="/write"
          element={
            <PrivateRoute
              component={AskReg}
              certNames={certNames}
              insertAsk={insertAsk}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Ask;
