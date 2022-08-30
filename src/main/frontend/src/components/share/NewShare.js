import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import ShareForm from "./ShareForm";
import styles from "../../styles/share/newShare.module.css";

const NewShare = () => {
  // shareData를 백으로 전달
  // function addNewShareHandler(shateData) {
  //   fetch함수를 통해 http request 전달
  //   fetch('url', {
  //    method: 'POST',
  //    body: JSON.stringfy(shateData) JSON으로 변환하여 전달
  //    });
  // }

  return (
    <div className={styles.aa}>
      <div className={styles.imgBox}>
        <img
          className={styles.itemImg}
          src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
          alt="img"
        />
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
      </div>
      <ShareForm />
    </div>
  );
  //<ShareForm addNewShare={addNewShareHandler}/>
};

export default NewShare;
