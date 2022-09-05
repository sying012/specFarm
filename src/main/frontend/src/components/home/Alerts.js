import { Alert, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";

const Alerts = () => {
  const [open, setOpen] = useState(true);

  // alert timer 10sec
  useEffect(() => {
    // let timer = setTimeout(() => {
    //   setOpen(false);
    // }, 100000);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);

  return (
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
  );
};

export default Alerts;
