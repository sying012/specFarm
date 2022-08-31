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
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Hahmlet",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
    // fontSize: "15px",
  },
});

const StudyContainer = ({ studyItem }) => {
  const { studyImg, studyTitle, studyMemCnt, studyState, id } = studyItem;

  return (
    <div
      className="studyContainer"
      onClick={() => (window.location = "/community/study/" + id)}
    >
      <Card className="studyContainerBody" sx={{ width: 220, height: 320 }}>
        <CardActionArea sx={{ height: 320 }}>
          <CardMedia
            className="studyImage"
            component="img"
            height="220"
            image={studyImg}
            alt="스터디 이미지"
            sx={{ objectFit: "unset" }}
          />
          <CardContent style={{ padding: "5px 16px" }}>
            <Typography
              className="studyCardTitle"
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                height: "50px",
              }}
              gutterBottom
              variant="h6"
              component="div"
              theme={theme}
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
                  fontFamily: "Hahmlet",
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
