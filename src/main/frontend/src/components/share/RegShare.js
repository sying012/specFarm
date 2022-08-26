import React from "react";
import "../styles/share/shareText.css";
import Carousel from "../components/share/Carousels";
import ShareText from "../components/share/ShareText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const RegShare = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">나눔 장터🤝</div>
      </div>
      <div className="shareBox">
        <div className="carousel">
          <Carousel></Carousel>
        </div>
        <div className="uploadBtn">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>
        </div>
        <ShareText></ShareText>
      </div>
    </div>
  );
};

export default RegShare;
