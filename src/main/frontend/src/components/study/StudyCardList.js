import React from "react";
import "../../styles/study/StudyCardList.css";
import StudyCard from "./StudyCard";

const StudyCardList = ({ studyList }) => {
  return (
    <>
      <div className="studyList">
        {studyList.map((study) => (
          <StudyCard key={study.id} studyItem={study} />
        ))}
      </div>
    </>
  );
};

export default StudyCardList;
