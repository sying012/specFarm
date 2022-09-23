import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

import styles from "../../styles/findcourse/CourseCard.module.css";

const CourseCard = ({ card }) => {
  let cost = card.courseMan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    card.courseMan = cost;
    console.log(card.courseMan);
  }, [card, cost]);

  return (
    <NavLink
      to={
        "../srchTrprId=" +
        card.trprId +
        "&srchTrprDegr=" +
        card.trprDegr +
        "&srchTorgId=" +
        card.trainstCstId
      }
    >
      <Card
        sx={{
          width: 260,
          height: 300,
          transition: "all 0.2s ease-in-out",
          ":hover": {
            transform: "translateY(-5px)",
            boxShadow: "4px 12px 20px 6px rgb(0 0 0 / 18%)",
          },
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, fontFamily: "Pretendard-Regular" }}
            color="text.secondary"
            gutterBottom
          >
            {/* 훈련 기관명 */}
            {card.subTitle}
          </Typography>
          <Typography
            className={styles.courseCardTitle}
            sx={{
              mb: 2.5,
              fontFamily: "Pretendard-Regular",
              height: "70px",
              borderTop: "1px solid rgb(240,240,240)",
              borderBottom: "1px solid rgb(240,240,240)",
              lineHeight: "35px",
              padding: "7px 5px 7px 5px",
              fontWeight: "bold",
            }}
            variant="h6"
            component="div"
          >
            {/* 훈련 과정 제목 */}
            {card.title}
          </Typography>
          <div className={styles.courseInfo}>
            <Typography
              sx={{ mb: 1.0, fontFamily: "Pretendard-Regular" }}
              variant="body2"
              fontSize="13px"
            >
              {/* 훈련 과정 위치 */}
              위치 : {card.address}
            </Typography>
            <Typography
              sx={{ mb: 1.0, fontFamily: "Pretendard-Regular" }}
              variant="body2"
              fontSize="13px"
            >
              훈련기간 : {card.traStartDate} ~ {card.traEndDate}
            </Typography>
            <Typography
              sx={{
                mb: 1.0,
                fontFamily: "Pretendard-Regular",
                // marginLeft: "auto",
                // marginRight: "10px",
              }}
              variant="body2"
              fontSize="13px"
            >
              {/* 훈련 과정 정원 */}
              정원 : {card.yardMan} 명
            </Typography>
            <Typography
              sx={{
                mb: 1.0,
                fontFamily: "Pretendard-Regular",
                marginLeft: "auto",
                marginRight: "10px",
              }}
              variant="body2"
              fontSize="15px"
            >
              {/* 훈련비 */}
              훈련비 : {cost} 원
            </Typography>
          </div>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </NavLink>
  );
};

export default CourseCard;
