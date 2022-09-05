import { Stack, Alert, Slide, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/home/Home.module.css";

const Alerts = () => {
  const [open, setOpen] = useState(true);

  // alert timer 10sec
  useEffect(() => {
    let timer = setTimeout(() => {
      setOpen(false);
    }, 100000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Grid container className={styles.alert}>
      <Stack sx={{ width: "510px" }} spacing={1}>
        <Slide in={open} direction="down">
          <Alert
            severity="warning"
            onClose={() => {
              setOpen(false);
            }}
          >
            [ 정보처리기사 ] 원서접수 D-3 씨앗 심을 준비하세요!
          </Alert>
        </Slide>
      </Stack>
    </Grid>
  );
};

export default Alerts;
