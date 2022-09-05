import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../../styles/findcourse/CourseCard.module.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const CourseCard = () => {
  return (
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
          (주)맘편한세상
        </Typography>
        <Typography
          className={styles.courseCardTitle}
          sx={{ mb: 2.5 }}
          variant="h5"
          component="div"
        >
          아이돌봄 플랫폼 시터교육과정 아이돌봄 플랫폼 시터교육과정아이돌봄
          플랫폼 시터교육과정아이돌봄 플랫폼 시터교육과정
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary" fontSize="13px">
          훈련유형 : 플랫폼 특화훈련
        </Typography> */}
        <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
          훈련유형 : 플랫폼 특화훈련
        </Typography>
        <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
          훈련기간 : 2022-09-13 ~ 2022-09-16
        </Typography>
        <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
          훈련시간 : 4일, 총20시간
        </Typography>
        <Typography sx={{ mb: 1.0 }} variant="body2" fontSize="13px">
          훈련비 : 124,420 원
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
