import React from "react";
import "../../styles/study/StudyContainerList.css";
import StudyContainer from "./StudyContainer";

const StudyContainerList = ({ studyList }) => {
  return (
    <>
      <div className="studyList">
        {studyList.map((study) => (
          <StudyContainer key={study.id} studyItem={study} />
        ))}
      </div>
    </>
  );
};

export default StudyContainerList;
