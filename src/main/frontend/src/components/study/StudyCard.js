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
  const { studyImg, studyTitle, studyMemCnt, studyState, id } = studyItem;

  return (
    <div className="studyCard">
      <Link to={"/community/study/" + id}>
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
          <CardActionArea sx={{ height: 350 }}>
            <CardMedia
              className="studyImage"
              component="img"
              height="260"
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
              <div className="studyCardBottom">
                <div
                  className="studyState"
                  style={{
                    color: "white",
                    background: studyState ? "#1d5902" : "#8cbf75",
                    fontFamily: "Pretendard-Regular",
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
      </Link>
    </div>
  );
};

export default StudyCard;
