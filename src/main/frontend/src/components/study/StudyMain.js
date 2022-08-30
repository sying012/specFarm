import React from "react";
import StudyContainerList from "./StudyContainerList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../../styles/study/StudyMain.css";

const StudyMain = ({ studyList }) => {
  return (
    <div>
      <StudyContainerList studyList={studyList}></StudyContainerList>
      <div className="regBtnContainer">
        <button
          className="studyRegBtn"
          type="button"
          onClick={() => {
            window.location = "/community/study/register";
          }}
        >
          글쓰기
        </button>
      </div>
      <div className="pageBtnContainer">
        <Stack spacing={2}>
          <Pagination
            count={30}
            variant="outlined"
            shape="rounded"
            siblingCount={3}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </div>
  );
};

export default StudyMain;
