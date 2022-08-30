import React from "react";
import { Route, Routes } from "react-router";
import LostList from "../components/lost/LostList";

const Lost = () => {
  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">분실물</div>
      </div>
      <Routes>
        <Route path="/" element={<LostList></LostList>}></Route>
        {/* <Route path="/write" element={<AskReg />}></Route> */}
      </Routes>
    </div>
  );
};

export default Lost;
