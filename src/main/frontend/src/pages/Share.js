import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import NewShare from "../components/share/NewShare";
import ShareDetail from "../components/share/ShareDetail";
import ShareContainer from "../components/share/ShareContainer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateRoute from "../lib/PrivateRoute";
import ShareEdit from "../components/share/ShareEdit";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

const Share = () => {
  const navigate = useNavigate();

  // share 글 등록
  const insertShare = (share) => {
    console.log(share);
    axios({
      method: "post",
      url: API_BASE_URL + "/community/share/newShare",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: share,
    })
      .then((response) => {
        console.log(response);
        navigate(`/community/share/${response.data.shareIdx}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="titleContainer">
        <NavLink to="/community">
          <div className="titlewrap">마을회관</div>
        </NavLink>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/share">
          <div className="subtitlewrap">나눔 장터</div>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<ShareContainer />}></Route>
        <Route
          path="/newShare"
          element={
            <PrivateRoute component={NewShare} insertShare={insertShare} />
          }
        ></Route>
        <Route path="/:shareIdx" element={<ShareDetail />}></Route>
        <Route
          path="/edit/:shareIdx"
          element={<ShareEdit insertShare={insertShare} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Share;
