import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

import styles from "../../styles/findcourse/CourseCard.module.css";

const CourseCard = ({ index, card }) => {
  let cost = card.courseMan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log(card);
  return (
    <NavLink
      to={"../srchTrprId=" + card.trprId + "&srchTrprDegr=" + card.trprDegr + "&srchTorgId=" + card.trainstCstId}
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {card.subTitle}
          </Typography>
          <Typography
            className={styles.courseCardTitle}
            sx={{ mb: 2.5 }}
            variant="h6"
            component="div"
          >
            {card.title}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary" fontSize="13px">
          훈련유형 : 플랫폼 특화훈련
        </Typography> */}
          <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
            위치 : {card.address}
          </Typography>
          <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
            훈련기간 : {card.traStartDate} ~ {card.traEndDate}
          </Typography>
          <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
            정원 : {card.yardMan} 명
          </Typography>
          <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
            훈련비 : {cost} 원
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </NavLink>
  );
};

export default CourseCard;
