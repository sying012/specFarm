import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import NewShare from "../components/share/NewShare";
import ShareDetail from "../components/share/ShareDetail";
import ShareContainer from "../components/share/ShareContainer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateRoute from "../lib/PrivateRoute";

const Share = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/share">
          <div className="subtitlewrap">나눔 장터</div>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<ShareContainer />}></Route>
        <Route
          path="/newShare"
          element={<PrivateRoute component={NewShare} />}
        ></Route>
        <Route path="/:shareIdx" element={<ShareDetail />}></Route>
      </Routes>
    </div>
  );
};

export default Share;
