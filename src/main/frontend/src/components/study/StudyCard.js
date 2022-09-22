import React from "react";
import "../../styles/study/StudyCard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import defaultStudyImg from "../../images/defalut_study_image.png";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard-Regular",
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

const StudyCard = ({ studyItem }) => {
  // console.log(studyImgName);

  return (
    <div className="studyCard">
      <Link to={"/community/study/" + studyItem.studyIdx}>
        <Card
          className="studyCardBody"
          sx={{
            width: 280,
            height: 350,
            transition: "all 0.2s ease-in-out",
            ":hover": {
              transform: "translateY(-5px)",
              boxShadow: "4px 12px 20px 6px rgb(0 0 0 / 18%)",
            },
          }}
        >
          <CardActionArea
            sx={{
              height: 350,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              className="studyImage"
              component="img"
              height="240"
              image={
                studyItem.studyImgName !== null
                  ? "/upload/study/" + studyItem.studyImgName
                  : defaultStudyImg
              }
              alt="스터디 이미지"
              sx={{ objectFit: "unset" }}
            />
            <CardContent
              style={{
                padding: "5px 16px",
                paddingBottom: "15px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
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
                {studyItem.studyTitle}
              </Typography>
              <div className="studyCardBottom">
                <div
                  className="studyState"
                  style={{
                    color: "white",
                    background:
                      studyItem.studyYn === "Y" ? "#1d5902" : "lightslategrey",
                    fontFamily: "Pretendard-Regular",
                  }}
                >
                  {studyItem.studyYn === "Y" ? "모집" : "마감"}
                </div>
                <div className="studyMemberCnt">
                  <PeopleAltIcon />
                  <div className="memberNum">
                    {studyItem.studyMemberCnt}/{studyItem.studyMaxMember}
                  </div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default StudyCard;
