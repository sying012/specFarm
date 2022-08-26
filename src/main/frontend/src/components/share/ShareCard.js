import React from "react";
import "../../styles/share/shareList.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ShareCard = () => {
  return (
    <article>
      <Card className="shareCard-body" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className="shareCard-img"
            component="img"
            height="140"
            image="https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography
              className="shareCard-title"
              gutterBottom
              variant="h6"
              component="div"
            >
              shareCard-title
            </Typography>
            <div className="shareCard-bottom">
              <button className="stateBtn">완료</button>
              <p className="shareWriter">작성자</p>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </article>
  );
};

export default ShareCard;
