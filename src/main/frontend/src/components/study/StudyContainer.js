import React from "react";
import "../../styles/study/StudyContainer.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const StudyContainer = ({ studyItem }) => {
  const { studyImg, studyTitle, studyMemCnt, studyState, id } = studyItem;

  return (
    <div className="studyContainer">
      <Card className="studyContainerBody" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className="studyImage"
            component="img"
            height="140"
            image={studyImg}
            alt="스터디 이미지"
          />
          <CardContent>
            <Typography
              className="studyTitle"
              gutterBottom
              variant="h6"
              component="div"
            >
              {studyTitle}
            </Typography>
            <div className="studyContainerBottom">
              <div
                className="studyState"
                style={{
                  color: "white",
                  background: studyState
                    ? "rgba(187, 205, 110, 0.8)"
                    : "rgba(107, 83, 67, 0.8)",
                }}
              >
                {studyState ? "모집" : "완료"}
              </div>
              <div className="studyMemberCnt">
                <PeopleAltIcon />
                <div className="memberNum">{studyMemCnt}/10</div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StudyContainer;
