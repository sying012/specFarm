import React, { useState, useLayoutEffect, useEffect } from "react";
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

  const [certNames, setcertNames] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/cert/getCertList`).then((response) => {
      setcertNames(
        response.data.certList.map((cert) => {
          let newCert = { ...cert, certName: cert.jmfldnm };
          delete newCert.jmfldnm;
          return newCert;
        })
      );
    });
  }, []);

  return (
    <div id="content">
      <div className="titleContainer">
        <NavLink to="/community">
          <div className="titlewrap">마을회관</div>
        </NavLink>
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
