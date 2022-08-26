import React from "react";
import "../../../styles/community/study/StudyContainer.css";
import sampleimg from "../../../images/apples-1004886_960_720.jpg";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const StudyContainer = () => {
  return (
    <div className="studyContainer">
      <img className="studyImg" src={sampleimg} alt="sampleimg"></img>
      <div className="studyTitle">스터디 제목 입니다</div>
      <div className="studyMemberCnt">
        <PeopleAltIcon />
        <div className="memberNum">5/10</div>
      </div>
    </div>
  );
};

export default StudyContainer;
